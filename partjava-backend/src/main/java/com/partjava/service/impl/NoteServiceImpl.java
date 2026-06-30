package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.entity.Note;
import com.partjava.entity.NoteBookmark;
import com.partjava.entity.NoteLike;
import com.partjava.entity.User;
import com.partjava.repository.NoteBookmarkMapper;
import com.partjava.repository.NoteLikeMapper;
import com.partjava.repository.NoteMapper;
import com.partjava.repository.UserMapper;
import com.partjava.service.NoteService;
import com.partjava.event.UserActionEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class NoteServiceImpl implements NoteService {

    private final NoteMapper noteMapper;
    private final NoteLikeMapper noteLikeMapper;
    private final NoteBookmarkMapper noteBookmarkMapper;
    private final UserMapper userMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public NoteServiceImpl(NoteMapper noteMapper,
                           NoteLikeMapper noteLikeMapper,
                           NoteBookmarkMapper noteBookmarkMapper,
                           UserMapper userMapper,
                           ApplicationEventPublisher eventPublisher) {
        this.noteMapper = noteMapper;
        this.noteLikeMapper = noteLikeMapper;
        this.noteBookmarkMapper = noteBookmarkMapper;
        this.userMapper = userMapper;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public List<Note> listNotes(Long userId, String category, String technology, Boolean isPublic) {
        LambdaQueryWrapper<Note> query = new LambdaQueryWrapper<>();
        
        // 如果指定了个人或公开筛选
        if (isPublic != null) {
            query.eq(Note::getIsPublic, isPublic);
        }
        // 如果是私有笔记，必须是当前作者的
        if (Boolean.FALSE.equals(isPublic) && userId != null) {
            query.eq(Note::getAuthorId, userId);
        }
        
        if (category != null && !category.trim().isEmpty()) {
            query.eq(Note::getCategory, category.trim());
        }
        if (technology != null && !technology.trim().isEmpty()) {
            query.eq(Note::getTechnology, technology.trim());
        }
        
        query.orderByDesc(Note::getCreatedAt);
        return noteMapper.selectList(query);
    }

    @Override
    public Note getNoteById(Long noteId) {
        Note note = noteMapper.selectById(noteId);
        if (note == null) {
            throw new IllegalArgumentException("该笔记不存在");
        }
        return note;
    }

    @Override
    public Note getNoteById(Long noteId, Long userId) {
        Note note = getNoteById(noteId);
        boolean isPublic = Boolean.TRUE.equals(note.getIsPublic());
        boolean isOwner = userId != null && userId.equals(note.getAuthorId());
        if (!isPublic && !isOwner) {
            throw new org.springframework.security.access.AccessDeniedException("无权查看该笔记");
        }
        return note;
    }

    @Override
    @Transactional
    public Note createNote(Long userId, Note note) {
        note.setAuthorId(userId);
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        noteMapper.insert(note);
        
        // 发布“创建笔记”行为事件
        eventPublisher.publishEvent(new UserActionEvent(this, userId.intValue(), "CREATE_NOTE", 1));
        
        // 如果新建时即设为公开，发布“分享笔记”行为事件
        if (Boolean.TRUE.equals(note.getIsPublic())) {
            eventPublisher.publishEvent(new UserActionEvent(this, userId.intValue(), "SHARE_NOTE", 1));
        }
        
        return note;
    }

    @Override
    @Transactional
    public Note updateNote(Long userId, Long noteId, Note note) {
        Note existing = getNoteById(noteId);
        // 鉴权：只能修改自己的笔记
        if (!existing.getAuthorId().equals(userId)) {
            throw new AccessDeniedException("您没有权限修改该随堂笔记");
        }
        
        boolean wasPublic = Boolean.TRUE.equals(existing.getIsPublic());
        boolean isNowPublic = Boolean.TRUE.equals(note.getIsPublic());
        
        existing.setTitle(note.getTitle());
        existing.setContent(note.getContent());
        existing.setCategory(note.getCategory());
        existing.setTechnology(note.getTechnology());
        existing.setSubcategory(note.getSubcategory());
        existing.setTags(note.getTags());
        existing.setIsPublic(note.getIsPublic());
        existing.setUpdatedAt(LocalDateTime.now());
        
        noteMapper.updateById(existing);
        
        // 如果笔记状态由私有更新为公开，分发分享事件
        if (!wasPublic && isNowPublic) {
            eventPublisher.publishEvent(new UserActionEvent(this, userId.intValue(), "SHARE_NOTE", 1));
        }
        
        return existing;
    }

    @Override
    @Transactional
    public void deleteNote(Long userId, Long noteId) {
        Note existing = getNoteById(noteId);
        if (!existing.getAuthorId().equals(userId)) {
            throw new AccessDeniedException("您没有权限删除该随堂笔记");
        }
        noteMapper.deleteById(noteId);
    }

    @Override
    @Transactional
    public void toggleLikeNote(Long userId, Long noteId) {
        NoteLike existing = noteLikeMapper.selectOne(
                new LambdaQueryWrapper<NoteLike>()
                        .eq(NoteLike::getUserId, userId)
                        .eq(NoteLike::getNoteId, noteId)
        );
        if (existing != null) {
            noteLikeMapper.deleteById(existing.getId());
        } else {
            NoteLike noteLike = new NoteLike();
            noteLike.setUserId(userId);
            noteLike.setNoteId(noteId);
            noteLike.setCreatedAt(LocalDateTime.now());
            noteLikeMapper.insert(noteLike);
            
            // 获得点赞：给目标笔记作者分发 GET_LIKE 行为事件
            try {
                Note targetNote = noteMapper.selectById(noteId);
                if (targetNote != null && targetNote.getAuthorId() != null) {
                    eventPublisher.publishEvent(new UserActionEvent(this, targetNote.getAuthorId().intValue(), "GET_LIKE", 1));
                }
            } catch (Exception e) {
                log.error("给笔记作者分发点赞事件失败", e);
            }
        }
    }

    @Override
    @Transactional
    public void toggleBookmarkNote(Long userId, Long noteId) {
        NoteBookmark existing = noteBookmarkMapper.selectOne(
                new LambdaQueryWrapper<NoteBookmark>()
                        .eq(NoteBookmark::getUserId, userId)
                        .eq(NoteBookmark::getNoteId, noteId)
        );
        if (existing != null) {
            noteBookmarkMapper.deleteById(existing.getId());
        } else {
            NoteBookmark noteBookmark = new NoteBookmark();
            noteBookmark.setUserId(userId);
            noteBookmark.setNoteId(noteId);
            noteBookmark.setCreatedAt(LocalDateTime.now());
            noteBookmarkMapper.insert(noteBookmark);
        }
    }

    @Override
    @Transactional
    public Note cloneNote(Long userId, Long noteId) {
        // 1. VIP 鉴权校验
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new IllegalArgumentException("当前登录账号不存在");
        }
        boolean isVip = user.getVip() != null && user.getVip() == 1;
        boolean hasLevel = user.getVipLevel() != null && user.getVipLevel() >= 2;
        boolean notExpired = user.getVipExpireTime() == null || user.getVipExpireTime().isAfter(LocalDateTime.now());

        if (!"ADMIN".equalsIgnoreCase(user.getRole()) && (!isVip || !hasLevel || !notExpired)) {
            throw new AccessDeniedException("一键复用笔记属于【进阶 VIP】专属特权，请先升级会员状态");
        }

        // 2. 目标笔记校验
        Note sourceNote = getNoteById(noteId);
        if (!Boolean.TRUE.equals(sourceNote.getIsPublic())) {
            throw new IllegalArgumentException("该随堂笔记不是公开笔记，无法克隆复用");
        }
        if (sourceNote.getAuthorId().equals(userId)) {
            throw new IllegalArgumentException("您无法克隆复用您自己写的随堂笔记");
        }

        // 3. 克隆并保存为私人笔记
        Note cloned = Note.builder()
                .title("[复用] " + sourceNote.getTitle())
                .content(sourceNote.getContent())
                .category(sourceNote.getCategory())
                .technology(sourceNote.getTechnology())
                .subcategory(sourceNote.getSubcategory())
                .tags(sourceNote.getTags())
                .isPublic(false) // 默认为私人笔记
                .authorId(userId)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        noteMapper.insert(cloned);
        return cloned;
    }
}
