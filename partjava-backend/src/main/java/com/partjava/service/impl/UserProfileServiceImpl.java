package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partjava.dto.response.UserProfileResp;
import com.partjava.entity.User;
import com.partjava.entity.UserProfile;
import com.partjava.repository.UserMapper;
import com.partjava.repository.UserProfileMapper;
import com.partjava.service.UserProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserMapper userMapper;
    private final UserProfileMapper userProfileMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public UserProfileServiceImpl(UserMapper userMapper, UserProfileMapper userProfileMapper, ObjectMapper objectMapper) {
        this.userMapper = userMapper;
        this.userProfileMapper = userProfileMapper;
        this.objectMapper = objectMapper;
    }

    @Override
    public UserProfileResp getUserProfile(Long userId) {
        // 1. 获取 users 表中的基本核心账号信息
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new IllegalArgumentException("当前用户账号不存在");
        }

        // 2. 从 user_profiles 中尝试拉取扩展属性
        UserProfile userProfile = userProfileMapper.selectOne(
                new LambdaQueryWrapper<UserProfile>().eq(UserProfile::getUserId, userId)
        );

        // 3. 构建默认返回值对象
        UserProfileResp.UserProfileRespBuilder builder = UserProfileResp.builder()
                .id(userId)
                .email(user.getEmail())
                .role(user.getRole())
                .username(user.getUsername())
                .vip(user.getVip() != null && user.getVip() == 1)
                .vipLevel(user.getVipLevel() != null ? user.getVipLevel() : 0)
                .vipExpireTime(user.getVipExpireTime())
                .draftCount(user.getDraftCount() != null ? user.getDraftCount() : 0)
                .draftLimit(5);

        if (userProfile != null) {
            // 解析 JSON 技能栈数据
            List<String> skills = new ArrayList<>();
            try {
                if (userProfile.getSkills() != null && !userProfile.getSkills().trim().isEmpty()) {
                    skills = objectMapper.readValue(userProfile.getSkills(), new TypeReference<List<String>>() {});
                }
            } catch (Exception e) {
                log.warn("解析用户 {} 的 skills JSON 发生异常", userId, e);
            }

            // 解析 JSON 社交链接数据
            Map<String, String> socialLinks = new HashMap<>();
            try {
                if (userProfile.getSocialLinks() != null && !userProfile.getSocialLinks().trim().isEmpty()) {
                    socialLinks = objectMapper.readValue(userProfile.getSocialLinks(), new TypeReference<Map<String, String>>() {});
                }
            } catch (Exception e) {
                log.warn("解析用户 {} 的 social_links JSON 发生异常", userId, e);
            }

            // 组合并覆盖数据优先级：user_profiles 中的非空值覆盖 users 表值
            builder.name(userProfile.getName() != null && !userProfile.getName().isEmpty() ? userProfile.getName() : user.getNickname())
                    .image(userProfile.getAvatar() != null && !userProfile.getAvatar().isEmpty() ? userProfile.getAvatar() : user.getAvatar())
                    .jobTitle(userProfile.getJobTitle())
                    .company(userProfile.getCompany())
                    .bio(userProfile.getBio() != null && !userProfile.getBio().isEmpty() ? userProfile.getBio() : user.getBio())
                    .location(userProfile.getLocation() != null && !userProfile.getLocation().isEmpty() ? userProfile.getLocation() : user.getLocation())
                    .github(userProfile.getGithub() != null && !userProfile.getGithub().isEmpty() ? userProfile.getGithub() : user.getGithub())
                    .website(userProfile.getWebsite() != null && !userProfile.getWebsite().isEmpty() ? userProfile.getWebsite() : user.getWebsite())
                    .skills(skills)
                    .socialLinks(socialLinks);
        } else {
            // 如果不存在 user_profiles 表记录，用 users 表中的字段作为默认基准
            builder.name(user.getNickname())
                    .image(user.getAvatar())
                    .jobTitle("")
                    .company("")
                    .bio(user.getBio())
                    .location(user.getLocation())
                    .github(user.getGithub())
                    .website(user.getWebsite())
                    .skills(new ArrayList<>())
                    .socialLinks(new HashMap<>());
        }

        return builder.build();
    }

    @Override
    @Transactional
    public void updateUserProfile(Long userId, UserProfileResp data) {
        // 1. 加载主表 user
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new IllegalArgumentException("当前用户账号不存在");
        }

        // 2. 级联序列化 JSON
        String skillsJson = null;
        try {
            if (data.getSkills() != null) {
                skillsJson = objectMapper.writeValueAsString(data.getSkills());
            }
        } catch (Exception e) {
            log.error("序列化 skills JSON 失败", e);
        }

        String socialLinksJson = null;
        try {
            if (data.getSocialLinks() != null) {
                socialLinksJson = objectMapper.writeValueAsString(data.getSocialLinks());
            }
        } catch (Exception e) {
            log.error("序列化 socialLinks JSON 失败", e);
        }

        // 3. 检查 user_profiles 扩展资料是否存在
        UserProfile userProfile = userProfileMapper.selectOne(
                new LambdaQueryWrapper<UserProfile>().eq(UserProfile::getUserId, userId)
        );

        if (userProfile != null) {
            // 更新现有记录
            userProfile.setName(data.getName());
            userProfile.setJobTitle(data.getJobTitle());
            userProfile.setCompany(data.getCompany());
            userProfile.setBio(data.getBio());
            userProfile.setLocation(data.getLocation());
            userProfile.setGithub(data.getGithub());
            userProfile.setWebsite(data.getWebsite());
            userProfile.setSkills(skillsJson);
            userProfile.setSocialLinks(socialLinksJson);
            userProfile.setAvatar(data.getImage());
            userProfile.setUpdatedAt(LocalDateTime.now());
            userProfileMapper.updateById(userProfile);
        } else {
            // 创建全新记录
            userProfile = UserProfile.builder()
                    .userId(userId)
                    .name(data.getName())
                    .jobTitle(data.getJobTitle())
                    .company(data.getCompany())
                    .bio(data.getBio())
                    .location(data.getLocation())
                    .github(data.getGithub())
                    .website(data.getWebsite())
                    .skills(skillsJson)
                    .socialLinks(socialLinksJson)
                    .avatar(data.getImage())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            userProfileMapper.insert(userProfile);
        }

        // 4. 同时同步更新 users 主表数据以配合全局会话拉取
        if (data.getUsername() != null && !data.getUsername().trim().isEmpty()) {
            String newUsername = data.getUsername().trim();
            if (!newUsername.matches("^[a-zA-Z0-9]+$")) {
                throw new IllegalArgumentException("用户名只能是英文和数字的组合");
            }
            User existingUser = userMapper.selectOne(
                    new LambdaQueryWrapper<User>()
                            .eq(User::getUsername, newUsername)
                            .ne(User::getId, userId)
            );
            if (existingUser != null) {
                throw new IllegalArgumentException("该用户名已被其他账号占用");
            }
            user.setUsername(newUsername);
        }
        if (data.getName() != null && !data.getName().trim().isEmpty()) {
            user.setNickname(data.getName().trim());
        }
        user.setBio(data.getBio());
        user.setLocation(data.getLocation());
        user.setGithub(data.getGithub());
        user.setWebsite(data.getWebsite());
        user.setAvatar(data.getImage());
        user.setUpdatedAt(LocalDateTime.now());
        userMapper.updateById(user);
    }
}
