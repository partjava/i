package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.entity.StudyProgress;
import com.partjava.service.StudyService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/study")
public class StudyController {

    private final StudyService studyService;

    public StudyController(StudyService studyService) {
        this.studyService = studyService;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        if (userId == null) {
            return 1; // 默认测试账号 ID = 1
        }
        return userId;
    }

    /**
     * 学员同步并打卡计时今日学习总时长
     */
    @PostMapping("/sync-time")
    public ApiResponse<Void> syncTime(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestBody SyncTimeReq req) {
        if (req.getTime() == null || req.getTime() <= 0) {
            throw new IllegalArgumentException("打卡学习时长必须大于 0 秒");
        }
        Integer activeUserId = getUserIdOrFallback(userId);
        studyService.syncStudyTime(
                activeUserId,
                req.getTime(),
                req.getCategory(),
                req.getTechnology(),
                req.getActivity()
        );
        return ApiResponse.success(null);
    }

    /**
     * 上报并修改静态页面阅读完成状态
     */
    @PostMapping("/progress")
    public ApiResponse<Void> updateProgress(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestBody UpdateProgressReq req) {
        if (req.getPagePath() == null || req.getPagePath().trim().isEmpty()) {
            throw new IllegalArgumentException("阅读页面 pagePath 不能为空");
        }
        Integer activeUserId = getUserIdOrFallback(userId);
        studyService.updatePageProgress(activeUserId, req.getPagePath(), req.isCompleted());
        return ApiResponse.success(null);
    }

    /**
     * 获取当前登录学员已保存的所有页面阅读进度列表
     */
    @GetMapping("/progress")
    public ApiResponse<List<StudyProgress>> getProgressList(
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        List<StudyProgress> list = studyService.getPageProgressList(activeUserId);
        return ApiResponse.success(list);
    }

    @Data
    public static class SyncTimeReq {
        private Integer time; // 计时打卡时长 (秒)
        private String category;
        private String technology;
        private String activity;
    }

    @Data
    public static class UpdateProgressReq {
        private String pagePath;
        private boolean completed;
    }
}
