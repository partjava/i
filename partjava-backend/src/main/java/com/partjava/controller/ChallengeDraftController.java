package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.entity.ChallengeDraft;
import com.partjava.service.ChallengeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenge-drafts")
public class ChallengeDraftController {

    private final ChallengeService challengeService;

    public ChallengeDraftController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        if (userId == null) {
            return 1;
        }
        return userId;
    }

    /**
     * 会员提交自创算法关卡出题申请
     */
    @PostMapping
    public ApiResponse<Void> createChallengeDraft(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestBody ChallengeDraft draft) {
        Integer activeUserId = getUserIdOrFallback(userId);
        challengeService.createDraft(activeUserId, draft);
        return ApiResponse.success("出题草稿提交成功，请耐心等待管理员审核");
    }

    /**
     * 会员查看个人自创题出题历史
     */
    @GetMapping("/mine")
    public ApiResponse<List<ChallengeDraft>> getMyDrafts(
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        List<ChallengeDraft> list = challengeService.getMyDrafts(activeUserId);
        return ApiResponse.success(list);
    }
}
