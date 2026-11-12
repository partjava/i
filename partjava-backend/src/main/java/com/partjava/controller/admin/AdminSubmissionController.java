package com.partjava.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Challenge;
import com.partjava.entity.ChallengeSubmission;
import com.partjava.entity.User;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.ChallengeSubmissionMapper;
import com.partjava.repository.UserMapper;
import lombok.Data;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 管理后台：全站学员挑战提交记录查询与代码查看
 */
@RestController
@RequestMapping("/api/admin/submissions")
@PreAuthorize("hasAnyRole('ADMIN', 'OWNER')")
public class AdminSubmissionController {

    private final ChallengeSubmissionMapper submissionMapper;
    private final UserMapper userMapper;
    private final ChallengeMapper challengeMapper;

    public AdminSubmissionController(ChallengeSubmissionMapper submissionMapper,
                                   UserMapper userMapper,
                                   ChallengeMapper challengeMapper) {
        this.submissionMapper = submissionMapper;
        this.userMapper = userMapper;
        this.challengeMapper = challengeMapper;
    }

    @Data
    public static class SubmissionItemResp {
        private Integer id;
        private Integer userId;
        private String username;
        private Integer challengeId;
        private String challengeTitle;
        private Integer stageId;
        private String topicName;
        private String subtopicName;
        private String code;
        private String language;
        private String status;
        private Long executionTime;
        private String errorMessage;
        private LocalDateTime submittedAt;
    }

    @GetMapping
    public ApiResponse<Map<String, Object>> listSubmissions(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "20") int limit,
            @RequestParam(value = "challengeId", required = false) Integer challengeId,
            @RequestParam(value = "userId", required = false) Integer userId,
            @RequestParam(value = "status", required = false) String status
    ) {
        LambdaQueryWrapper<ChallengeSubmission> query = new LambdaQueryWrapper<>();
        if (challengeId != null) query.eq(ChallengeSubmission::getChallengeId, challengeId);
        if (userId != null) query.eq(ChallengeSubmission::getUserId, userId);
        if (status != null && !status.isBlank()) query.eq(ChallengeSubmission::getStatus, status);
        query.orderByDesc(ChallengeSubmission::getSubmittedAt);

        Page<ChallengeSubmission> pageParam = new Page<>(page, limit);
        Page<ChallengeSubmission> result = submissionMapper.selectPage(pageParam, query);

        List<ChallengeSubmission> records = result.getRecords();
        if (records.isEmpty()) {
            return ApiResponse.success(Map.of("total", 0L, "records", List.of()));
        }

        Set<Long> userIds = records.stream()
                .map(sub -> sub.getUserId() == null ? null : sub.getUserId().longValue())
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        Set<Integer> challengeIds = records.stream()
                .map(ChallengeSubmission::getChallengeId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Map<Long, User> userMap = userIds.isEmpty() ? Map.of() :
                userMapper.selectBatchIds(userIds).stream().collect(Collectors.toMap(User::getId, u -> u));
        Map<Integer, Challenge> challengeMap = challengeIds.isEmpty() ? Map.of() :
                challengeMapper.selectBatchIds(challengeIds).stream().collect(Collectors.toMap(Challenge::getId, c -> c));

        List<SubmissionItemResp> list = records.stream().map(sub -> {
            SubmissionItemResp resp = new SubmissionItemResp();
            resp.setId(sub.getId());
            resp.setUserId(sub.getUserId());
            User u = sub.getUserId() == null ? null : userMap.get(sub.getUserId().longValue());
            resp.setUsername(u != null ? u.getUsername() : "UID-" + sub.getUserId());

            resp.setChallengeId(sub.getChallengeId());
            Challenge c = challengeMap.get(sub.getChallengeId());
            if (c != null) {
                resp.setChallengeTitle(c.getTitle());
                resp.setStageId(c.getStageId());
                resp.setTopicName(c.getTopicName());
                resp.setSubtopicName(c.getSubtopicName());
            } else {
                resp.setChallengeTitle("关卡 #" + sub.getChallengeId());
            }

            resp.setCode(sub.getCode());
            resp.setLanguage(sub.getLanguage());
            resp.setStatus(sub.getStatus());
            resp.setExecutionTime(sub.getExecutionTime());
            resp.setErrorMessage(sub.getErrorMessage());
            resp.setSubmittedAt(sub.getSubmittedAt());
            return resp;
        }).collect(Collectors.toList());

        return ApiResponse.success(Map.of(
                "total", result.getTotal(),
                "records", list
        ));
    }
}
