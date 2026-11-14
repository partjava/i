package com.partjava.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.User;
import com.partjava.repository.UserMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserMapper userMapper;

    @Autowired
    public AdminUserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    /**
     * 分页查询全平台注册学员列表 (支持用户名、邮箱或昵称的模糊检索)
     */
    @GetMapping
    public ApiResponse<Page<User>> getUsersList(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "limit", defaultValue = "20") Integer limit,
            @RequestParam(value = "search", required = false) String search) {
        
        Page<User> userPage = new Page<>(page, limit);
        LambdaQueryWrapper<User> query = new LambdaQueryWrapper<User>()
                .orderByDesc(User::getCreatedAt);

        if (search != null && !search.trim().isEmpty()) {
            String cleanSearch = search.trim();
            query.and(q -> q.like(User::getUsername, cleanSearch)
                    .or().like(User::getEmail, cleanSearch)
                    .or().like(User::getNickname, cleanSearch));
        }

        userMapper.selectPage(userPage, query);
        return ApiResponse.success(userPage);
    }

    /**
     * 变更指定用户的身份角色角色 (如提权 ADMIN) 或锁定封禁状态 (BANNED)
     */
    @PutMapping("/{id}/role")
    public ApiResponse<Void> updateUserRoleAndStatus(
            @PathVariable("id") Integer userId,
            @RequestBody UpdateUserRoleReq req) {
        
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new IllegalArgumentException("对应的学员账号不存在");
        }

        if ("OWNER".equalsIgnoreCase(user.getRole())) {
            boolean downgradingRole = req.getRole() != null && !req.getRole().trim().isEmpty()
                    && !"OWNER".equalsIgnoreCase(req.getRole().trim());
            boolean banningOwner = req.getStatus() != null
                    && "BANNED".equalsIgnoreCase(req.getStatus().trim());
            if (downgradingRole || banningOwner) {
                throw new IllegalArgumentException("站长(OWNER)账号受系统保护，不可降权或封禁");
            }
        }

        boolean updated = false;

        if (req.getRole() != null && !req.getRole().trim().isEmpty()) {
            String role = req.getRole().trim().toUpperCase();
            if ("USER".equals(role) || "ADMIN".equals(role)
                    || ("OWNER".equals(role) && "OWNER".equalsIgnoreCase(user.getRole()))) {
                user.setRole(role);
                updated = true;
            } else {
                throw new IllegalArgumentException("非法的身份角色值");
            }
        }

        if (req.getStatus() != null && !req.getStatus().trim().isEmpty()) {
            String status = req.getStatus().trim().toUpperCase();
            if ("ACTIVE".equals(status) || "BANNED".equals(status)) {
                user.setStatus(status);
                updated = true;
            } else {
                throw new IllegalArgumentException("非法的账号状态值");
            }
        }

        if (req.getVipLevel() != null) {
            int level = req.getVipLevel();
            if (level < 0 || level > 3) {
                throw new IllegalArgumentException("非法的 VIP 等级值 (仅支持 0-3)");
            }
            user.setVipLevel(level);
            if (level == 0) {
                user.setVip(0);
                user.setVipExpireTime(null);
            } else {
                user.setVip(1);
                user.setVipExpireTime(level == 3 ? null : java.time.LocalDateTime.now().plusDays(90));
            }
            updated = true;
        }

        if (updated) {
            userMapper.updateById(user);
            log.info("管理员更新了学员 {} 的身份状态为: role={}, status={}, vipLevel={}",
                    userId, user.getRole(), user.getStatus(), user.getVipLevel());
        }

        return ApiResponse.success(null);
    }

    @Data
    public static class UpdateUserRoleReq {
        private String role;
        private String status;
        private Integer vipLevel;
    }
}
