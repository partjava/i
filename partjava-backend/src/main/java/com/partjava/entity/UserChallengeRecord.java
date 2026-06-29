package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "star_challenge_records", autoResultMap = true)
public class UserChallengeRecord {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("user_id")
    private Integer userId;

    @TableField("challenge_id")
    private Integer challengeId;             // 关联 star_challenges.id (int)

    @TableField("code_passed")
    private Boolean completed;               // code_passed = 1 表示通关

    @TableField(exist = false)
    private String bestCode;                 // 老表结构暂无最优代码备份，设为不持久化

    @TableField(exist = false)
    private String lastCode;                 // 设为不持久化

    @TableField(value = "quiz_answers", typeHandler = JacksonTypeHandler.class)
    private Map<String, Integer> quizAnswers; // 用户的选择题作答草稿

    @TableField("thinking_score")
    private Integer thinkingScore;

    @TableField("thinking_feedback")
    private String thinkingFeedback;

    @TableField("completed_at")
    private LocalDateTime completedAt;
}
