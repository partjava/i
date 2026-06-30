package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@TableName(value = "challenge_drafts", autoResultMap = true)
public class ChallengeDraft {

    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer userId;             // 出题会员用户ID
    private Integer stageId;            // 阶段ID (1-11)
    private String topicName;           // 主题名称
    private String subtopicName;        // 小节名称
    private String levelTitle;          // 关卡标题
    private Integer levelIndex;         // 关卡序号 (该小节第几题)
    private String theoryContent;       // Markdown 理论正文
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> latexFormulas; // LaTeX公式数组

    private String starterCode;         // 起手代码
    private String solutionCode;        // 标准参考答案

    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<QuizDraftItem> quizzes;// 选择题列表 JSON 格式

    private String thinkingQuestion;    // 开放式思考题
    private String aiPrompt;            // AI打分提示词
    
    private String status;              // 状态: pending, approved, rejected
    private String reviewComment;       // 审核建议
    private Integer reviewerId;         // 审核人管理员ID
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String difficulty;           // 难度: foundation/easy/medium/hard
    private String accessLevel;          // 访问权限: free/member/vip
    private Boolean isPublic;            // 是否公开: true=所有人可见, false=仅自己可见

    @TableField(value = "test_cases", typeHandler = JacksonTypeHandler.class)
    private List<TestCaseItem> testCases;       // 可见测试样例 (学生可看)

    @TableField(value = "evaluation_cases", typeHandler = JacksonTypeHandler.class)
    private List<TestCaseItem> evaluationCases;  // 隐藏判题样例 (判题用)

    @Data
    public static class QuizDraftItem {
        private String question;
        private List<String> options;
        private Integer answer;         // 正确答案索引 (0-3)
        private String explanation;
    }

    @Data
    public static class TestCaseItem {
        private String input;
        private String expected;
    }
}
