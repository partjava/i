package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "star_challenge_quizzes", autoResultMap = true)
public class ChallengeQuiz {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("challenge_id")
    private Integer challengeId;             // 外键关联 star_challenges.id (int)

    @TableField("question_text")
    private String question;                 // 题干 (question_text)

    @TableField(value = "options", typeHandler = JacksonTypeHandler.class)
    private List<String> options;            // 选项列表

    @TableField("correct_index")
    private Integer correctIndex;            // 正确答案索引

    private String explanation;              // 解析
}
