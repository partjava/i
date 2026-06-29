package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.dto.request.LoginReq;
import com.partjava.dto.request.RegisterReq;
import com.partjava.dto.response.LoginResp;
import com.partjava.entity.User;
import com.partjava.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // 1. 用户注册
    @PostMapping("/register")
    public ApiResponse<User> register(@RequestBody RegisterReq req) {
        User registeredUser = userService.register(req);
        // 为了安全起见，擦除哈希密码后再返回
        registeredUser.setPasswordHash(null);
        return ApiResponse.success(registeredUser);
    }

    // 2. 用户登录
    @PostMapping("/login")
    public ApiResponse<LoginResp> login(@RequestBody LoginReq req) {
        LoginResp loginResp = userService.login(req);
        return ApiResponse.success(loginResp);
    }
}
