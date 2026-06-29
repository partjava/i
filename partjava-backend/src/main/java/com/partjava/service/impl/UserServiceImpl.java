package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.utils.JwtUtils;
import com.partjava.dto.request.LoginReq;
import com.partjava.dto.request.RegisterReq;
import com.partjava.dto.response.LoginResp;
import com.partjava.entity.User;
import com.partjava.repository.UserMapper;
import com.partjava.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserServiceImpl(UserMapper userMapper, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public User register(RegisterReq req) {
        // 1. 字段校验
        if (req.getUsername() == null || req.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("用户名不能为空");
        }
        // 用户名格式校验：只能是英文和数字组合
        if (!req.getUsername().trim().matches("^[a-zA-Z0-9]+$")) {
            throw new IllegalArgumentException("用户名只能是英文和数字的组合");
        }
        if (req.getNickname() == null || req.getNickname().trim().isEmpty()) {
            throw new IllegalArgumentException("用户昵称不能为空");
        }
        if (req.getEmail() == null || req.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("邮箱地址不能为空");
        }
        if (req.getPassword() == null || req.getPassword().length() < 6) {
            throw new IllegalArgumentException("密码长度不能低于6位");
        }

        // 2. 查重用户名
        User existingUser = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getUsername, req.getUsername().trim())
        );
        if (existingUser != null) {
            throw new IllegalArgumentException("该用户名已被注册");
        }

        // 3. 查重邮箱
        existingUser = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getEmail, req.getEmail().trim())
        );
        if (existingUser != null) {
            throw new IllegalArgumentException("该邮箱已被注册");
        }

        // 4. 构建并保存新用户 (BCrypt加密密码)
        User newUser = User.builder()
                .username(req.getUsername().trim())
                .nickname(req.getNickname().trim())
                .email(req.getEmail().trim())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .role("USER")      // 默认角色
                .status("ACTIVE")  // 默认正常激活状态
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userMapper.insert(newUser);
        return newUser;
    }

    @Override
    public LoginResp login(LoginReq req) {
        if (req.getUsernameOrEmail() == null || req.getUsernameOrEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("用户名或邮箱不能为空");
        }
        if (req.getPassword() == null || req.getPassword().isEmpty()) {
            throw new IllegalArgumentException("密码不能为空");
        }

        String input = req.getUsernameOrEmail().trim();

        // 1. 支持以用户名或邮箱地址进行登录
        User user = userMapper.selectOne(
                new LambdaQueryWrapper<User>()
                        .eq(User::getUsername, input)
                        .or()
                        .eq(User::getEmail, input)
        );

        if (user == null) {
            throw new IllegalArgumentException("用户名或密码错误");
        }

        // 2. 检查账户封禁状态
        if ("BANNED".equalsIgnoreCase(user.getStatus())) {
            throw new IllegalArgumentException("您的账户已被管理员封禁，无法登录");
        }

        // 3. 密码匹配度校验
        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("用户名或密码错误");
        }

        // 4. 签发 JWT
        String token = jwtUtils.generateToken(user.getUsername(), user.getRole());

        return LoginResp.builder()
                .token(token)
                .expiresIn(86400000L) // 过期秒/毫秒：根据配置同步，默认为 1 天
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
