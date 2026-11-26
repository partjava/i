package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "notes", autoResultMap = true)
public class Note {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String title;
    private String content;
    private String category;
    private String technology;
    private String subcategory;

    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> tags; // 标签列表 JSON 数组

    private Boolean isPublic;
    private Long authorId;

    private Long parentId;
    private Integer sortOrder;
    private Boolean isPinned;

    @TableField(exist = false)
    private String authorName;

    @com.fasterxml.jackson.annotation.JsonProperty("author_name")
    public String getAuthor_name() {
        return authorName;
    }

    @TableField(exist = false)
    private Integer likeCount;

    @TableField(exist = false)
    private Integer bookmarkCount;

    @TableField(exist = false)
    private Integer commentCount;

    @TableField(exist = false)
    private Boolean liked;

    @TableField(exist = false)
    private Boolean bookmarked;

    @TableField(exist = false)
    private Integer childCount;

    @TableField(exist = false)
    private List<Map<String, Object>> children;

    @TableField(exist = false)
    private String parentTitle;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
