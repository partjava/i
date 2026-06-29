package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Comment;
import com.partjava.entity.CommentLike;
import com.partjava.repository.CommentLikeMapper;
import com.partjava.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final CommentLikeMapper commentLikeMapper;

    public CommentController(CommentService commentService, CommentLikeMapper commentLikeMapper) {
        this.commentService = commentService;
        this.commentLikeMapper = commentLikeMapper;
    }

    private Long getUserIdOrFallback(Integer userId) {
        if (userId == null) {
            return 1L; // 默认测试账号 ID 1
        }
        return Long.valueOf(userId);
    }

    /**
     * 获取随堂笔记下的树形回复与评论列表
     */
    @GetMapping
    public ApiResponse<List<Comment>> getComments(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestParam("noteId") Long noteId) {
        Long activeUserId = getUserIdOrFallback(userId);
        List<Comment> tree = commentService.getCommentTreeByNoteId(activeUserId, noteId);
        return ApiResponse.success(tree);
    }

    /**
     * 发表评论（或者回复二级评论）
     */
    @PostMapping
    public ApiResponse<Comment> postComment(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestBody Comment comment) {
        Long activeUserId = getUserIdOrFallback(userId);
        Comment created = commentService.postComment(activeUserId, comment);
        return ApiResponse.success(created);
    }

    /**
     * 删除评论
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteComment(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long commentId) {
        Long activeUserId = getUserIdOrFallback(userId);
        commentService.deleteComment(activeUserId, commentId);
        return ApiResponse.success(null);
    }

    /**
     * 点赞或取消点赞评论
     */
    @PostMapping("/{id}/like")
    public ApiResponse<Void> toggleLike(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long commentId) {
        Long activeUserId = getUserIdOrFallback(userId);
        commentService.toggleLikeComment(activeUserId, commentId);
        return ApiResponse.success(null);
    }

    /**
     * 取消点赞评论，兼容旧 Next.js DELETE /api/comments/{id}/like。
     */
    @DeleteMapping("/{id}/like")
    public ApiResponse<Map<String, Object>> unlike(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long commentId) {
        Long activeUserId = getUserIdOrFallback(userId);
        commentLikeMapper.delete(new LambdaQueryWrapper<CommentLike>()
                .eq(CommentLike::getCommentId, commentId)
                .eq(CommentLike::getUserId, activeUserId));
        Long likeCount = commentLikeMapper.selectCount(
                new LambdaQueryWrapper<CommentLike>().eq(CommentLike::getCommentId, commentId)
        );
        return ApiResponse.success(Map.of("message", "取消点赞成功", "likeCount", likeCount));
    }

}
