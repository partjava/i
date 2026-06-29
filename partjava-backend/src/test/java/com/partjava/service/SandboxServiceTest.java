package com.partjava.service;

import com.partjava.dto.JudgementResult;
import com.partjava.service.impl.SandboxServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class SandboxServiceTest {

    private SandboxService sandboxService;

    @BeforeEach
    public void setUp() {
        sandboxService = new SandboxServiceImpl();
    }

    private boolean isDockerMissing(JudgementResult result) {
        String msg = result.getMessage();
        if (msg == null) return false;
        return ("SYSTEM_ERROR".equals(result.getStatus()) && (msg.contains("docker") || msg.contains("Cannot run program")))
                || ("RUNTIME_ERROR".equals(result.getStatus()) && (msg.contains("docker") || msg.contains("not found") || msg.contains("Docker")));
    }

    @Test
    public void testDockerAvailabilityOrFallback() {
        // 测试正常通过的代码
        String userCode = "def add(a, b):\n    return a + b";
        String evalScript = "assert add(1, 2) == 3\nprint('__TEST_STATUS__:PASSED|测试全部通过')";

        JudgementResult result = sandboxService.evaluateCode(userCode, evalScript, 2.0);

        System.out.println("=== testDockerAvailabilityOrFallback ===");
        System.out.println("Status: " + result.getStatus());
        System.out.println("Message: " + result.getMessage());

        if (isDockerMissing(result)) {
            System.out.println("⚠️ 提示: 本地开发环境未安装或未启用 Docker Integration，跳过断言。这是正常表现。");
        } else {
            // 如果本地有 Docker 且安装了 python-ml-env:latest 镜像，则应该正确判定为 ACCEPTED
            assertEquals("ACCEPTED", result.getStatus());
            assertTrue(result.getMessage().contains("测试全部通过"));
        }
    }

    @Test
    public void testWrongAnswerOutput() {
        String userCode = "def add(a, b):\n    return a - b"; // 错误的实现
        String evalScript = "if add(1, 2) != 3:\n    print('__TEST_STATUS__:FAILED|加法计算错误')\nelse:\n    print('__TEST_STATUS__:PASSED|通过')";

        JudgementResult result = sandboxService.evaluateCode(userCode, evalScript, 2.0);

        System.out.println("=== testWrongAnswerOutput ===");
        System.out.println("Status: " + result.getStatus());
        System.out.println("Message: " + result.getMessage());

        if (isDockerMissing(result)) {
            System.out.println("⚠️ 提示: 本地开发环境未安装或未启用 Docker Integration，跳过断言。");
        } else {
            assertEquals("WRONG_ANSWER", result.getStatus());
            assertEquals("加法计算错误", result.getMessage());
        }
    }

    @Test
    public void testRuntimeExceptionOutput() {
        String userCode = "def add(a, b):\n    return a / 0"; // 除零异常
        String evalScript = "assert add(1, 2) == 3";

        JudgementResult result = sandboxService.evaluateCode(userCode, evalScript, 2.0);

        System.out.println("=== testRuntimeExceptionOutput ===");
        System.out.println("Status: " + result.getStatus());
        System.out.println("Message: " + result.getMessage());

        if (isDockerMissing(result)) {
            System.out.println("⚠️ 提示: 本地开发环境未安装或未启用 Docker Integration，跳过断言。");
        } else {
            assertEquals("RUNTIME_ERROR", result.getStatus());
            assertTrue(result.getMessage().contains("ZeroDivisionError"));
        }
    }
}
