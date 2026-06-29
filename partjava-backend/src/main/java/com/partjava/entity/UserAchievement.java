package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
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
@TableName("user_achievements")
public class UserAchievement {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer userId;
    private String achievementId;
    private Boolean unlocked;
    private Integer progress;
    private LocalDateTime unlockedAt;
    private LocalDateTime createdAt;
}
