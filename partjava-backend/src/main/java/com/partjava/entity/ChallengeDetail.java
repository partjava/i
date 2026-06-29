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
@TableName(value = "star_challenges", autoResultMap = true)
public class ChallengeDetail {

    @TableId(value = "id", type = IdType.INPUT)
    private Integer challengeId;             // 映射到大表的主键 id (int)

    @TableField("theory_content")
    private String theoryMarkdown;           // 理论 Markdown 正文

    @TableField(value = "latex_formulas", typeHandler = JacksonTypeHandler.class)
    private List<String> latexFormulas;      // LaTeX 公式数组

    @TableField("starter_code")
    private String starterCode;              // 起手代码

    @TableField("solution_code")
    private String solutionCode;             // 参考答案

    // 映射老表中的 test_cases JSON 字段。
    // 在本系统中它可以代替 required_datasets 存储评测相关的测试用例定义。
    @TableField(value = "test_cases", typeHandler = JacksonTypeHandler.class)
    private List<Object> testCases;          // 测试用例 JSON

    @TableField("thinking_question")
    private String thinkingQuestion;         // 主观题

    @TableField("ai_prompt")
    private String aiPrompt;                 // AI 评测 Prompt

    @TableField(exist = false)
    private String evaluationScript;         // 设为物理表不存在的字段，开发环境默认为 null
}
