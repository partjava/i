package com.partjava.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Challenge;
import com.partjava.entity.ChallengeDetail;
import com.partjava.entity.ChallengeQuiz;
import com.partjava.repository.ChallengeDetailMapper;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.ChallengeQuizMapper;
import lombok.Data;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 管理员维护已发布关卡的元数据与内容正文
 */
@RestController
@RequestMapping("/api/admin/challenges")
@PreAuthorize("hasAnyRole('ADMIN', 'OWNER')")
public class AdminChallengeMetaController {

    private final ChallengeMapper challengeMapper;
    private final ChallengeDetailMapper challengeDetailMapper;
    private final ChallengeQuizMapper challengeQuizMapper;

    public AdminChallengeMetaController(ChallengeMapper challengeMapper,
                                        ChallengeDetailMapper challengeDetailMapper,
                                        ChallengeQuizMapper challengeQuizMapper) {
        this.challengeMapper = challengeMapper;
        this.challengeDetailMapper = challengeDetailMapper;
        this.challengeQuizMapper = challengeQuizMapper;
    }

    /**
     * 获取单个关卡的完整数据（元数据 + 详情正文）
     */
    @GetMapping("/{id}")
    public ApiResponse<ChallengeFullResp> getChallengeFull(@PathVariable("id") Integer challengeId) {
        Challenge meta = challengeMapper.selectById(challengeId);
        if (meta == null) throw new IllegalArgumentException("关卡不存在");
        ChallengeDetail detail = challengeDetailMapper.selectById(challengeId);

        ChallengeFullResp resp = new ChallengeFullResp();
        resp.setId(meta.getId());
        resp.setTitle(meta.getTitle());
        resp.setStageId(meta.getStageId());
        resp.setTopicName(meta.getTopicName());
        resp.setSubtopicName(meta.getSubtopicName());
        resp.setLevelIndex(meta.getLevelIndex());
        resp.setDifficulty(meta.getDifficulty());
        resp.setAccessLevel(meta.getAccessLevel());
        resp.setStatus(meta.getStatus());
        resp.setSlug(meta.getSlug());
        resp.setAuthorId(meta.getAuthorId());
        resp.setIsPublic(meta.getIsPublic() != null ? meta.getIsPublic() : true);

        // 加载选择题
        List<ChallengeQuiz> quizzes = challengeQuizMapper.selectList(
                new LambdaQueryWrapper<ChallengeQuiz>().eq(ChallengeQuiz::getChallengeId, challengeId));
        List<QuizItem> quizItems = new ArrayList<>();
        if (quizzes != null) {
            for (ChallengeQuiz q : quizzes) {
                QuizItem item = new QuizItem();
                item.setId(q.getId());
                item.setQuestion(q.getQuestion());
                item.setOptions(q.getOptions());
                item.setCorrectIndex(q.getCorrectIndex());
                item.setExplanation(q.getExplanation());
                quizItems.add(item);
            }
        }
        resp.setQuizzes(quizItems);

        if (detail != null) {
            resp.setTheoryContent(detail.getTheoryMarkdown());
            resp.setStarterCode(detail.getStarterCode());
            resp.setSolutionCode(detail.getSolutionCode());
            resp.setThinkingQuestion(detail.getThinkingQuestion());
            resp.setAiPrompt(detail.getAiPrompt());
            resp.setLatexFormulas(detail.getLatexFormulas());
            resp.setTestCases(convertCaseObjs(detail.getTestCases()));
            resp.setEvaluationCases(convertCaseObjs(detail.getEvaluationCases()));
        }
        return ApiResponse.success(resp);
    }

    private List<CaseItem> convertCaseObjs(List<Object> objs) {
        if (objs == null || objs.isEmpty()) return new ArrayList<>();
        List<CaseItem> result = new ArrayList<>();
        for (Object obj : objs) {
            CaseItem item = new CaseItem();
            if (obj instanceof java.util.Map) {
                @SuppressWarnings("unchecked")
                java.util.Map<String, Object> map = (java.util.Map<String, Object>) obj;
                item.setInput(String.valueOf(map.getOrDefault("input", "")));
                item.setExpected(String.valueOf(map.getOrDefault("expected", "")));
            }
            result.add(item);
        }
        return result;
    }

    /**
     * 更新关卡元数据 + 详情正文
     */
    @PutMapping("/{id}")
    public ApiResponse<Void> updateChallengeFull(
            @PathVariable("id") Integer challengeId,
            @RequestBody UpdateChallengeFullReq req) {

        // 更新元数据
        Challenge meta = challengeMapper.selectById(challengeId);
        if (meta == null) throw new IllegalArgumentException("关卡不存在");

        if (req.getTitle() != null && !req.getTitle().trim().isEmpty()) meta.setTitle(req.getTitle().trim());
        if (req.getStageId() != null) meta.setStageId(req.getStageId());
        if (req.getTopicName() != null) meta.setTopicName(req.getTopicName().trim());
        if (req.getSubtopicName() != null) meta.setSubtopicName(req.getSubtopicName().trim());
        if (req.getLevelIndex() != null) meta.setLevelIndex(req.getLevelIndex());
        if (req.getDifficulty() != null) meta.setDifficulty(req.getDifficulty());
        if (req.getAccessLevel() != null) meta.setAccessLevel(req.getAccessLevel());
        if (req.getIsPublic() != null) meta.setIsPublic(req.getIsPublic());
        challengeMapper.updateById(meta);

        // 更新详情正文
        ChallengeDetail detail = challengeDetailMapper.selectById(challengeId);
        if (detail == null) {
            detail = ChallengeDetail.builder().challengeId(challengeId).build();
            if (req.getTheoryContent() != null) detail.setTheoryMarkdown(req.getTheoryContent());
            if (req.getStarterCode() != null) detail.setStarterCode(req.getStarterCode());
            if (req.getSolutionCode() != null) detail.setSolutionCode(req.getSolutionCode());
            if (req.getThinkingQuestion() != null) detail.setThinkingQuestion(req.getThinkingQuestion());
            if (req.getAiPrompt() != null) detail.setAiPrompt(req.getAiPrompt());
            if (req.getLatexFormulas() != null) detail.setLatexFormulas(req.getLatexFormulas());
            challengeDetailMapper.insert(detail);
        } else {
            if (req.getTheoryContent() != null) detail.setTheoryMarkdown(req.getTheoryContent());
            if (req.getStarterCode() != null) detail.setStarterCode(req.getStarterCode());
            if (req.getSolutionCode() != null) detail.setSolutionCode(req.getSolutionCode());
            if (req.getThinkingQuestion() != null) detail.setThinkingQuestion(req.getThinkingQuestion());
            if (req.getAiPrompt() != null) detail.setAiPrompt(req.getAiPrompt());
            if (req.getLatexFormulas() != null) detail.setLatexFormulas(req.getLatexFormulas());
            if (req.getTestCases() != null) detail.setTestCases(toCaseObjs(req.getTestCases()));
            if (req.getEvaluationCases() != null) detail.setEvaluationCases(toCaseObjs(req.getEvaluationCases()));
            challengeDetailMapper.updateById(detail);
        }

        // 更新选择题：先删后插
        if (req.getQuizzes() != null) {
            challengeQuizMapper.delete(
                    new LambdaQueryWrapper<ChallengeQuiz>().eq(ChallengeQuiz::getChallengeId, challengeId));
            for (QuizItem q : req.getQuizzes()) {
                ChallengeQuiz quiz = ChallengeQuiz.builder()
                        .challengeId(challengeId)
                        .question(q.getQuestion())
                        .options(q.getOptions())
                        .correctIndex(q.getCorrectIndex())
                        .explanation(q.getExplanation())
                        .build();
                challengeQuizMapper.insert(quiz);
            }
        }

        return ApiResponse.success("关卡已更新");
    }

    /**
     * 软删除关卡（移入回收站）
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteChallenge(@PathVariable("id") Integer challengeId) {
        Challenge meta = challengeMapper.selectById(challengeId);
        if (meta == null) throw new IllegalArgumentException("关卡不存在");
        meta.setStatus("deleted");
        challengeMapper.updateById(meta);
        return ApiResponse.success("关卡已移入回收站");
    }

    /**
     * 恢复已删除的关卡
     */
    @PutMapping("/{id}/restore")
    public ApiResponse<Void> restoreChallenge(@PathVariable("id") Integer challengeId) {
        Challenge meta = challengeMapper.selectById(challengeId);
        if (meta == null) throw new IllegalArgumentException("关卡不存在");
        if (!"deleted".equals(meta.getStatus())) throw new IllegalArgumentException("该关卡不在回收站中");
        meta.setStatus("published");
        challengeMapper.updateById(meta);
        return ApiResponse.success("关卡已恢复");
    }

    /**
     * 获取回收站中的关卡
     */
    @GetMapping("/trash")
    public ApiResponse<List<Challenge>> getTrashChallenges() {
        List<Challenge> list = challengeMapper.selectList(
                new LambdaQueryWrapper<Challenge>().eq(Challenge::getStatus, "deleted"));
        return ApiResponse.success(list);
    }

    private List<Object> toCaseObjs(List<CaseItem> items) {
        List<Object> objs = new ArrayList<>();
        for (CaseItem item : items) {
            java.util.Map<String, String> map = new java.util.LinkedHashMap<>();
            map.put("input", item.getInput() != null ? item.getInput() : "");
            map.put("expected", item.getExpected() != null ? item.getExpected() : "");
            objs.add(map);
        }
        return objs;
    }

    @Data
    public static class CaseItem {
        private String input;
        private String expected;
    }

    @Data
    public static class ChallengeFullResp {
        // 元数据
        private Integer id;
        private String title;
        private Integer stageId;
        private String topicName;
        private String subtopicName;
        private Integer levelIndex;
        private String difficulty;
        private String accessLevel;
        private String status;
        private String slug;
        private Integer authorId;
        private Boolean isPublic;
        // 详情正文
        private String theoryContent;
        private String starterCode;
        private String solutionCode;
        private String thinkingQuestion;
        private String aiPrompt;
        private List<String> latexFormulas;
        private List<QuizItem> quizzes;
        private List<CaseItem> testCases;
        private List<CaseItem> evaluationCases;
    }

    @Data
    public static class QuizItem {
        private Integer id;
        private String question;
        private List<String> options;
        private Integer correctIndex;
        private String explanation;
    }

    @Data
    public static class UpdateChallengeFullReq {
        // 元数据
        private String title;
        private Integer stageId;
        private String topicName;
        private String subtopicName;
        private Integer levelIndex;
        private String difficulty;
        private String accessLevel;
        private Boolean isPublic;
        // 详情正文
        private String theoryContent;
        private String starterCode;
        private String solutionCode;
        private String thinkingQuestion;
        private String aiPrompt;
        private List<String> latexFormulas;
        private List<QuizItem> quizzes;
        private List<CaseItem> testCases;
        private List<CaseItem> evaluationCases;
    }
}
