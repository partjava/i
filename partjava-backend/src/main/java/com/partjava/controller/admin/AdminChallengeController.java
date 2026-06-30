package com.partjava.controller.admin;

import com.partjava.common.api.ApiResponse;
import com.partjava.entity.ChallengeDraft;
import com.partjava.repository.ChallengeDraftMapper;
import com.partjava.service.ChallengeService;
import lombok.Data;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/challenge-drafts")
@PreAuthorize("hasAnyRole('ADMIN', 'OWNER')")
public class AdminChallengeController {

    private final ChallengeService challengeService;
    private final ChallengeDraftMapper draftMapper;

    public AdminChallengeController(ChallengeService challengeService, ChallengeDraftMapper draftMapper) {
        this.challengeService = challengeService;
        this.draftMapper = draftMapper;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        if (userId == null) {
            return 1; // 本地测试 fallback
        }
        return userId;
    }

    /**
     * 管理员获取所有待审核的出题草稿
     */
    @GetMapping
    public ApiResponse<List<ChallengeDraft>> getPendingDrafts() {
        List<ChallengeDraft> list = challengeService.getPendingDrafts();
        return ApiResponse.success(list);
    }

    /**
     * 管理员审核通过，并发布新关卡到题库
     */
    @PostMapping("/{id}/approve")
    public ApiResponse<Void> approveChallengeDraft(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Integer draftId,
            @RequestBody ApproveReq req) {
        Integer activeUserId = getUserIdOrFallback(userId);
        if (req.getChallengeId() == null || req.getChallengeId().trim().isEmpty()) {
            throw new IllegalArgumentException("必须指定关卡 slug (challengeId)");
        }
        challengeService.approveDraft(activeUserId, draftId, req.getChallengeId().trim(), req.getLevelIndex());
        return ApiResponse.success("审核通过，已成功发布该关卡到星系地图");
    }

    /**
     * 管理员审核驳回
     */
    @PostMapping("/{id}/reject")
    public ApiResponse<Void> rejectChallengeDraft(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Integer draftId,
            @RequestBody RejectReq req) {
        Integer activeUserId = getUserIdOrFallback(userId);
        if (req.getReviewComment() == null || req.getReviewComment().trim().isEmpty()) {
            throw new IllegalArgumentException("驳回时必须填写审核意见");
        }
        challengeService.rejectDraft(activeUserId, draftId, req.getReviewComment().trim());
        return ApiResponse.success("已成功驳回该出题申请");
    }

    @Data
    public static class ApproveReq {
        private String challengeId; // 关卡唯一ID/slug
        private Integer levelIndex; // 关卡在其小节下的序号
    }

    /**
     * 管理员物理删除草稿
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteDraft(@PathVariable("id") Integer draftId) {
        ChallengeDraft draft = draftMapper.selectById(draftId);
        if (draft == null) throw new IllegalArgumentException("草稿不存在");
        draftMapper.deleteById(draftId);
        return ApiResponse.success("草稿已删除");
    }

    @Data
    public static class RejectReq {
        private String reviewComment; // 驳回原因
    }

}
