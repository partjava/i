package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.User;
import com.partjava.repository.UserMapper;
import com.partjava.service.MailService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/forgot-password")
public class ForgotPasswordController {

    private final UserMapper userMapper;
    private final MailService mailService;
    private final StringRedisTemplate redisTemplate;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ForgotPasswordController(UserMapper userMapper,
                                    MailService mailService,
                                    StringRedisTemplate redisTemplate,
                                    PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.mailService = mailService;
        this.redisTemplate = redisTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * 学员申请忘记密码找回
     */
    @PostMapping
    public ApiResponse<Void> requestForgotPassword(@RequestBody RequestEmailReq req) {
        if (req.getEmail() == null || req.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("请输入注册邮箱");
        }

        String email = req.getEmail().trim();
        log.info("用户请求找回密码，邮箱：{}", email);

        // 1. 查找用户
        User user = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getEmail, email));
        if (user == null) {
            log.warn("用户找回密码失败：邮箱 {} 尚未注册", email);
            // 模糊化处理，对外依然返回成功，防账号爆破
            return ApiResponse.success("重置邮件已发出，请注意查收");
        }

        // 2. 生成一次性重置 Token 写入 Redis 缓存 (过期时间 15分钟)
        String token = UUID.randomUUID().toString();
        String redisKey = "reset:token:" + email;
        redisTemplate.opsForValue().set(redisKey, token, Duration.ofMinutes(15));

        // 3. 组装前端路由重置链接，默认本地前端为 3000 端口
        String resetUrl = "http://localhost:3000/auth/reset-password?token=" + token + "&email=" + email;

        // 4. 发送找回密码重置邮件
        mailService.sendResetPasswordMail(email, resetUrl);

        return ApiResponse.success("重置邮件已发出，请注意查收");
    }

    /**
     * 校验 Token 并执行密码重置
     */
    @PostMapping("/reset")
    public ApiResponse<Void> resetPassword(@RequestBody ResetPasswordReq req) {
        if (req.getEmail() == null || req.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("邮箱地址不能为空");
        }
        if (req.getToken() == null || req.getToken().trim().isEmpty()) {
            throw new IllegalArgumentException("重置凭证 token 不能为空");
        }
        if (req.getNewPassword() == null || req.getNewPassword().length() < 6) {
            throw new IllegalArgumentException("新密码长度不能低于6位");
        }

        String email = req.getEmail().trim();
        String token = req.getToken().trim();
        String redisKey = "reset:token:" + email;

        // 1. 检验凭证有效性
        String cachedToken = redisTemplate.opsForValue().get(redisKey);
        if (cachedToken == null || !cachedToken.equals(token)) {
            throw new IllegalArgumentException("重置密码链接已失效或无效，请重新发起申请");
        }

        // 2. 执行密码更新
        User user = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getEmail, email));
        if (user == null) {
            throw new IllegalArgumentException("当前邮箱对应的学员账号已被注销");
        }

        user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        userMapper.updateById(user);

        // 3. 清理 Redis
        redisTemplate.delete(redisKey);
        log.info("用户 {} 密码找回重置成功", email);

        return ApiResponse.success("您的密码已成功重置，请用新密码重新登录");
    }



    /**
     * 验证密码重置 token，兼容旧 Next.js GET /api/forgot-password。
     */
    @GetMapping
    public ApiResponse<ResetTokenStatusResp> validateResetToken(
            @RequestParam("token") String token,
            @RequestParam(value = "email", required = false) String email) {
        if (token == null || token.trim().isEmpty()) {
            throw new IllegalArgumentException("缺少重置凭证 token");
        }

        boolean valid = true;
        if (email != null && !email.trim().isEmpty()) {
            String redisKey = "reset:token:" + email.trim();
            String cachedToken = redisTemplate.opsForValue().get(redisKey);
            valid = token.trim().equals(cachedToken);
        }

        if (!valid) {
            throw new IllegalArgumentException("无效或已过期的重置令牌");
        }
        return ApiResponse.success(new ResetTokenStatusResp(true));
    }

    @Data
    public static class RequestEmailReq {
        private String email;
    }

    @Data
    public static class ResetPasswordReq {
        private String email;
        private String token;
        private String newPassword;
    }

    @Data
    public static class ResetTokenStatusResp {
        private final boolean valid;
    }

}
