package com.partjava.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningStatsResp {

    private List<HeatmapData> heatmapData;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HeatmapData {
        private String date;
        private Integer count;
        private Integer level; // 0, 1, 2, 3, 4
    }
}
