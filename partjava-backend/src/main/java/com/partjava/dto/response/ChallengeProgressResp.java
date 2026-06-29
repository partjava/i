package com.partjava.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeProgressResp {
    private Integer completedStages;
    private Integer totalCount;
    private List<StageProgressItem> stagesProgress;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StageProgressItem {
        private String challengeId;
        private Boolean completed;
        private String quizStatus;
        private Integer thinkingScore;
    }
}
