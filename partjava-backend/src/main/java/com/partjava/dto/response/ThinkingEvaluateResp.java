package com.partjava.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThinkingEvaluateResp {
    private Integer score;
    private String feedback;
}
