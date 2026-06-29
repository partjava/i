package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("comments")
public class Comment {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long noteId;
    private Long userId;
    private String content;
    private Long parentId; // 父评论 ID，若是一级评论则为 null

    private LocalDateTime createdAt;

    // 树状关联，非数据库映射字段
    @TableField(exist = false)
    private List<Comment> replies; // 子回复评论列表

    @TableField(exist = false)
    private String authorName; // 冗余作者昵称

    @TableField(exist = false)
    private String authorAvatar; // 冗余作者头像

    @TableField(exist = false)
    private Integer likeCount; // 点赞数

    @TableField(exist = false)
    private Boolean liked; // 当前用户是否点赞
}
