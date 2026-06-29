package com.partjava.service;

import com.partjava.dto.request.LoginReq;
import com.partjava.dto.request.RegisterReq;
import com.partjava.dto.response.LoginResp;
import com.partjava.entity.User;

public interface UserService {
    // 1. 用户注册
    User register(RegisterReq req);

    // 2. 用户登录
    LoginResp login(LoginReq req);
}
