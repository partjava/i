package com.partjava.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JudgementResult {
    private String status;      // ACCEPTED, WRONG_ANSWER, TIME_LIMIT_EXCEEDED, RUNTIME_ERROR, SYSTEM_BUSY, SYSTEM_ERROR
    private String message;     // 报错信息或者测试结果日志
    private long runtimeMs;     // 代码运行耗时(毫秒)
}
