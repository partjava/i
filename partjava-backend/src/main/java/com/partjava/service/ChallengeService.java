package com.partjava.service;

import com.partjava.dto.JudgementResult;
import com.partjava.dto.response.ChallengeDetailResp;
import com.partjava.dto.response.ChallengeProgressResp;
import com.partjava.dto.response.ThinkingEvaluateResp;

import java.util.Map;

public interface ChallengeService {
    /**
     * 获取用户在各大宇宙星系的闯关进度
     *
     * @param userId 用户ID
     * @return 宇宙进度列表与统计
     */
    ChallengeProgressResp getGlobalProgress(Integer userId);

    /**
     * 获取单个宇宙关卡的详细数据设计
     *
     * @param userId      用户ID
     * @param challengeId 关卡 ID (Integer)
     */
    ChallengeDetailResp getChallengeDetail(Integer userId, Integer challengeId);

    /**
     * 提交代码运行 Docker 沙箱评测，并更新答题纪录
     *
     * @param userId      用户ID
     * @param challengeId 关卡 ID (Integer)
     * @param code        用户填写的 Python 代码
     */
    JudgementResult submitCode(Integer userId, Integer challengeId, String code);

    /**
     * 提交思考题主观回答，调用 AI 智能打分并记录
     *
     * @param userId      用户ID
     * @param challengeId 关卡 ID (Integer)
     * @param answer      主观题答案文本
     */
    ThinkingEvaluateResp evaluateThinkingQuestion(Integer userId, Integer challengeId, String answer);

    /**
     * 提交选择题的作答选项，检验正确性并记录
     *
     * @param userId      用户ID
     * @param challengeId 关卡 ID (Integer)
     * @param answers     选择题答题 Map
     */
    boolean submitQuizzes(Integer userId, Integer challengeId, Map<String, Integer> answers);

    /**
     * 获取通关关卡的标准答案代码（防作弊）
     *
     * @param userId      用户ID
     * @param challengeId 关卡 ID (Integer)
     */
    String getSolution(Integer userId, Integer challengeId);

    /**
     * 获取某小节下所有的关卡进度详情列表 (用于兼容老前端拉取详情)
     *
     * @param userId        当前登录用户ID
     * @param subtopicName  小节名称
     */
    java.util.List<ChallengeDetailResp> getChallengesBySubtopic(Integer userId, String subtopicName);

    /**
     * 会员提交新挑战关卡出题草稿
     */
    void createDraft(Integer userId, com.partjava.entity.ChallengeDraft draft);

    /**
     * 获取会员个人的出题历史
     */
    java.util.List<com.partjava.entity.ChallengeDraft> getMyDrafts(Integer userId);

    /**
     * 获取所有待审核的草稿（管理员专属）
     */
    java.util.List<com.partjava.entity.ChallengeDraft> getPendingDrafts();

    /**
     * 管理员审核通过并发布关卡到正式库
     */
    void approveDraft(Integer adminId, Integer draftId, String challengeId, Integer levelIndex);

    /**
     * 管理员驳回出题草稿
     */
    void rejectDraft(Integer adminId, Integer draftId, String comment);
}
