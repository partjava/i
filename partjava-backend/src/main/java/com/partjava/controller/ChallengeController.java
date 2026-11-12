package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.dto.JudgementResult;
import com.partjava.dto.request.ChallengeSubmitReq;
import com.partjava.dto.request.ThinkingEvaluateReq;
import com.partjava.dto.response.ChallengeDetailResp;
import com.partjava.dto.response.ChallengeProgressResp;
import com.partjava.dto.response.ThinkingEvaluateResp;
import com.partjava.entity.Challenge;
import com.partjava.entity.ChallengeDraft;
import com.partjava.entity.UserChallengeRecord;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.UserChallengeRecordMapper;
import com.partjava.service.ChallengeService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChallengeController {

    private final ChallengeService challengeService;
    private final ChallengeMapper challengeMapper;
    private final UserChallengeRecordMapper userChallengeRecordMapper;

    public ChallengeController(ChallengeService challengeService, ChallengeMapper challengeMapper, UserChallengeRecordMapper userChallengeRecordMapper) {
        this.challengeService = challengeService;
        this.challengeMapper = challengeMapper;
        this.userChallengeRecordMapper = userChallengeRecordMapper;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        if (userId == null) {
            return 1; // 本地测试免登录降级，默认使用测试账号用户 1
        }
        return userId;
    }

    /**
     * A. 获取用户当前全局宇宙进度 (GET /challenges/progress)
     */
    @GetMapping("/challenges/progress")
    public ApiResponse<ChallengeProgressResp> getGlobalProgress(
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        ChallengeProgressResp progress = challengeService.getGlobalProgress(userId);
        return ApiResponse.success(progress);
    }

    /**
     * Legacy frontend challenge list endpoint (GET /api/challenges).
     */
    @GetMapping("/challenges")
    public ApiResponse<List<Challenge>> listChallenges() {
        List<Challenge> challenges = challengeMapper.selectList(
                new LambdaQueryWrapper<Challenge>()
                        .eq(Challenge::getStatus, "published")
                        .orderByAsc(Challenge::getStageId)
                        .orderByAsc(Challenge::getLevelIndex)
        );
        return ApiResponse.success(challenges);
    }

    /**
     * 排行榜：按通关数 + 积分排名
     */
    @GetMapping("/challenges/leaderboard")
    public ApiResponse<List<Map<String, Object>>> getLeaderboard(
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        // 统计每个用户的通关数
        List<Map<String, Object>> raw = challengeMapper.getLeaderboard();
        List<Map<String, Object>> result = new ArrayList<>();
        int rank = 1;
        for (Map<String, Object> row : raw) {
            Map<String, Object> entry = new LinkedHashMap<>();
            Integer uid = (Integer) row.get("user_id");
            entry.put("rank", rank++);
            entry.put("userId", uid);
            entry.put("username", row.get("username"));
            entry.put("completed", row.get("completed"));
            entry.put("points", row.get("points"));
            entry.put("isMe", uid != null && uid.equals(userId));
            result.add(entry);
        }
        return ApiResponse.success(result);
    }

    /**
     * B. 获取单关卡面板详情 (GET /challenges/{id})
     */
    @GetMapping("/challenges/{id}")
    public ApiResponse<ChallengeDetailResp> getChallengeDetail(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Integer challengeId) {
        ChallengeDetailResp detail = challengeService.getChallengeDetail(userId, challengeId);
        return ApiResponse.success(detail);
    }

    /**
     * C. 提交代码至沙箱自动化评测 (POST /challenges/{id}/submit)
     */
    @PostMapping("/challenges/{id}/submit")
    public ApiResponse<JudgementResult> submitChallengeCode(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Integer challengeId,
            @RequestBody ChallengeSubmitReq req) {
        JudgementResult result = challengeService.submitCode(userId, challengeId, req.getCode());
        return ApiResponse.success(result);
    }

    /** 快速运行公开样例，不会更新通关记录。 */
    @PostMapping("/challenges/{id}/run")
    public ApiResponse<JudgementResult> runChallengeSamples(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Integer challengeId,
            @RequestBody ChallengeSubmitReq req) {
        return ApiResponse.success(challengeService.runSampleCode(userId, challengeId, req.getCode()));
    }

    /**
     * D. 提交主观思考题触发 AI 智能打分 (POST /challenges/{id}/thinking/evaluate)
     */
    @PostMapping("/challenges/{id}/thinking/evaluate")
    public ApiResponse<ThinkingEvaluateResp> evaluateThinking(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Integer challengeId,
            @RequestBody ThinkingEvaluateReq req) {
        Integer activeUserId = getUserIdOrFallback(userId);
        ThinkingEvaluateResp response = challengeService.evaluateThinkingQuestion(activeUserId, challengeId, req.getAnswer());
        return ApiResponse.success(response);
    }

    /**
     * E. 提交选择题答案 (POST /challenges/{id}/quiz)
     */
    @PostMapping("/challenges/{id}/quiz")
    public ApiResponse<Map<String, Object>> submitQuizzes(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Integer challengeId,
            @RequestBody Map<String, Integer> answers) {
        Integer activeUserId = getUserIdOrFallback(userId);
        boolean passed = challengeService.submitQuizzes(activeUserId, challengeId, answers);
        return ApiResponse.success(Map.of("passed", passed));
    }

    /**
     * F. 获取通关关卡的标准答案代码 (GET /challenges/{id}/solution)
     */
    @GetMapping("/challenges/{id}/solution")
    public ApiResponse<Map<String, String>> getSolution(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Integer challengeId) {
        String solutionCode = challengeService.getSolution(userId, challengeId);
        return ApiResponse.success(Map.of("solutionCode", solutionCode));
    }

    // ─── 以下为兼容老前端 star-challenges 系列 API 的代理路由接口（直接返回平铺 Map，不包裹 ApiResponse） ───

    /**
     * 老前端 GET /star-challenges/{subtopicName}
     */
    /**
     * Legacy frontend star challenge overview (GET /api/star-challenges).
     */
    @GetMapping("/star-challenges")
    public Map<String, Object> listStarChallenges(
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        List<Challenge> challenges = challengeMapper.selectList(
                new LambdaQueryWrapper<Challenge>()
                        .eq(Challenge::getStatus, "published")
                        .orderByAsc(Challenge::getStageId)
                        .orderByAsc(Challenge::getLevelIndex)
        );
        Map<Integer, UserChallengeRecord> recordMap = new HashMap<>();
        if (userId != null) {
            List<UserChallengeRecord> records = userChallengeRecordMapper.selectList(
                    new LambdaQueryWrapper<UserChallengeRecord>().eq(UserChallengeRecord::getUserId, userId)
            );
            for (UserChallengeRecord r : records) {
                recordMap.put(r.getChallengeId(), r);
            }
        }

        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Challenge c : challenges) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", c.getId());
            map.put("title", c.getTitle());
            map.put("levelTitle", c.getTitle());
            map.put("stageId", c.getStageId());
            map.put("topicName", c.getTopicName());
            map.put("subtopicName", c.getSubtopicName());
            map.put("levelIndex", c.getLevelIndex());
            map.put("accessLevel", c.getAccessLevel());
            map.put("status", c.getStatus());
            map.put("points", c.getPoints());
            map.put("difficulty", c.getDifficulty());
            map.put("slug", c.getSlug());
            map.put("authorId", c.getAuthorId());
            map.put("isPublic", c.getIsPublic());

            UserChallengeRecord rec = recordMap.get(c.getId());
            boolean isPassed = rec != null && Boolean.TRUE.equals(rec.getCompleted());
            map.put("completed", isPassed);

            Map<String, Object> userRecord = new LinkedHashMap<>();
            userRecord.put("isPassed", isPassed);
            userRecord.put("codePassed", isPassed);
            userRecord.put("completed", isPassed);
            if (rec != null) {
                userRecord.put("thinkingScore", rec.getThinkingScore());
                userRecord.put("thinkingFeedback", rec.getThinkingFeedback());
                userRecord.put("quizAnswers", rec.getQuizAnswers());
            }
            map.put("record", userRecord);
            map.put("userRecord", userRecord);
            resultList.add(map);
        }

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("challenges", resultList);
        return res;
    }

    /**
     * Legacy frontend topic completion endpoint (POST /api/star-challenges/submit-topic).
     */
    @PostMapping("/star-challenges/submit-topic")
    public Map<String, Object> submitTopic(@RequestBody Map<String, Object> body) {
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("topic", body.get("topic"));
        return res;
    }

    @GetMapping("/star-challenges/levels")
    public Map<String, Object> getStarChallengeLevels(
            @RequestParam("subtopicName") String subtopicName,
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        return getStarChallenges(subtopicName, userId);
    }

    @GetMapping("/star-challenges/{subtopicName}")
    public Map<String, Object> getStarChallenges(
            @PathVariable("subtopicName") String subtopicName,
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        List<ChallengeDetailResp> levels = challengeService.getChallengesBySubtopic(userId, subtopicName);
        
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("levels", levels);
        res.put("detail", levels.isEmpty() ? null : levels.get(0));
        return res;
    }

    /**
     * 老前端 POST /star-challenges/{subtopicName}/submit-code
     */
    @PostMapping("/star-challenges/{subtopicName}/submit-code")
    public Map<String, Object> submitCodeCompat(
            @PathVariable("subtopicName") String subtopicName,
            @RequestBody Map<String, Object> body,
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer challengeId = Integer.parseInt(body.get("challengeId").toString());
        Object submitted = body.get("code");
        if (!(submitted instanceof String code) || code.isBlank()) {
            throw new IllegalArgumentException("请提交实际代码，不能使用客户端 passed 标记记录通关");
        }
        JudgementResult result = challengeService.submitCode(userId, challengeId, code);
        
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("status", result.getStatus());
        res.put("passed", "ACCEPTED".equals(result.getStatus()));
        res.put("runtimeMs", result.getRuntimeMs());
        res.put("message", result.getMessage());
        return res;
    }

    /**
     * 老前端 POST /star-challenges/{subtopicName}/submit-quiz
     */
    @PostMapping({"/star-challenges/submit-quiz", "/star-challenges/{subtopicName}/submit-quiz"})
    public Map<String, Object> submitQuizCompat(
            @RequestBody Map<String, Object> body,
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        Integer challengeId = Integer.parseInt(body.get("challengeId").toString());
        Map<String, Integer> answers = (Map<String, Integer>) body.get("answers");
        boolean passed = challengeService.submitQuizzes(activeUserId, challengeId, answers);
        
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("passed", passed);
        return res;
    }

    /**
     * 老前端 POST /star-challenges/{subtopicName}/submit-thinking
     */
    @PostMapping({"/star-challenges/submit-thinking", "/star-challenges/{subtopicName}/submit-thinking"})
    public Map<String, Object> submitThinkingCompat(
            @RequestBody Map<String, Object> body,
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        Integer challengeId = Integer.parseInt(body.get("challengeId").toString());
        String answer = body.get("answer").toString();
        ThinkingEvaluateResp resp = challengeService.evaluateThinkingQuestion(activeUserId, challengeId, answer);
        
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("score", resp.getScore());
        res.put("feedback", resp.getFeedback());
        return res;
    }

    // ─── 个人出题相关接口 ───

    /**
     * 获取当前用户出的所有题目（已发布 + 草稿）
     */
    @GetMapping("/challenges/my")
    public ApiResponse<Map<String, Object>> getMyChallenges(
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        if (userId == null) {
            return ApiResponse.success(Map.of("published", List.of(), "drafts", List.of()));
        }

        // 已发布的题目
        List<Challenge> published = challengeMapper.selectList(
                new LambdaQueryWrapper<Challenge>()
                        .eq(Challenge::getAuthorId, userId)
                        .eq(Challenge::getStatus, "published")
                        .orderByDesc(Challenge::getCreatedAt)
        );

        // 草稿
        List<ChallengeDraft> drafts = challengeService.getMyDrafts(userId);

        Map<String, Object> res = new HashMap<>();
        res.put("published", published);
        res.put("drafts", drafts);
        return ApiResponse.success(res);
    }

    /**
     * 用户提交新的出题草稿
     */
    @PostMapping("/challenges/drafts")
    public ApiResponse<Void> createDraft(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestBody ChallengeDraft draft) {
        Integer activeUserId = getUserIdOrFallback(userId);
        challengeService.createDraft(activeUserId, draft);
        return ApiResponse.success("草稿已提交，等待管理员审核");
    }
}
