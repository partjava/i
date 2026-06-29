package com.partjava.service.impl;

import com.partjava.dto.JudgementResult;
import com.partjava.service.SandboxService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.UUID;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class SandboxServiceImpl implements SandboxService {

    // 💡 引入最大并发评测容器流控，防止瞬时提交打爆宿主机 CPU/内存
    private final Semaphore sandboxSemaphore = new Semaphore(4);

    @Override
    public JudgementResult evaluateCode(String userCode, String evaluationScript, double timeLimitSec) {
        // 获取信号量锁许可
        boolean acquired = false;
        try {
            // 最多排队等待 10 秒，拿不到则熔断返回繁忙
            acquired = sandboxSemaphore.tryAcquire(10, TimeUnit.SECONDS);
            if (!acquired) {
                log.warn("沙箱评测并发数超限，请求进入熔断状态");
                return new JudgementResult("SYSTEM_BUSY", "系统评测繁忙，请稍后再试", 0);
            }
        } catch (InterruptedException e) {
            log.error("排队获取沙箱许可时线程被中断", e);
            Thread.currentThread().interrupt();
            return new JudgementResult("SYSTEM_ERROR", "评测排队中途被中断", 0);
        }

        File tempFile = null;
        try {
            // 1. 合并代码：用户前置引入 + 后台测试断言脚本
            String fullScriptContent = userCode + "\n\n" + evaluationScript;
            
            // 2. 在宿主机 /tmp 生成隔离脚本文件
            tempFile = File.createTempFile("sol_" + UUID.randomUUID(), ".py");
            Files.writeString(tempFile.toPath(), fullScriptContent, StandardCharsets.UTF_8);

            // 3. 构建无网、限存、只读挂载的 Docker 评测命令
            String[] dockerCmd = {
                "docker", "run", "--rm",
                "--network", "none",
                "-m", "512m",
                "--cpus", "1.0",
                "-v", "/home/liming/partjava/datasets:/data:ro", // 只读挂载科学数据集
                "-v", tempFile.getAbsolutePath() + ":/app/solution.py:ro", // 只读挂载用户代码
                "python-ml-env:latest",
                "python", "/app/solution.py"
            };

            long startTime = System.currentTimeMillis();
            ProcessBuilder pb = new ProcessBuilder(dockerCmd);
            pb.redirectErrorStream(true); // 合并异常输出
            Process process = pb.start();

            // 4. ⏳ 引入带物理超时的熔断阻断机制
            long systemTimeout = (long) Math.ceil(timeLimitSec + 2.0); // 宽容 2s 给系统开销
            boolean completed = process.waitFor(systemTimeout, TimeUnit.SECONDS);

            if (!completed) {
                process.destroyForcibly(); // 强制终止进程以释放系统内存
                log.warn("用户提交代码执行超时熔断被强杀，超时时间限制: {}s", timeLimitSec);
                return new JudgementResult("TIME_LIMIT_EXCEEDED", "评测超时，模型代码运行超出耗时限制", 0);
            }

            long duration = System.currentTimeMillis() - startTime;
            
            // 5. 读取容器内部脚本输出
            try (InputStream is = process.getInputStream()) {
                String outputLog = new String(is.readAllBytes(), StandardCharsets.UTF_8).trim();

                // 6. 解析状态标识符，打分通关
                if (outputLog.contains("__TEST_STATUS__:PASSED")) {
                    String successMsg = outputLog.split("__TEST_STATUS__:PASSED\\|")[1].trim();
                    return new JudgementResult("ACCEPTED", successMsg, duration);
                } else if (outputLog.contains("__TEST_STATUS__:FAILED")) {
                    String errorMsg = outputLog.split("__TEST_STATUS__:FAILED\\|")[1].trim();
                    return new JudgementResult("WRONG_ANSWER", errorMsg, duration);
                } else {
                    // 未捕获的语法错误或运行时崩溃
                    return new JudgementResult("RUNTIME_ERROR", outputLog, duration);
                }
            }

        } catch (Exception e) {
            log.error("沙箱执行器系统异常", e);
            return new JudgementResult("SYSTEM_ERROR", "后端评测模块发生内部错误: " + e.getMessage(), 0);
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete(); // 清理残留临时脚本
            }
            if (acquired) {
                sandboxSemaphore.release(); // 释放信号量锁
            }
        }
    }
}
