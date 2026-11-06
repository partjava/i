package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.utils.JwtUtils;
import com.partjava.dto.request.LoginReq;
import com.partjava.dto.request.RegisterReq;
import com.partjava.dto.response.LoginResp;
import com.partjava.entity.User;
import com.partjava.entity.UserProfile;
import com.partjava.repository.UserMapper;
import com.partjava.repository.UserProfileMapper;
import com.partjava.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserProfileMapper userProfileMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserServiceImpl(UserMapper userMapper, UserProfileMapper userProfileMapper, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userMapper = userMapper;
        this.userProfileMapper = userProfileMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    @Transactional
    public User register(RegisterReq req) {
        // 1. 字段校验
        if (req.getUsername() == null || req.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("登录用户名不能为空");
        }
        String cleanUsername = req.getUsername().trim();
        // 用户名格式校验：5~16 位字母、数字或下划线
        if (!cleanUsername.matches("^[a-zA-Z0-9_]{5,16}$")) {
            throw new IllegalArgumentException("登录账号需为 5~16 位字母、数字或下划线");
        }
        String cleanNickname = (req.getNickname() != null && !req.getNickname().trim().isEmpty())
                ? req.getNickname().trim()
                : cleanUsername;
        if (req.getEmail() == null || req.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("邮箱地址不能为空");
        }
        String cleanEmail = req.getEmail().trim();
        if (!cleanEmail.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("请输入有效的邮箱地址");
        }
        if (req.getPassword() == null || !req.getPassword().matches("^(?=.*[A-Za-z])(?=.*\\d)[^\\s]{8,20}$")) {
            throw new IllegalArgumentException("密码需为 8~20 位，且同时包含字母和数字");
        }

        // 2. 查重用户名
        User existingUser = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getUsername, cleanUsername)
        );
        if (existingUser != null) {
            throw new IllegalArgumentException("该用户名已被注册");
        }

        // 3. 查重邮箱
        existingUser = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getEmail, cleanEmail)
        );
        if (existingUser != null) {
            throw new IllegalArgumentException("该邮箱已被注册");
        }

        // 4. 构建并保存新用户 (BCrypt加密密码)
        LocalDateTime now = LocalDateTime.now();
        User newUser = User.builder()
                .username(cleanUsername)
                .nickname(cleanNickname)
                .email(cleanEmail)
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .role("USER")      // 默认角色
                .status("ACTIVE")  // 默认正常激活状态
                .vip(0)
                .vipLevel(0)
                .draftCount(0)
                .createdAt(now)
                .updatedAt(now)
                .build();

        userMapper.insert(newUser);

        // 5. 同步初始化 user_profiles 扩展档案表记录，确保新建系统用户在个人中心与全站正常关联
        if (userProfileMapper != null && newUser.getId() != null) {
            UserProfile profile = UserProfile.builder()
                    .userId(newUser.getId())
                    .name(cleanNickname)
                    .bio("")
                    .location("")
                    .github("")
                    .website("")
                    .skills("[]")
                    .socialLinks("{}")
                    .createdAt(now)
                    .updatedAt(now)
                    .build();
            userProfileMapper.insert(profile);
        }

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
                .name(user.getNickname() != null && !user.getNickname().isBlank() ? user.getNickname() : user.getUsername())
                .email(user.getEmail())
                .role(user.getRole() != null ? user.getRole() : "USER")
                .avatar(user.getAvatar())
                .vip(user.getVip() != null && user.getVip() == 1)
                .vipLevel(user.getVipLevel() != null ? user.getVipLevel() : 0)
                .vipExpireTime(user.getVipExpireTime())
                .build();
    }
}
