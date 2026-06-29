package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.dto.response.UserProfileResp;
import com.partjava.entity.User;
import com.partjava.repository.UserMapper;
import com.partjava.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserMapper userMapper;

    @Autowired
    public UserProfileController(UserProfileService userProfileService, UserMapper userMapper) {
        this.userProfileService = userProfileService;
        this.userMapper = userMapper;
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
        
        userProfileService.updateUserProfile(user.getId(), data);
        
        // 组装前台需要的最新 user 对象回执
        data.setId(user.getId());
        data.setEmail(user.getEmail());

        return Map.of(
                "success", true,
                "message", "资料更新成功",
                "user", data
        );
    }
}
