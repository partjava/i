package com.partjava.service;

import com.partjava.entity.Note;
import java.util.List;
import java.util.Map;

public interface NoteService {
    /**
     * 条件筛选列表获取笔记
     */
    List<Note> listNotes(Long userId, String category, String technology, Boolean isPublic);

    /**
     * 获取单个笔记详情（外部调用，无用户上下文）
     */
    Note getNoteById(Long noteId);

    /**
     * 获取单个笔记详情（带用户鉴权，非公开笔记仅作者可查看）
     */
    Note getNoteById(Long noteId, Long userId);

    /**
     * 批量填充笔记作者名、互动统计、子章节及当前用户点赞/收藏状态
     */
    void enrichNotes(List<Note> notes, Long viewerUserId);

    /**
     * 新建随堂笔记
     */
    Note createNote(Long userId, Note note);

    /**
     * 修改随堂笔记
     */
    Note updateNote(Long userId, Long noteId, Note note);

    /**
     * 删除随堂笔记
     */
    void deleteNote(Long userId, Long noteId);

    /**
     * 拖拽调整笔记归属合集（parentId）、置回顶层（clearParent）或变更分类（category）
     */
    Note moveNote(Long userId, Long noteId, Long targetParentId, boolean clearParent, String newCategory, Integer sortOrder);

    /**
     * 批量调整合集章节顺序
     */
    void reorderChapters(Long userId, Long parentId, List<Long> orderedIds);

    /**
     * 切换笔记置顶状态
     */
    Note togglePin(Long userId, Long noteId);

    /**
     * 获取多章节合集目录树
     */
    Map<String, Object> getNoteTree(Long noteId, Long viewerUserId);

    /**
     * 获取双链反向引用（哪些笔记通过 [[标题]] 引用了当前笔记）
     */
    List<Map<String, Object>> getBacklinks(Long noteId, Long viewerUserId);

    /**
     * 一键点赞或取消点赞笔记
     */
    void toggleLikeNote(Long userId, Long noteId);

    /**
     * 一键收藏或取消收藏笔记
     */
    void toggleBookmarkNote(Long userId, Long noteId);

    /**
     * 进阶会员专享：一键复用/克隆他人公开笔记
     */
    Note cloneNote(Long userId, Long noteId);
}
