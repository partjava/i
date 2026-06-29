package com.partjava.service;

import com.partjava.entity.Comment;
import java.util.List;

public interface CommentService {
    /**
     * 获取随堂笔记下完整的树状评论列表
     */
    List<Comment> getCommentTreeByNoteId(Long userId, Long noteId);

    /**
     * 发表新评论或进行二级回复
     */
    Comment postComment(Long userId, Comment comment);

    /**
     * 删除评论
     */
    void deleteComment(Long userId, Long commentId);

    /**
     * 点赞或取消点赞评论
     */
    void toggleLikeComment(Long userId, Long commentId);
}
