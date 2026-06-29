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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("user_profiles")
public class UserProfile {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("user_id")
    private Long userId;

    @TableField("name")
    private String name;

    @TableField("job_title")
    private String jobTitle;

    @TableField("company")
    private String company;

    @TableField("bio")
    private String bio;

    @TableField("location")
    private String location;

    @TableField("website")
    private String website;

    @TableField("github")
    private String github;

    @TableField("skills")
    private String skills; // JSON string format

    @TableField("social_links")
    private String socialLinks; // JSON string format

    @TableField("avatar")
    private String avatar;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;
}
