package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.dto.response.LearningStatsResp;
import com.partjava.entity.User;
import com.partjava.repository.UserMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserMapper userMapper;
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    @Autowired
    public UserController(UserMapper userMapper, JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder, ObjectMapper objectMapper) {
        this.userMapper = userMapper;
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
    }

    // 辅助方法：获取当前登录用户
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

    // 1. 获取学员的 365 天学习打卡与笔记日历热力图数据
    @GetMapping("/learning-stats")
    public ApiResponse<LearningStatsResp> getLearningStats() {
        User user = getCurrentUser();
        Long userId = user.getId();
        Map<String, Integer> mergedMap = new HashMap<>();

        // 统计近 365 天该学员创建的笔记计数并按天分组
        String notesSql = "SELECT DATE(created_at) as date, COUNT(*) as count FROM notes " +
                "WHERE author_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 365 DAY) " +
                "GROUP BY DATE(created_at)";
        
        jdbcTemplate.query(notesSql, rs -> {
            Date dateVal = rs.getDate("date");
            if (dateVal != null) {
                mergedMap.put(dateVal.toString(), rs.getInt("count"));
            }
        }, userId);

        // 统计近 365 天该学员的打卡计时学习片段并按天分组
        String sessionsSql = "SELECT DATE(created_at) as date, COUNT(*) as count FROM study_sessions " +
                "WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 365 DAY) " +
                "GROUP BY DATE(created_at)";

        jdbcTemplate.query(sessionsSql, rs -> {
            Date dateVal = rs.getDate("date");
            if (dateVal != null) {
                String dateStr = dateVal.toString();
                int currentCount = mergedMap.getOrDefault(dateStr, 0);
                mergedMap.put(dateStr, currentCount + rs.getInt("count"));
            }
        }, userId);

        // 将合并后的每日打卡活动总数映射为前台日历所需要的 0 ~ 4 着色等级
        List<LearningStatsResp.HeatmapData> heatmapDataList = new ArrayList<>();
        mergedMap.forEach((dateStr, count) -> {
            int level = 0;
            if (count >= 10) {
                level = 4;
            } else if (count >= 6) {
                level = 3;
            } else if (count >= 3) {
                level = 2;
            } else if (count >= 1) {
                level = 1;
            }
            heatmapDataList.add(new LearningStatsResp.HeatmapData(dateStr, count, level));
        });

        LearningStatsResp resp = LearningStatsResp.builder()
                .heatmapData(heatmapDataList)
                .build();

        return ApiResponse.success(resp);
    }

    // 3. 修改用户密码端点
    @PostMapping("/change-password")
    public ApiResponse<Map<String, Object>> changePassword(@RequestBody ChangePasswordReq req) {
        User user = getCurrentUser();

        // 为兼顾前台 Ant Design Form 传值与标准后端接口，同时提取 oldPassword 和 currentPassword
        String currentPlainPassword = req.getOldPassword() != null ? req.getOldPassword() : req.getCurrentPassword();
        String newPlainPassword = req.getNewPassword();

        if (currentPlainPassword == null || newPlainPassword == null || currentPlainPassword.isEmpty() || newPlainPassword.isEmpty()) {
            return ApiResponse.error("当前密码和新密码不能为空");
        }

        if (newPlainPassword.length() < 6) {
            return ApiResponse.error("新密码长度至少为 6 位");
        }

        // 验证当前密码是否正确
        if (!passwordEncoder.matches(currentPlainPassword, user.getPasswordHash())) {
            return ApiResponse.error("当前密码验证失败，请输入正确密码");
        }

        // 使用 BCrypt 加密新密码并更新落库
        user.setPasswordHash(passwordEncoder.encode(newPlainPassword));
        userMapper.updateById(user);

        return ApiResponse.success(Map.of("success", true, "message", "密码修改成功"));
    }

    // 3. 一键打包并导出用户学习数据 JSON
    @GetMapping("/export-data")
    public ResponseEntity<byte[]> exportData() {
        try {
            User user = getCurrentUser();
            Long userId = user.getId();

            // 分步从各个表中抓取全部学员数据
            Map<String, Object> exportMap = new HashMap<>();
            exportMap.put("exportDate", Instant.now().toString());

            // (1) 学员基本信息
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", user.getId());
            userInfo.put("name", user.getUsername());
            userInfo.put("email", user.getEmail());
            userInfo.put("created_at", user.getCreatedAt() != null ? user.getCreatedAt().toString() : "");
            exportMap.put("user", userInfo);

            // (2) 扩展属性档案
            Map<String, Object> userProfile = jdbcTemplate.queryForList("SELECT * FROM user_profiles WHERE user_id = ?", userId)
                    .stream().findFirst().orElse(new HashMap<>());
            exportMap.put("profile", userProfile);

            // (3) 随堂笔记列表
            List<Map<String, Object>> notes = jdbcTemplate.queryForList(
                    "SELECT id, title, content, category, technology, is_public, created_at, updated_at FROM notes WHERE author_id = ?",
                    userId
            );
            exportMap.put("notes", notes);

            // (4) 学习习惯日历
            List<Map<String, Object>> learningStats = jdbcTemplate.queryForList(
                    "SELECT * FROM learning_stats WHERE user_id = ?",
                    userId
            );
            exportMap.put("learningStats", learningStats);

            // (5) 打卡记录
            List<Map<String, Object>> studySessions = jdbcTemplate.queryForList(
                    "SELECT * FROM study_sessions WHERE user_id = ? ORDER BY session_date DESC LIMIT 100",
                    userId
            );
            exportMap.put("studySessions", studySessions);

            // (6) 数据统计汇总
            Map<String, Object> summary = new HashMap<>();
            summary.put("totalNotes", notes.size());
            summary.put("publicNotes", notes.stream().filter(n -> Boolean.TRUE.equals(n.get("is_public")) || Integer.valueOf(1).equals(n.get("is_public"))).count());
            summary.put("privateNotes", notes.stream().filter(n -> Boolean.FALSE.equals(n.get("is_public")) || Integer.valueOf(0).equals(n.get("is_public"))).count());
            summary.put("totalStudySessions", studySessions.size());
            exportMap.put("summary", summary);

            // 格式化输出为规范的 JSON 排版
            byte[] jsonBytes = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(exportMap);

            String filename = "partjava-data-" + Instant.now().toString().substring(0, 10) + ".json";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(jsonBytes);

        } catch (Exception e) {
            log.error("导出学员数据时发生异常", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    // 4. VIP 激活接口
    @PostMapping("/activate-vip")
    public ApiResponse<Map<String, Object>> activateVip(@RequestBody ActivateVipReq req) {
        if (req.getLevel() == null || req.getLevel() < 1 || req.getLevel() > 3) {
            return ApiResponse.error("无效的 VIP 会员等级套餐");
        }

        User user = getCurrentUser();
        
        // 1. 等级只升不降
        int currentLevel = user.getVipLevel() != null ? user.getVipLevel() : 0;
        int newLevel = Math.max(currentLevel, req.getLevel());

        // 2. 计算到期时间 (体验和进阶为 3个月/90天, 永久共创为永久 9999年)
        java.time.LocalDateTime expire;
        if (req.getLevel() == 3) {
            expire = java.time.LocalDateTime.of(9999, 12, 31, 23, 59, 59);
        } else {
            java.time.LocalDateTime base = (user.getVipExpireTime() != null && user.getVipExpireTime().isAfter(java.time.LocalDateTime.now()))
                    ? user.getVipExpireTime()
                    : java.time.LocalDateTime.now();
            expire = base.plusDays(90);
        }

        // 3. 更新字段并写入
        user.setVip(1);
        user.setVipLevel(newLevel);
        user.setVipExpireTime(expire);
        userMapper.updateById(user);

        return ApiResponse.success(Map.of(
                "success", true,
                "message", "恭喜您成功激活 " + (newLevel == 1 ? "体验 VIP" : (newLevel == 2 ? "进阶 VIP" : "永久共创 VIP")) + " 特权！",
                "vip", true,
                "vipLevel", newLevel,
                "vipExpireTime", expire
        ));
    }

    @Data
    public static class ActivateVipReq {
        private Integer level; // 1=体验VIP, 2=进阶VIP, 3=永久共创
    }

    @Data
    public static class ChangePasswordReq {
        private String oldPassword;
        private String currentPassword;
        private String newPassword;
    }
}
