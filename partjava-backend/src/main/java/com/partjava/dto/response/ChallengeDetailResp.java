package com.partjava.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeDetailResp {
    private String id;
    private String title;
    private Integer points;
    private String theory;
    private List<String> latexFormulas;
    private String starterCode;
    private String lastSavedCode;
    private List<QuizItem> conceptualQuizzes;
    private ThinkingQuestionConfig thinkingQuestion;
    private Boolean completed;
    private Map<String, Integer> quizAnswers;
    
    // ─── 补充前端所需的关卡和阶段位置核心属性 ───
    private Integer levelIndex;              // 关卡序号 (1, 2, 3)
    private String levelTitle;               // 关卡名称 (如: 流水线性能瓶颈分析器)
    private Integer stageId;                  // 所属阶段 (1-11)

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizItem {
        private String id;
        private String question;
        private List<String> options;
        private String explanation;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ThinkingQuestionConfig {
        private String id;
        private String question;
    }
}
