package com.partjava.service;

import com.partjava.dto.JudgementResult;

public interface SandboxService {
    /**
     * 使用挑战专用 OnlineCompiler 服务运行并评测用户提交的代码
     *
     * @param userCode          用户填写的 Python 代码
     * @param evaluationScript  JSON 测试配置 {cases:[{function,args,kwargs,expected,mode}]}，不是可执行脚本
     * @param timeLimitSec      执行时限限制（秒）
     * @return 评测判定结果
     */
    JudgementResult evaluateCode(String userCode, String evaluationScript, double timeLimitSec);
}
