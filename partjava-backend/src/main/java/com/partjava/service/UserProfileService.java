package com.partjava.service;

import com.partjava.dto.response.UserProfileResp;

public interface UserProfileService {

    // 1. 根据用户ID获取对应的资料整合响应（支持双表合并与自动兜底）
    UserProfileResp getUserProfile(Long userId);

    // 2. 更新或新建用户资料（实现 user_profiles 和 users 双表级联更新）
    void updateUserProfile(Long userId, UserProfileResp data);
}
