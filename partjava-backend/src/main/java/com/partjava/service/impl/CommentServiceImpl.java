package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.entity.Comment;
import com.partjava.entity.CommentLike;
import com.partjava.entity.User;
import com.partjava.repository.CommentLikeMapper;
import com.partjava.repository.CommentMapper;
import com.partjava.repository.UserMapper;
import com.partjava.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentMapper commentMapper;
    private final CommentLikeMapper commentLikeMapper;
    private final UserMapper userMapper;

    @Autowired
    public CommentServiceImpl(CommentMapper commentMapper,
                              CommentLikeMapper commentLikeMapper,
                              UserMapper userMapper) {
        this.commentMapper = commentMapper;
        this.commentLikeMapper = commentLikeMapper;
        this.userMapper = userMapper;
    }

    @Override
    public List<Comment> getCommentTreeByNoteId(Long userId, Long noteId) {
        // 1. 查找此笔记下所有的评论记录
        List<Comment> allComments = commentMapper.selectList(
                new LambdaQueryWrapper<Comment>()
                        .eq(Comment::getNoteId, noteId)
                        .orderByAsc(Comment::getCreatedAt)
        );
        if (allComments.isEmpty()) {
            return new ArrayList<>();
        }

        // 2. 批量查找相关的用户信息和点赞信息，避免循环连表 (N+1问题)
        List<Long> userIds = allComments.stream().map(Comment::getUserId).distinct().collect(Collectors.toList());
        List<User> users = userMapper.selectBatchIds(userIds);
        Map<Long, User> userMap = users.stream().collect(Collectors.toMap(User::getId, u -> u));

        // 批量统计点赞数并装载点赞映射
        List<Long> commentIds = allComments.stream().map(Comment::getId).collect(Collectors.toList());
        
        // 查找这些评论下所有的点赞记录
        List<CommentLike> allLikes = commentLikeMapper.selectList(
                new LambdaQueryWrapper<CommentLike>().in(CommentLike::getCommentId, commentIds)
        );
        // 按评论ID分组
        Map<Long, List<CommentLike>> likesGrouped = allLikes.stream()
                .collect(Collectors.groupingBy(CommentLike::getCommentId));

        // 3. 为所有评论组装基础拓展属性 (作者名、头像、点赞统计、当前用户点赞状态)
        for (Comment c : allComments) {
            User author = userMap.get(c.getUserId());
            if (author != null) {
                c.setAuthorName(author.getNickname());
                c.setAuthorAvatar(author.getAvatar());
            } else {
                c.setAuthorName("未知学员");
            }

            List<CommentLike> likes = likesGrouped.getOrDefault(c.getId(), new ArrayList<>());
            c.setLikeCount(likes.size());
            
            boolean userLiked = false;
            if (userId != null) {
                userLiked = likes.stream().anyMatch(l -> l.getUserId().equals(userId));
            }
            c.setLiked(userLiked);
        }

        // 4. 将列表结构转化为双层树状回复层级 (一级评论 -> replies 子回复)
        List<Comment> rootComments = new ArrayList<>();
        Map<Long, Comment> commentLookup = allComments.stream()
                .collect(Collectors.toMap(Comment::getId, c -> c));

        for (Comment c : allComments) {
            if (c.getParentId() == null) {
                c.setReplies(new ArrayList<>());
                rootComments.add(c);
            } else {
                Comment parent = commentLookup.get(c.getParentId());
                if (parent != null) {
                    if (parent.getReplies() == null) {
                        parent.setReplies(new ArrayList<>());
                    }
                    parent.getReplies().add(c);
                } else {
                    // 若找不到父级，降级作为一级根评论展示，防悬挂孤立
                    c.setReplies(new ArrayList<>());
                    rootComments.add(c);
                }
            }
        }

        return rootComments;
    }

    @Override
    @Transactional
    public Comment postComment(Long userId, Comment comment) {
        comment.setUserId(userId);
        comment.setCreatedAt(LocalDateTime.now());
        commentMapper.insert(comment);

        // 装配回显的昵称和头像
        User user = userMapper.selectById(userId);
        if (user != null) {
            comment.setAuthorName(user.getNickname());
            comment.setAuthorAvatar(user.getAvatar());
        }
        comment.setLikeCount(0);
        comment.setLiked(false);
        comment.setReplies(new ArrayList<>());

        return comment;
    }

    @Override
    @Transactional
    public void deleteComment(Long userId, Long commentId) {
        Comment existing = commentMapper.selectById(commentId);
        if (existing == null) {
            throw new IllegalArgumentException("评论已不存在");
        }

        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new IllegalArgumentException("当前登录账号不存在");
        }

        // 只有评论作者或管理员可删
        if (!existing.getUserId().equals(userId) && !"ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new AccessDeniedException("您没有权限删除此条评论");
        }

        // 级联物理删除子回复
        commentMapper.delete(new LambdaQueryWrapper<Comment>().eq(Comment::getParentId, commentId));
        commentMapper.deleteById(commentId);
    }

    @Override
    @Transactional
    public void toggleLikeComment(Long userId, Long commentId) {
        CommentLike existing = commentLikeMapper.selectOne(
                new LambdaQueryWrapper<CommentLike>()
                        .eq(CommentLike::getCommentId, commentId)
                        .eq(CommentLike::getUserId, userId)
        );
        if (existing != null) {
            commentLikeMapper.deleteById(existing.getId());
        } else {
            CommentLike commentLike = new CommentLike();
            commentLike.setCommentId(commentId);
            commentLike.setUserId(userId);
            commentLike.setCreatedAt(LocalDateTime.now());
            commentLikeMapper.insert(commentLike);
        }
    }
}
