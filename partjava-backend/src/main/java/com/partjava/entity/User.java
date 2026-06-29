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
@TableName("users")
public class User {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("username")
    private String username;

    @TableField("name")
    private String nickname;

    @TableField("email")
    private String email;

    @TableField("password")
    private String passwordHash;

    @TableField("role")
    private String role; // 'USER', 'ADMIN'

    @TableField("status")
    private String status; // 'ACTIVE', 'BANNED'

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("bio")
    private String bio;

    @TableField("location")
    private String location;

    @TableField("website")
    private String website;

    @TableField("github")
    private String github;

    @TableField("avatar")
    private String avatar;

    @TableField("vip")
    private Integer vip; // 0=普通用户, 1=VIP会员

    @TableField("vip_level")
    private Integer vipLevel; // 1=体验, 2=进阶, 3=永久共创

    @TableField("vip_expire_time")
    private LocalDateTime vipExpireTime; // 会员到期时间

    @TableField("draft_count")
    private Integer draftCount; // 本月已出题数
}
