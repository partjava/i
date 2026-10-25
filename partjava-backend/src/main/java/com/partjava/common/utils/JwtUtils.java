package com.partjava.common.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtils {

    private static final Logger log = LoggerFactory.getLogger(JwtUtils.class);

    // 密钥只允许通过 JWT_SECRET 环境变量注入（生产配置见 partjavadata/secrets/ecosystem.config.js）
    @Value("${jwt.secret:}")
    private String jwtSecret;

    // 默认过期时间为 24 小时（毫秒数）
    @Value("${jwt.expiration:86400000}")
    private long jwtExpiration;

    private String resolvedSecret;

    /**
     * 启动时解析签名密钥：未配置 JWT_SECRET 时生成一次性随机密钥（仅适合本地开发，
     * 重启后所有已签发 Token 失效），并在日志中显式告警，避免弱密钥被静默使用。
     */
    @PostConstruct
    void resolveSecret() {
        if (jwtSecret != null && !jwtSecret.isBlank()) {
            resolvedSecret = jwtSecret.trim();
        } else {
            byte[] random = new byte[48];
            new SecureRandom().nextBytes(random);
            resolvedSecret = Base64.getEncoder().encodeToString(random);
            log.warn("未配置 JWT_SECRET 环境变量，已生成一次性随机签名密钥（重启后登录态将全部失效，生产环境必须显式配置）");
        }
    }

    private SecretKey getSigningKey() {
        if (resolvedSecret == null) {
            resolveSecret();
        }
        return Keys.hmacShaKeyFor(resolvedSecret.getBytes(StandardCharsets.UTF_8));
    }

    // 1. 根据用户名与角色签发 JWT Token
    public String generateToken(String username, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .subject(username)
                .claim("role", role) // 存入自定义的权限角色
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    // 2. 从 Token 中提取用户名 (Subject)
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 3. 从 Token 中提取自定义的角色声明
    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }

    // 4. 验证 Token 是否合法且未过期（过期返回 false 而非抛异常，供过滤器干净地拒绝）
    public boolean validateToken(String token, String username) {
        try {
            final String extractedUsername = extractUsername(token);
            return extractedUsername.equals(username) && !isTokenExpired(token);
        } catch (ExpiredJwtException e) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            Date expiration = extractClaim(token, Claims::getExpiration);
            return expiration.before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
