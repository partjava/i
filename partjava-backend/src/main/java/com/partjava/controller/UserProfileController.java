package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.utils.JwtUtils;
import com.partjava.dto.response.UserProfileResp;
import com.partjava.entity.User;
import com.partjava.repository.UserMapper;
import com.partjava.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserMapper userMapper;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserProfileController(UserProfileService userProfileService, UserMapper userMapper, JwtUtils jwtUtils) {
        this.userProfileService = userProfileService;
        this.userMapper = userMapper;
        this.jwtUtils = jwtUtils;
    }

    // 辅助方法：获取当前安全上下文中已认证的用户实体
    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getUsername, username)
        );
        if (user == null) {
            throw new IllegalArgumentException("当前登录状态已失效，请重新登录");
        }
        return user;
    }

    // 1. 获取当前登录用户的个人中心资料档案
    @GetMapping("/profile")
    public UserProfileResp getUserProfile() {
        User user = getCurrentUser();
        return userProfileService.getUserProfile(user.getId());
    }

    // 2. 修改或创建个人中心资料档案
    @PutMapping("/profile")
    public Map<String, Object> updateUserProfile(@RequestBody UserProfileResp data) {
        User user = getCurrentUser();
        String oldUsername = user.getUsername();

        userProfileService.updateUserProfile(user.getId(), data);

        User updatedUser = userMapper.selectById(user.getId());
        String effectiveUsername = updatedUser != null ? updatedUser.getUsername() : user.getUsername();
        String effectiveRole = updatedUser != null ? updatedUser.getRole() : user.getRole();

        // 组装前台需要的最新 user 对象回执
        data.setId(user.getId());
        data.setEmail(user.getEmail());
        data.setUsername(effectiveUsername);

        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("message", "资料更新成功");
        resp.put("user", data);
        if (effectiveUsername != null && !effectiveUsername.equals(oldUsername) && jwtUtils != null) {
            resp.put("token", jwtUtils.generateToken(effectiveUsername, effectiveRole));
        }
        return resp;
    }
}
