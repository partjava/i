package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("challenge_submissions")
public class ChallengeSubmission {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("challenge_id")
    private Integer challengeId;

    @TableField("user_id")
    private Integer userId;

    @TableField("code")
    private String code;

    @TableField("language")
    private String language;

    @TableField("status")
    private String status;

    @TableField("score")
    private Integer score;

    @TableField("execution_time")
    private Long executionTime;

    @TableField("error_message")
    private String errorMessage;

    @TableField("submitted_at")
    private LocalDateTime submittedAt;
}
