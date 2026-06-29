package com.partjava.service;

import com.partjava.entity.Note;
import java.util.List;

public interface NoteService {
    /**
     * 条件筛选列表获取笔记
     */
    List<Note> listNotes(Long userId, String category, String technology, Boolean isPublic);

    /**
     * 获取单个笔记详情
     */
    Note getNoteById(Long noteId);

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
