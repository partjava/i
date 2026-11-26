package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class NoteServiceImpl implements NoteService {

    private final NoteMapper noteMapper;
    private final NoteLikeMapper noteLikeMapper;
    private final NoteBookmarkMapper noteBookmarkMapper;
    private final UserMapper userMapper;
    private final ApplicationEventPublisher eventPublisher;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public NoteServiceImpl(NoteMapper noteMapper,
                           NoteLikeMapper noteLikeMapper,
                           NoteBookmarkMapper noteBookmarkMapper,
                           UserMapper userMapper,
                           ApplicationEventPublisher eventPublisher,
                           JdbcTemplate jdbcTemplate) {
        this.noteMapper = noteMapper;
        this.noteLikeMapper = noteLikeMapper;
        this.noteBookmarkMapper = noteBookmarkMapper;
        this.userMapper = userMapper;
        this.eventPublisher = eventPublisher;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Note> listNotes(Long userId, String category, String technology, Boolean isPublic) {
        LambdaQueryWrapper<Note> query = new LambdaQueryWrapper<>();
        
        // 严格隔离“我的笔记”与“公开笔记”，避免新建账号看到其他用户的笔记
        if (Boolean.FALSE.equals(isPublic)) {
            if (userId == null) {
                return List.of();
            }
            query.eq(Note::getIsPublic, false).eq(Note::getAuthorId, userId);
        } else if (Boolean.TRUE.equals(isPublic)) {
            query.eq(Note::getIsPublic, true);
        } else {
            if (userId != null) {
                query.eq(Note::getAuthorId, userId);
            } else {
                query.eq(Note::getIsPublic, true);
            }
        }
        
        if (category != null && !category.trim().isEmpty()) {
            query.eq(Note::getCategory, category.trim());
        }
        if (technology != null && !technology.trim().isEmpty()) {
            query.eq(Note::getTechnology, technology.trim());
        }
        
        query.orderByDesc(Note::getIsPinned)
             .orderByAsc(Note::getSortOrder)
             .orderByDesc(Note::getUpdatedAt)
             .orderByDesc(Note::getCreatedAt);
        List<Note> list = noteMapper.selectList(query);
        enrichNotes(list, userId);
        return list;
    }

    @Override
    public void enrichNotes(List<Note> notes, Long viewerUserId) {
        if (notes == null || notes.isEmpty()) return;
        populateAuthorNames(notes);

        List<Long> noteIds = notes.stream()
                .map(Note::getId)
                .filter(Objects::nonNull)
                .distinct()
                .toList();
        if (noteIds.isEmpty()) return;

        String placeholders = noteIds.stream().map(id -> "?").collect(Collectors.joining(","));
        Object[] idArgs = noteIds.toArray();

        Map<Long, Integer> likeCounts = queryCountMap("SELECT note_id, COUNT(*) AS cnt FROM note_likes WHERE note_id IN (" + placeholders + ") GROUP BY note_id", idArgs);
        Map<Long, Integer> bookmarkCounts = queryCountMap("SELECT note_id, COUNT(*) AS cnt FROM note_bookmarks WHERE note_id IN (" + placeholders + ") GROUP BY note_id", idArgs);
        Map<Long, Integer> commentCounts = queryCountMap("SELECT note_id, COUNT(*) AS cnt FROM comments WHERE note_id IN (" + placeholders + ") GROUP BY note_id", idArgs);

        Set<Long> likedSet = new HashSet<>();
        Set<Long> bookmarkedSet = new HashSet<>();
        if (viewerUserId != null) {
            try {
                List<Object> params = new ArrayList<>();
                params.add(viewerUserId);
                params.addAll(noteIds);
                List<Long> likedIds = jdbcTemplate.queryForList(
                        "SELECT note_id FROM note_likes WHERE user_id = ? AND note_id IN (" + placeholders + ")",
                        Long.class,
                        params.toArray()
                );
                likedSet.addAll(likedIds);
                List<Long> bmIds = jdbcTemplate.queryForList(
                        "SELECT note_id FROM note_bookmarks WHERE user_id = ? AND note_id IN (" + placeholders + ")",
                        Long.class,
                        params.toArray()
                );
                bookmarkedSet.addAll(bmIds);
            } catch (Exception e) {
                log.debug("查询用户点赞收藏状态跳过: {}", e.getMessage());
            }
        }

        // 批量加载子章节摘要（支持合集卡片直接展示章节列表）
        Map<Long, List<Map<String, Object>>> childrenMap = new HashMap<>();
        try {
            List<Map<String, Object>> childRows = jdbcTemplate.queryForList(
                    "SELECT id, parent_id, title, sort_order, category, is_public, author_id, updated_at " +
                    "FROM notes WHERE parent_id IN (" + placeholders + ") ORDER BY sort_order ASC, id ASC",
                    idArgs
            );
            for (Map<String, Object> row : childRows) {
                Object pObj = row.get("parent_id");
                if (pObj == null) continue;
                Long pId = ((Number) pObj).longValue();
                boolean childPublic = row.get("is_public") != null && (((row.get("is_public") instanceof Boolean b) && b)
                        || (row.get("is_public") instanceof Number num && num.intValue() != 0));
                Long childAuthor = row.get("author_id") != null ? ((Number) row.get("author_id")).longValue() : null;
                if (!childPublic && (viewerUserId == null || !viewerUserId.equals(childAuthor))) {
                    continue;
                }
                Map<String, Object> summary = new LinkedHashMap<>();
                summary.put("id", row.get("id"));
                summary.put("title", row.get("title"));
                summary.put("sortOrder", row.get("sort_order"));
                summary.put("category", row.get("category"));
                summary.put("isPublic", childPublic);
                summary.put("updatedAt", row.get("updated_at"));
                childrenMap.computeIfAbsent(pId, k -> new ArrayList<>()).add(summary);
            }
        } catch (Exception e) {
            log.debug("批量加载子章节摘要跳过: {}", e.getMessage());
        }

        // 批量加载父笔记标题（用于子笔记展示所属合集）
        Map<Long, String> parentTitleMap = new HashMap<>();
        List<Long> parentIds = notes.stream()
                .map(Note::getParentId)
                .filter(Objects::nonNull)
                .distinct()
                .toList();
        if (!parentIds.isEmpty()) {
            try {
                List<Note> parents = noteMapper.selectBatchIds(parentIds);
                for (Note p : parents) {
                    if (p != null && p.getId() != null) {
                        parentTitleMap.put(p.getId(), p.getTitle());
                    }
                }
            } catch (Exception ignored) {
            }
        }

        for (Note n : notes) {
            if (n == null || n.getId() == null) continue;
            n.setLikeCount(likeCounts.getOrDefault(n.getId(), 0));
            n.setBookmarkCount(bookmarkCounts.getOrDefault(n.getId(), 0));
            n.setCommentCount(commentCounts.getOrDefault(n.getId(), 0));
            n.setLiked(likedSet.contains(n.getId()));
            n.setBookmarked(bookmarkedSet.contains(n.getId()));
            List<Map<String, Object>> childList = childrenMap.getOrDefault(n.getId(), Collections.emptyList());
            n.setChildren(childList);
            n.setChildCount(childList.size());
            if (n.getParentId() != null) {
                n.setParentTitle(parentTitleMap.get(n.getParentId()));
            }
            if (n.getIsPinned() == null) {
                n.setIsPinned(false);
            }
            if (n.getSortOrder() == null) {
                n.setSortOrder(0);
            }
        }
    }

    private Map<Long, Integer> queryCountMap(String sql, Object[] args) {
        Map<Long, Integer> map = new HashMap<>();
        try {
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, args);
            for (Map<String, Object> row : rows) {
                Object idObj = row.get("note_id");
                Object cntObj = row.get("cnt");
                if (idObj instanceof Number idNum && cntObj instanceof Number cntNum) {
                    map.put(idNum.longValue(), cntNum.intValue());
                }
            }
        } catch (Exception e) {
            log.debug("统计查询跳过: {}", e.getMessage());
        }
        return map;
    }

    private void populateAuthorNames(List<Note> notes) {
        if (notes == null || notes.isEmpty() || userMapper == null) return;
        try {
            List<Long> authorIds = notes.stream()
                    .map(Note::getAuthorId)
                    .filter(Objects::nonNull)
                    .distinct()
                    .toList();
            if (authorIds.isEmpty()) return;
            List<User> authors = userMapper.selectBatchIds(authorIds);
            if (authors == null) return;
            Map<Long, String> nameMap = new HashMap<>();
            for (User u : authors) {
                if (u != null && u.getId() != null) {
                    String display = (u.getNickname() != null && !u.getNickname().isBlank())
                            ? u.getNickname()
                            : u.getUsername();
                    nameMap.put(u.getId(), display);
                }
            }
            for (Note n : notes) {
                if (n != null && n.getAuthorId() != null && n.getAuthorName() == null) {
                    n.setAuthorName(nameMap.get(n.getAuthorId()));
                }
            }
        } catch (Exception ignored) {
        }
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
            throw new AccessDeniedException("无权查看该笔记");
        }
        enrichNotes(List.of(note), userId);
        return note;
    }

    @Override
    @Transactional
    public Note createNote(Long userId, Note note) {
        note.setAuthorId(userId);
        if (note.getIsPinned() == null) {
            note.setIsPinned(false);
        }
        if (note.getParentId() != null) {
            Note parent = getNoteById(note.getParentId());
            if (!userId.equals(parent.getAuthorId())) {
                throw new AccessDeniedException("无权向他人的笔记合集中添加子章节");
            }
            if (note.getSortOrder() == null) {
                Integer maxSort = jdbcTemplate.queryForObject(
                        "SELECT COALESCE(MAX(sort_order), -1) FROM notes WHERE parent_id = ?",
                        Integer.class,
                        note.getParentId()
                );
                note.setSortOrder((maxSort != null ? maxSort : -1) + 1);
            }
        } else if (note.getSortOrder() == null) {
            note.setSortOrder(0);
        }
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        noteMapper.insert(note);
        
        // 发布“创建笔记”行为事件
        eventPublisher.publishEvent(new UserActionEvent(this, userId.intValue(), "CREATE_NOTE", 1));
        
        // 如果新建时即设为公开，发布“分享笔记”行为事件
        if (Boolean.TRUE.equals(note.getIsPublic())) {
            eventPublisher.publishEvent(new UserActionEvent(this, userId.intValue(), "SHARE_NOTE", 1));
        }
        
        enrichNotes(List.of(note), userId);
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
        if (note.getParentId() != null) {
            existing.setParentId(note.getParentId());
        }
        if (note.getSortOrder() != null) {
            existing.setSortOrder(note.getSortOrder());
        }
        if (note.getIsPinned() != null) {
            existing.setIsPinned(note.getIsPinned());
        }
        existing.setUpdatedAt(LocalDateTime.now());
        
        noteMapper.updateById(existing);
        
        // 如果笔记状态由私有更新为公开，分发分享事件
        if (!wasPublic && isNowPublic) {
            eventPublisher.publishEvent(new UserActionEvent(this, userId.intValue(), "SHARE_NOTE", 1));
        }
        
        enrichNotes(List.of(existing), userId);
        return existing;
    }

    @Override
    @Transactional
    public void deleteNote(Long userId, Long noteId) {
        Note existing = getNoteById(noteId);
        if (!existing.getAuthorId().equals(userId)) {
            throw new AccessDeniedException("您没有权限删除该随堂笔记");
        }
        // 安全提升：如果被删除笔记下面还有子章节，将其提升为独立顶层笔记，避免连带误删内容
        jdbcTemplate.update("UPDATE notes SET parent_id = NULL WHERE parent_id = ?", noteId);
        noteMapper.deleteById(noteId);
    }

    @Override
    @Transactional
    public Note moveNote(Long userId, Long noteId, Long targetParentId, boolean clearParent, String newCategory, Integer sortOrder) {
        Note existing = getNoteById(noteId);
        if (!userId.equals(existing.getAuthorId())) {
            throw new AccessDeniedException("无权移动该笔记");
        }

        LambdaUpdateWrapper<Note> uw = new LambdaUpdateWrapper<Note>()
                .eq(Note::getId, noteId)
                .set(Note::getUpdatedAt, LocalDateTime.now());

        if (clearParent) {
            uw.set(Note::getParentId, null);
            if (sortOrder != null) {
                uw.set(Note::getSortOrder, sortOrder);
            }
        } else if (targetParentId != null) {
            if (noteId.equals(targetParentId)) {
                throw new IllegalArgumentException("不能将笔记移入自身");
            }
            Note targetParent = getNoteById(targetParentId);
            if (!userId.equals(targetParent.getAuthorId())) {
                throw new AccessDeniedException("只能将笔记归并到自己的笔记合集中");
            }
            // 循环引用防护：向上追溯 targetParent 的祖先链，禁止把祖先拖入后代
            Long cursor = targetParent.getParentId();
            int guard = 0;
            while (cursor != null && guard < 20) {
                if (noteId.equals(cursor)) {
                    throw new IllegalArgumentException("检测到循环嵌套，无法将该合集移入其子章节下");
                }
                Note ancestor = noteMapper.selectById(cursor);
                cursor = ancestor != null ? ancestor.getParentId() : null;
                guard++;
            }
            uw.set(Note::getParentId, targetParentId);
            Integer nextOrder = sortOrder;
            if (nextOrder == null) {
                Integer maxSort = jdbcTemplate.queryForObject(
                        "SELECT COALESCE(MAX(sort_order), -1) FROM notes WHERE parent_id = ?",
                        Integer.class,
                        targetParentId
                );
                nextOrder = (maxSort != null ? maxSort : -1) + 1;
            }
            uw.set(Note::getSortOrder, nextOrder);
        }

        if (newCategory != null) {
            uw.set(Note::getCategory, newCategory.trim());
        }

        noteMapper.update(null, uw);
        return getNoteById(noteId, userId);
    }

    @Override
    @Transactional
    public void reorderChapters(Long userId, Long parentId, List<Long> orderedIds) {
        if (orderedIds == null || orderedIds.isEmpty()) return;
        for (int i = 0; i < orderedIds.size(); i++) {
            Long id = orderedIds.get(i);
            Note item = noteMapper.selectById(id);
            if (item == null || !userId.equals(item.getAuthorId())) {
                continue;
            }
            LambdaUpdateWrapper<Note> uw = new LambdaUpdateWrapper<Note>()
                    .eq(Note::getId, id)
                    .set(Note::getSortOrder, i)
                    .set(Note::getUpdatedAt, LocalDateTime.now());
            if (parentId != null && !parentId.equals(id)) {
                uw.set(Note::getParentId, parentId);
            }
            noteMapper.update(null, uw);
        }
    }

    @Override
    @Transactional
    public Note togglePin(Long userId, Long noteId) {
        Note existing = getNoteById(noteId);
        if (!userId.equals(existing.getAuthorId())) {
            throw new AccessDeniedException("无权置顶该笔记");
        }
        boolean nextPinned = !Boolean.TRUE.equals(existing.getIsPinned());
        noteMapper.update(null, new LambdaUpdateWrapper<Note>()
                .eq(Note::getId, noteId)
                .set(Note::getIsPinned, nextPinned));
        return getNoteById(noteId, userId);
    }

    @Override
    public Map<String, Object> getNoteTree(Long noteId, Long viewerUserId) {
        Note current = getNoteById(noteId, viewerUserId);
        // 向上寻找整本合集的根节点
        Note root = current;
        Set<Long> visited = new HashSet<>();
        visited.add(root.getId());
        int guard = 0;
        while (root.getParentId() != null && guard < 10) {
            if (visited.contains(root.getParentId())) break;
            Note candidate = noteMapper.selectById(root.getParentId());
            if (candidate == null) break;
            boolean canSee = Boolean.TRUE.equals(candidate.getIsPublic())
                    || (viewerUserId != null && viewerUserId.equals(candidate.getAuthorId()));
            if (!canSee) break;
            visited.add(candidate.getId());
            root = candidate;
            guard++;
        }

        // 广度遍历构建有序章节列表
        List<Map<String, Object>> chapters = new ArrayList<>();
        collectSubChapters(root.getId(), 1, viewerUserId, new HashSet<>(List.of(root.getId())), chapters);

        Map<String, Object> rootSummary = new LinkedHashMap<>();
        rootSummary.put("id", root.getId());
        rootSummary.put("title", root.getTitle());
        rootSummary.put("category", root.getCategory());
        rootSummary.put("technology", root.getTechnology());
        rootSummary.put("isPublic", Boolean.TRUE.equals(root.getIsPublic()));
        rootSummary.put("authorId", root.getAuthorId());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("root", rootSummary);
        result.put("chapters", chapters);
        result.put("currentId", noteId);
        return result;
    }

    private void collectSubChapters(Long parentId, int depth, Long viewerUserId, Set<Long> seen, List<Map<String, Object>> out) {
        if (depth > 4) return;
        LambdaQueryWrapper<Note> q = new LambdaQueryWrapper<Note>()
                .eq(Note::getParentId, parentId)
                .orderByAsc(Note::getSortOrder)
                .orderByAsc(Note::getId);
        List<Note> kids = noteMapper.selectList(q);
        for (Note k : kids) {
            if (k == null || seen.contains(k.getId())) continue;
            boolean canSee = Boolean.TRUE.equals(k.getIsPublic())
                    || (viewerUserId != null && viewerUserId.equals(k.getAuthorId()));
            if (!canSee) continue;
            seen.add(k.getId());
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("id", k.getId());
            row.put("title", k.getTitle());
            row.put("parentId", k.getParentId());
            row.put("sortOrder", k.getSortOrder() != null ? k.getSortOrder() : 0);
            row.put("depth", depth);
            row.put("category", k.getCategory());
            row.put("isPublic", Boolean.TRUE.equals(k.getIsPublic()));
            row.put("updatedAt", k.getUpdatedAt());
            out.add(row);
            collectSubChapters(k.getId(), depth + 1, viewerUserId, seen, out);
        }
    }

    @Override
    public List<Map<String, Object>> getBacklinks(Long noteId, Long viewerUserId) {
        Note target = getNoteById(noteId, viewerUserId);
        if (target.getTitle() == null || target.getTitle().isBlank()) {
            return List.of();
        }
        String linkPattern = "[[" + target.getTitle().trim() + "]]";
        LambdaQueryWrapper<Note> q = new LambdaQueryWrapper<Note>()
                .ne(Note::getId, noteId)
                .like(Note::getContent, linkPattern);
        if (viewerUserId != null) {
            q.and(w -> w.eq(Note::getIsPublic, true).or().eq(Note::getAuthorId, viewerUserId));
        } else {
            q.eq(Note::getIsPublic, true);
        }
        q.orderByDesc(Note::getUpdatedAt);
        List<Note> refs = noteMapper.selectList(q);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Note r : refs) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", r.getId());
            item.put("title", r.getTitle());
            item.put("category", r.getCategory());
            item.put("updatedAt", r.getUpdatedAt());
            String content = r.getContent() != null ? r.getContent() : "";
            int idx = content.indexOf(linkPattern);
            if (idx >= 0) {
                int start = Math.max(0, idx - 32);
                int end = Math.min(content.length(), idx + linkPattern.length() + 48);
                item.put("excerpt", content.substring(start, end).replaceAll("[\\r\\n]+", " ").trim());
            } else {
                item.put("excerpt", "");
            }
            result.add(item);
        }
        return result;
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
