package com.partjava.common.utils;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JwtUtils 单元测试：签发/解析/校验闭环、篡改拒绝、过期判定、
 * 以及未配置 JWT_SECRET 时的随机密钥兜底行为。
 */
class JwtUtilsTest {

    private JwtUtils jwtUtils;

    @BeforeEach
    void setUp() {
        jwtUtils = new JwtUtils();
        // 显式注入测试密钥（模拟 JWT_SECRET 环境变量；长度满足 HS256 的 32 字节要求）
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret",
                "unit-test-signing-secret-with-at-least-32-bytes!!");
        ReflectionTestUtils.setField(jwtUtils, "jwtExpiration", 86_400_000L);
    }

    @Test
    @DisplayName("签发 → 解析：用户名与角色声明完整还原")
    void tokenRoundTripPreservesClaims() {
        String token = jwtUtils.generateToken("alice", "USER");

        assertEquals("alice", jwtUtils.extractUsername(token));
        assertEquals("USER", jwtUtils.extractRole(token));
        assertTrue(jwtUtils.validateToken(token, "alice"));
        assertFalse(jwtUtils.validateToken(token, "bob"), "用户名不匹配时应校验失败");
        assertFalse(jwtUtils.isTokenExpired(token));
    }

    @Test
    @DisplayName("签名篡改：被修改的 Token 必须被拒绝")
    void tamperedTokenIsRejected() {
        String token = jwtUtils.generateToken("alice", "ADMIN");
        String tampered = token.substring(0, token.length() - 3) + "xyz";

        assertThrows(JwtException.class, () -> jwtUtils.extractUsername(tampered),
                "篡改签名的 Token 解析必须抛出异常（防止伪造管理员身份）");
    }

    @Test
    @DisplayName("密钥不一致：其他密钥签发的 Token 必须被拒绝")
    void tokenSignedWithDifferentSecretIsRejected() {
        String token = jwtUtils.generateToken("alice", "ADMIN");

        JwtUtils other = new JwtUtils();
        ReflectionTestUtils.setField(other, "jwtSecret",
                "another-completely-different-secret-32-bytes-long!");
        ReflectionTestUtils.setField(other, "jwtExpiration", 86_400_000L);

        assertThrows(JwtException.class, () -> other.extractUsername(token));
    }

    @Test
    @DisplayName("过期判定：expiration 设为过去时间后 Token 判定为过期")
    void expiredTokenIsDetected() {
        ReflectionTestUtils.setField(jwtUtils, "jwtExpiration", -1_000L);
        String token = jwtUtils.generateToken("alice", "USER");

        assertTrue(jwtUtils.isTokenExpired(token));
        assertFalse(jwtUtils.validateToken(token, "alice"));
    }

    @Test
    @DisplayName("安全兜底：未配置 JWT_SECRET 时自动生成随机密钥且互不通用")
    void blankSecretFallsBackToRandomPerInstance() {
        JwtUtils a = new JwtUtils();
        ReflectionTestUtils.setField(a, "jwtSecret", "");
        ReflectionTestUtils.setField(a, "jwtExpiration", 86_400_000L);

        JwtUtils b = new JwtUtils();
        ReflectionTestUtils.setField(b, "jwtSecret", "  ");
        ReflectionTestUtils.setField(b, "jwtExpiration", 86_400_000L);

        // 各自可用
        String tokenA = a.generateToken("alice", "USER");
        assertEquals("alice", a.extractUsername(tokenA));

        // 但 A 的随机密钥无法被 B 验证（证明回退密钥是随机生成的，而非源码默认值）
        assertThrows(JwtException.class, () -> b.extractUsername(tokenA));
    }
}
