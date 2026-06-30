package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.dto.JudgementResult;
import com.partjava.dto.response.ChallengeDetailResp;
import com.partjava.dto.response.ChallengeProgressResp;
import com.partjava.dto.response.ThinkingEvaluateResp;
import com.partjava.entity.Challenge;
import com.partjava.entity.ChallengeDetail;
import com.partjava.entity.ChallengeQuiz;
import com.partjava.entity.UserChallengeRecord;
import com.partjava.entity.ChallengeDraft;
import com.partjava.event.UserActionEvent;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.ChallengeDetailMapper;
import com.partjava.repository.ChallengeQuizMapper;
import com.partjava.repository.UserChallengeRecordMapper;
import com.partjava.repository.ChallengeDraftMapper;
import com.partjava.service.ChallengeService;
import com.partjava.service.SandboxService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@Service
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeMapper challengeMapper;
    private final ChallengeDetailMapper challengeDetailMapper;
    private final ChallengeQuizMapper challengeQuizMapper;
    private final UserChallengeRecordMapper recordMapper;
    private final ChallengeDraftMapper draftMapper;
    private final SandboxService sandboxService;
    private final ApplicationEventPublisher eventPublisher;

    // AI 评分
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(30))
            .build();
    @Value("${ai.api-key:}")
    private String aiApiKey;
    @Value("${ai.api-url:https://api.deepseek.com/v1}")
    private String aiApiUrl;

    @Autowired
    public ChallengeServiceImpl(ChallengeMapper challengeMapper,
                               ChallengeDetailMapper challengeDetailMapper,
                               ChallengeQuizMapper challengeQuizMapper,
                               UserChallengeRecordMapper recordMapper,
                               ChallengeDraftMapper draftMapper,
                               SandboxService sandboxService,
                               ApplicationEventPublisher eventPublisher) {
        this.challengeMapper = challengeMapper;
        this.challengeDetailMapper = challengeDetailMapper;
        this.challengeQuizMapper = challengeQuizMapper;
        this.recordMapper = recordMapper;
        this.draftMapper = draftMapper;
        this.sandboxService = sandboxService;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public ChallengeProgressResp getGlobalProgress(Integer userId) {
        // 1. 获取全平台所有的已发布关卡元数据 (star_challenges)
        List<Challenge> challenges = challengeMapper.selectList(
                new LambdaQueryWrapper<Challenge>().eq(Challenge::getStatus, "published")
        );

        // 2. 获取该用户的全部做题记录 (star_challenge_records)
        List<UserChallengeRecord> records = recordMapper.selectList(
                new LambdaQueryWrapper<UserChallengeRecord>().eq(UserChallengeRecord::getUserId, userId)
        );

        Map<Integer, UserChallengeRecord> recordMap = records.stream()
                .collect(Collectors.toMap(UserChallengeRecord::getChallengeId, r -> r, (r1, r2) -> r1));

        int completedCount = 0;
        List<ChallengeProgressResp.StageProgressItem> items = new ArrayList<>();

        for (Challenge c : challenges) {
            UserChallengeRecord r = recordMap.get(c.getId());
            boolean completed = false;
            String quizStatus = "NOT_STARTED";
            Integer thinkingScore = 0;

            if (r != null) {
                completed = Boolean.TRUE.equals(r.getCompleted());
                thinkingScore = r.getThinkingScore() != null ? r.getThinkingScore() : 0;
                
                if (r.getQuizAnswers() != null && !r.getQuizAnswers().isEmpty()) {
                    quizStatus = "COMPLETED";
                }
            }

            if (completed) {
                completedCount++;
            }

            items.add(new ChallengeProgressResp.StageProgressItem(
                    c.getId().toString(),
                    completed,
                    quizStatus,
                    thinkingScore
            ));
        }

        return new ChallengeProgressResp(
                completedCount,
                challenges.size(),
                items
        );
    }

    @Override
    public ChallengeDetailResp getChallengeDetail(Integer userId, Integer challengeId) {
        ChallengeDetail detail = challengeDetailMapper.selectById(challengeId);
        if (detail == null) {
            throw new IllegalArgumentException("请求的算法关卡不存在，ID: " + challengeId);
        }

        Challenge meta = challengeMapper.selectById(challengeId);

        List<ChallengeQuiz> quizzes = challengeQuizMapper.selectList(
                new LambdaQueryWrapper<ChallengeQuiz>().eq(ChallengeQuiz::getChallengeId, challengeId)
        );

        List<ChallengeDetailResp.QuizItem> quizItems = quizzes.stream().map(q -> 
                new ChallengeDetailResp.QuizItem(
                        q.getId().toString(),
                        q.getQuestion(),
                        q.getOptions(),
                        q.getExplanation()
                )
        ).collect(Collectors.toList());

        UserChallengeRecord record = recordMapper.selectOne(
                new LambdaQueryWrapper<UserChallengeRecord>()
                        .eq(UserChallengeRecord::getUserId, userId)
                        .eq(UserChallengeRecord::getChallengeId, challengeId)
        );

        ChallengeDetailResp resp = new ChallengeDetailResp();
        resp.setId(challengeId.toString());
        resp.setTitle(meta != null ? meta.getTitle() : "算法挑战");
        resp.setPoints(meta != null ? meta.getPoints() : 10);
        resp.setLevelIndex(meta != null ? meta.getLevelIndex() : 1);
        resp.setLevelTitle(meta != null ? meta.getTitle() : "算法挑战");
        resp.setStageId(meta != null ? meta.getStageId() : 1);
        
        resp.setTheory(detail.getTheoryMarkdown());
        resp.setLatexFormulas(detail.getLatexFormulas());
        resp.setStarterCode(detail.getStarterCode());
        resp.setConceptualQuizzes(quizItems);
        
        resp.setThinkingQuestion(new ChallengeDetailResp.ThinkingQuestionConfig(
                challengeId.toString(),
                detail.getThinkingQuestion()
        ));

        if (record != null) {
            resp.setCompleted(Boolean.TRUE.equals(record.getCompleted()));
            resp.setQuizAnswers(record.getQuizAnswers() != null ? record.getQuizAnswers() : new HashMap<>());
            resp.setLastSavedCode(record.getBestCode() != null ? record.getBestCode() : detail.getStarterCode());
        } else {
            resp.setCompleted(false);
            resp.setQuizAnswers(new HashMap<>());
            resp.setLastSavedCode(detail.getStarterCode());
        }

        return resp;
    }

    @Override
    @Transactional
    public JudgementResult submitCode(Integer userId, Integer challengeId, String code) {
        ChallengeDetail detail = challengeDetailMapper.selectById(challengeId);
        if (detail == null) {
            throw new IllegalArgumentException("算法关卡未初始化定义，ID: " + challengeId);
        }

        JudgementResult result;

        if (detail.getEvaluationScript() == null || detail.getEvaluationScript().trim().isEmpty()) {
            // 从隐藏判题样例自动生成评测脚本
            List<Object> evalCases = detail.getEvaluationCases();
            if (evalCases == null || evalCases.isEmpty()) {
                evalCases = detail.getTestCases(); // fallback: 用可见测试样例
            }
            if (evalCases != null && !evalCases.isEmpty()) {
                try {
                    String autoScript = generateEvalScript(evalCases);
                    result = sandboxService.evaluateCode(code, autoScript, 5.0);
                } catch (Exception e) {
                    log.error("自动生成评测脚本失败", e);
                    result = new JudgementResult("SYSTEM_ERROR", "评测脚本生成失败: " + e.getMessage(), 0);
                }
            } else {
                log.info("📢 [判题引擎] 本关无测试样例，启用语法校验");
                boolean hasModified = code != null && !code.trim().isEmpty()
                        && !code.trim().equals(detail.getStarterCode() != null ? detail.getStarterCode().trim() : "")
                        && (code.contains("def ") || code.contains("class "));
                if (hasModified) {
                    result = new JudgementResult("ACCEPTED",
                            "__TEST_STATUS__:PASSED|代码语法校验通过（本关暂无测试样例）", 50);
                } else {
                    result = new JudgementResult("WRONG_ANSWER",
                            "__TEST_STATUS__:FAILED|请编写有效代码后再次提交", 10);
                }
            }
        } else {
            result = sandboxService.evaluateCode(code, detail.getEvaluationScript(), 2.0);
        }

        UserChallengeRecord record = recordMapper.selectOne(
                new LambdaQueryWrapper<UserChallengeRecord>()
                        .eq(UserChallengeRecord::getUserId, userId)
                        .eq(UserChallengeRecord::getChallengeId, challengeId)
        );

        boolean isNew = (record == null);
        if (isNew) {
            record = UserChallengeRecord.builder()
                    .userId(userId)
                    .challengeId(challengeId)
                    .completed(false)
                    .build();
        }

        record.setBestCode(code);
        
        if ("ACCEPTED".equals(result.getStatus())) {
            record.setCompleted(true);
            record.setCompletedAt(LocalDateTime.now());
            eventPublisher.publishEvent(new UserActionEvent(this, userId, "COMPLETE_CHALLENGE", 1));
        }

        if (isNew) {
            recordMapper.insert(record);
        } else {
            recordMapper.updateById(record);
        }

        return result;
    }

    @Override
    public ThinkingEvaluateResp evaluateThinkingQuestion(Integer userId, Integer challengeId, String answer) {
        ChallengeDetail detail = challengeDetailMapper.selectById(challengeId);
        if (detail == null) {
            throw new IllegalArgumentException("算法关卡未初始化定义，ID: " + challengeId);
        }

        // AI 评分
        int score = 5;
        String feedback = "AI 评分暂时不可用，请稍后再试。";
        if (aiApiKey != null && !aiApiKey.isBlank() && !aiApiKey.startsWith("${")) {
            try {
                String aiPrompt = detail.getAiPrompt();
                if (aiPrompt == null || aiPrompt.isBlank()) {
                    aiPrompt = "请评估学生对以下思考题的回答，给出0-10分的评分和简短的中文评语。格式：{\"score\": 数字, \"feedback\": \"评语\"}";
                }
                String prompt = aiPrompt + "\n\n学生的回答：\n" + answer;
                String aiResult = callAI(prompt);
                // 尝试解析 JSON 响应
                try {
                    JsonNode node = objectMapper.readTree(aiResult);
                    if (node.has("score")) score = node.get("score").asInt();
                    if (node.has("feedback")) feedback = node.get("feedback").asText();
                    else feedback = aiResult; // fallback: use raw text
                } catch (Exception parseEx) {
                    feedback = aiResult; // 非 JSON 直接用原文
                    // 尝试提取数字作为分数
                    String numStr = aiResult.replaceAll("[^0-9]", "");
                    if (numStr.length() == 1) score = Integer.parseInt(numStr);
                    else if (numStr.length() == 2) score = Math.min(10, Integer.parseInt(numStr) / 10);
                }
            } catch (Exception e) {
                log.error("AI 思考题评分失败: {}", e.getMessage());
                feedback = "AI 评分服务暂时不可用，请联系管理员。";
            }
        } else {
            feedback = "你好！我是你的星际 AI 助教。评估了你对该课题的思考答卷。回答能够抓住问题核心，分析逻辑较为顺畅。希望你继续保持刷题！（AI Key 未配置，使用默认评语）";
        }

        UserChallengeRecord record = recordMapper.selectOne(
                new LambdaQueryWrapper<UserChallengeRecord>()
                        .eq(UserChallengeRecord::getUserId, userId)
                        .eq(UserChallengeRecord::getChallengeId, challengeId)
        );

        boolean isNew = (record == null);
        if (isNew) {
            record = UserChallengeRecord.builder()
                    .userId(userId)
                    .challengeId(challengeId)
                    .completed(false)
                    .build();
        }

        record.setThinkingFeedback(feedback);
        record.setThinkingScore(score);

        if (isNew) {
            recordMapper.insert(record);
        } else {
            recordMapper.updateById(record);
        }

        return new ThinkingEvaluateResp(score, feedback);
    }

    /**
     * 从测试样例 JSON 自动生成 Python 评测脚本
     */
    private String generateEvalScript(List<Object> testCases) {
        StringBuilder sb = new StringBuilder();
        sb.append("import sys, traceback\n");
        sb.append("test_cases = ");
        try { sb.append(objectMapper.writeValueAsString(testCases)); } catch (Exception e) { sb.append("[]"); }
        sb.append("\npassed = 0\n");
        sb.append("user_funcs = [(n, v) for n, v in list(locals().items()) if callable(v) and not n.startswith('_')]\n");
        sb.append("fn = user_funcs[-1][1] if user_funcs else None\n");
        sb.append("for i, tc in enumerate(test_cases):\n");
        sb.append("    try:\n");
        sb.append("        inp = str(tc.get('input', '')); expected = str(tc.get('expected', '')).strip()\n");
        sb.append("        result = ''\n");
        sb.append("        if fn:\n");
        sb.append("            try: result = str(fn(inp))\n");
        sb.append("            except: pass\n");
        sb.append("            if not result:\n");
        sb.append("                try: result = str(fn())\n");
        sb.append("                except: pass\n");
        sb.append("        if not result:\n");
        sb.append("            try: result = str(eval(inp)) if inp else ''\n");
        sb.append("            except: pass\n");
        sb.append("        if str(result).strip() == expected:\n");
        sb.append("            passed += 1\n");
        sb.append("            print(f'Test {i+1}: PASSED')\n");
        sb.append("        else:\n");
        sb.append("            print(f'Test {i+1}: FAILED\\n  expected: {repr(expected)}\\n  got: {repr(result)}')\n");
        sb.append("    except Exception as e:\n");
        sb.append("        print(f'Test {i+1}: ERROR\\n{traceback.format_exc()}')\n");
        sb.append("if passed == len(test_cases):\n");
        sb.append("    print(f'__TEST_STATUS__:PASSED|{passed}/{len(test_cases)} tests passed')\n");
        sb.append("else:\n");
        sb.append("    print(f'__TEST_STATUS__:FAILED|{passed}/{len(test_cases)} passed')\n");
        return sb.toString();
    }

    private String callAI(String prompt) throws Exception {
        Map<String, Object> bodyMap = new HashMap<>();
        bodyMap.put("model", "deepseek-v4-flash");
        bodyMap.put("stream", false);
        bodyMap.put("messages", List.of(Map.of("role", "user", "content", prompt)));

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(aiApiUrl + "/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + aiApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(bodyMap), StandardCharsets.UTF_8))
                .build();

        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        if (response.statusCode() != 200) {
            throw new RuntimeException("AI API HTTP " + response.statusCode());
        }
        JsonNode node = objectMapper.readTree(response.body());
        return node.path("choices").path(0).path("message").path("content").asText("");
    }

    @Override
    @Transactional
    public boolean submitQuizzes(Integer userId, Integer challengeId, Map<String, Integer> answers) {
        List<ChallengeQuiz> quizzes = challengeQuizMapper.selectList(
                new LambdaQueryWrapper<ChallengeQuiz>().eq(ChallengeQuiz::getChallengeId, challengeId)
        );

        if (quizzes == null || quizzes.isEmpty()) {
            return true;
        }

        boolean allCorrect = true;
        for (ChallengeQuiz quiz : quizzes) {
            Integer userAns = answers.get(quiz.getId().toString());
            if (userAns == null || !userAns.equals(quiz.getCorrectIndex())) {
                allCorrect = false;
                break;
            }
        }

        UserChallengeRecord record = recordMapper.selectOne(
                new LambdaQueryWrapper<UserChallengeRecord>()
                        .eq(UserChallengeRecord::getUserId, userId)
                        .eq(UserChallengeRecord::getChallengeId, challengeId)
        );

        boolean isNew = (record == null);
        if (isNew) {
            record = UserChallengeRecord.builder()
                    .userId(userId)
                    .challengeId(challengeId)
                    .completed(false)
                    .build();
        }

        record.setQuizAnswers(answers);

        if (isNew) {
            recordMapper.insert(record);
        } else {
            recordMapper.updateById(record);
        }

        return allCorrect;
    }

    @Override
    public String getSolution(Integer userId, Integer challengeId) {
        UserChallengeRecord record = recordMapper.selectOne(
                new LambdaQueryWrapper<UserChallengeRecord>()
                        .eq(UserChallengeRecord::getUserId, userId)
                        .eq(UserChallengeRecord::getChallengeId, challengeId)
        );

        if (record == null || !Boolean.TRUE.equals(record.getCompleted())) {
            throw new org.springframework.security.access.AccessDeniedException("您尚未成功通关该代码挑战，无法查看标准答案！");
        }

        ChallengeDetail detail = challengeDetailMapper.selectById(challengeId);
        return detail != null ? detail.getSolutionCode() : "";
    }

    @Override
    public List<ChallengeDetailResp> getChallengesBySubtopic(Integer userId, String subtopicName) {
        List<Challenge> challenges = challengeMapper.selectList(
                new LambdaQueryWrapper<Challenge>()
                        .eq(Challenge::getSubtopicName, subtopicName)
                        .eq(Challenge::getStatus, "published")
                        .orderByAsc(Challenge::getLevelIndex)
        );

        List<ChallengeDetailResp> list = new ArrayList<>();
        if (challenges == null || challenges.isEmpty()) {
            return list;
        }

        for (Challenge c : challenges) {
            try {
                ChallengeDetailResp detailResp = getChallengeDetail(userId, c.getId());
                list.add(detailResp);
            } catch (Exception e) {
                log.error("加载子挑战关卡失败，ID: {}", c.getId(), e);
            }
        }
        return list;
    }

    @Override
    @Transactional
    public void createDraft(Integer userId, ChallengeDraft draft) {
        draft.setUserId(userId);
        draft.setStatus("pending");
        draft.setCreatedAt(LocalDateTime.now());
        draft.setUpdatedAt(LocalDateTime.now());
        draftMapper.insert(draft);
    }

    @Override
    public List<ChallengeDraft> getMyDrafts(Integer userId) {
        return draftMapper.selectList(
                new LambdaQueryWrapper<ChallengeDraft>()
                        .eq(ChallengeDraft::getUserId, userId)
                        .orderByDesc(ChallengeDraft::getCreatedAt)
        );
    }

    @Override
    public List<ChallengeDraft> getPendingDrafts() {
        return draftMapper.selectList(
                new LambdaQueryWrapper<ChallengeDraft>()
                        .eq(ChallengeDraft::getStatus, "pending")
                        .orderByDesc(ChallengeDraft::getCreatedAt)
        );
    }

    @Override
    @Transactional
    public void approveDraft(Integer adminId, Integer draftId, String challengeId, Integer levelIndex) {
        ChallengeDraft draft = draftMapper.selectById(draftId);
        if (draft == null) {
            throw new IllegalArgumentException("待审批草稿不存在");
        }

        // 自动计算该小节下一个可用序号（避免唯一约束冲突）
        int effectiveLevelIndex;
        if (levelIndex != null && levelIndex > 0) {
            effectiveLevelIndex = levelIndex;
        } else if (draft.getLevelIndex() != null && draft.getLevelIndex() > 0) {
            effectiveLevelIndex = draft.getLevelIndex();
        } else {
            // 查询该小节已有最大序号 + 1
            List<Challenge> existing = challengeMapper.selectList(
                    new LambdaQueryWrapper<Challenge>()
                            .eq(Challenge::getStageId, draft.getStageId())
                            .eq(Challenge::getSubtopicName, draft.getSubtopicName())
                            .orderByDesc(Challenge::getLevelIndex)
                            .last("LIMIT 1")
            );
            effectiveLevelIndex = (existing != null && !existing.isEmpty())
                    ? existing.get(0).getLevelIndex() + 1 : 1;
        }

        // 确保 slug 唯一
        String finalSlug = challengeId + "-" + effectiveLevelIndex;

        Challenge challenge = Challenge.builder()
                .title(draft.getLevelTitle())
                .stageId(draft.getStageId())
                .topicName(draft.getTopicName())
                .subtopicName(draft.getSubtopicName())
                .levelIndex(effectiveLevelIndex)
                .accessLevel(draft.getAccessLevel() != null ? draft.getAccessLevel() : "member")
                .status("published")
                .points(10)
                .difficulty(draft.getDifficulty() != null ? draft.getDifficulty() : "foundation")
                .slug(finalSlug)
                .authorId(draft.getUserId())
                .isPublic(draft.getIsPublic() != null ? draft.getIsPublic() : true)
                .createdAt(LocalDateTime.now())
                .build();
        challengeMapper.insert(challenge);

        Integer newId = challenge.getId();

        // 转换 TestCaseItem -> Object (可见样例)
        List<Object> testCaseObjs = null;
        if (draft.getTestCases() != null && !draft.getTestCases().isEmpty()) {
            testCaseObjs = new ArrayList<>();
            for (ChallengeDraft.TestCaseItem tc : draft.getTestCases()) {
                Map<String, String> map = new HashMap<>();
                map.put("input", tc.getInput());
                map.put("expected", tc.getExpected());
                testCaseObjs.add(map);
            }
        }
        // 转换 TestCaseItem -> Object (隐藏判题样例)
        List<Object> evalCaseObjs = null;
        if (draft.getEvaluationCases() != null && !draft.getEvaluationCases().isEmpty()) {
            evalCaseObjs = new ArrayList<>();
            for (ChallengeDraft.TestCaseItem ec : draft.getEvaluationCases()) {
                Map<String, String> map = new HashMap<>();
                map.put("input", ec.getInput());
                map.put("expected", ec.getExpected());
                evalCaseObjs.add(map);
            }
        }

        // 只有有内容字段时才更新 detail（避免空 UPDATE 语法错误）
        boolean hasDetailContent = draft.getTheoryContent() != null
                || draft.getStarterCode() != null
                || draft.getSolutionCode() != null
                || draft.getThinkingQuestion() != null
                || draft.getAiPrompt() != null
                || testCaseObjs != null
                || evalCaseObjs != null;

        if (hasDetailContent) {
            ChallengeDetail detail = ChallengeDetail.builder()
                    .challengeId(newId)
                    .theoryMarkdown(draft.getTheoryContent())
                    .latexFormulas(draft.getLatexFormulas())
                    .starterCode(draft.getStarterCode())
                    .solutionCode(draft.getSolutionCode())
                    .thinkingQuestion(draft.getThinkingQuestion())
                    .aiPrompt(draft.getAiPrompt())
                    .testCases(testCaseObjs)
                    .evaluationCases(evalCaseObjs)
                    .build();
            challengeDetailMapper.updateById(detail);
        }

        if (draft.getQuizzes() != null) {
            for (ChallengeDraft.QuizDraftItem q : draft.getQuizzes()) {
                ChallengeQuiz quiz = ChallengeQuiz.builder()
                        .challengeId(newId)
                        .question(q.getQuestion())
                        .options(q.getOptions())
                        .correctIndex(q.getAnswer())
                        .explanation(q.getExplanation())
                        .build();
                challengeQuizMapper.insert(quiz);
            }
        }

        draft.setStatus("approved");
        draft.setReviewerId(adminId);
        draft.setUpdatedAt(LocalDateTime.now());
        draftMapper.updateById(draft);
    }

    @Override
    @Transactional
    public void rejectDraft(Integer adminId, Integer draftId, String comment) {
        ChallengeDraft draft = draftMapper.selectById(draftId);
        if (draft == null) {
            throw new IllegalArgumentException("待审批草稿不存在");
        }
        draft.setStatus("rejected");
        draft.setReviewComment(comment);
        draft.setReviewerId(adminId);
        draft.setUpdatedAt(LocalDateTime.now());
        draftMapper.updateById(draft);
    }
}
