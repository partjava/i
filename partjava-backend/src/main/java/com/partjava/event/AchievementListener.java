package com.partjava.event;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.entity.Achievement;
import com.partjava.entity.Note;
import com.partjava.entity.NoteLike;
import com.partjava.entity.StudySession;
import com.partjava.entity.UserAchievement;
import com.partjava.repository.AchievementMapper;
import com.partjava.repository.NoteLikeMapper;
import com.partjava.repository.NoteMapper;
import com.partjava.repository.StudySessionMapper;
import com.partjava.repository.UserAchievementMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Slf4j
@Component
public class AchievementListener {

    private final AchievementMapper achievementMapper;
    private final UserAchievementMapper userAchievementMapper;
    private final NoteMapper noteMapper;
    private final NoteLikeMapper noteLikeMapper;
    private final StudySessionMapper studySessionMapper;

    public AchievementListener(AchievementMapper achievementMapper,
                               UserAchievementMapper userAchievementMapper,
                               NoteMapper noteMapper,
                               NoteLikeMapper noteLikeMapper,
                               StudySessionMapper studySessionMapper) {
        this.achievementMapper = achievementMapper;
        this.userAchievementMapper = userAchievementMapper;
        this.noteMapper = noteMapper;
        this.noteLikeMapper = noteLikeMapper;
        this.studySessionMapper = studySessionMapper;
    }

    /**
     * 异步监听处理用户行为事件，动态依据底层物理表统计进度并解锁成就
     */
    @Async
    @EventListener
    public void handleUserActionEvent(UserActionEvent event) {
        Integer userId = event.getUserId();
        String actionType = event.getActionType();

        log.info("🔥 触发成就引擎计算 - 学员ID: {}, 事件行为: {}", userId, actionType);

        try {
            if ("CREATE_NOTE".equals(actionType)) {
                // 1. 统计当前笔记总数，更新 notes 分类下的成就 (first_note, notes_10, notes_50, notes_100)
                Long totalNotes = noteMapper.selectCount(
                        new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, userId)
                );
                updateCategoryAchievements(userId, "notes", totalNotes.intValue());

            } else if ("SHARE_NOTE".equals(actionType)) {
                // 2. 统计公开分享的笔记总数，更新 social 分类下的 first_share 成就
                Long totalShares = noteMapper.selectCount(
                        new LambdaQueryWrapper<Note>()
                                .eq(Note::getAuthorId, userId)
                                .eq(Note::getIsPublic, true)
                );
                updateCategoryAchievements(userId, "social", totalShares.intValue());

            } else if ("GET_LIKE".equals(actionType)) {
                // 3. 统计该作者所有笔记累计获得的点赞总数，更新 social 分类下的 helpful_user 成就
                List<Note> myNotes = noteMapper.selectList(
                        new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, userId)
                );
                int totalLikes = 0;
                if (myNotes != null && !myNotes.isEmpty()) {
                    List<Long> noteIds = myNotes.stream().map(Note::getId).collect(Collectors.toList());
                    Long likesCount = noteLikeMapper.selectCount(
                            new LambdaQueryWrapper<NoteLike>().in(NoteLike::getNoteId, noteIds)
                    );
                    totalLikes = likesCount.intValue();
                }
                updateCategoryAchievements(userId, "social", totalLikes);

            } else if ("STUDY_TIME".equals(actionType)) {
                // 4. 学习计时打卡行为，处理早起鸟、夜猫子与连续天数
                int currentHour = LocalDateTime.now().getHour();
                
                // 早起成就: early_bird (早上 6 点前开始学习 10 次)
                if (currentHour < 6) {
                    List<StudySession> allSessions = studySessionMapper.selectList(
                            new LambdaQueryWrapper<StudySession>().eq(StudySession::getUserId, userId)
                    );
                    int earlyBirdCount = 0;
                    for (StudySession session : allSessions) {
                        if (session.getCreatedAt() != null && session.getCreatedAt().getHour() < 6) {
                            earlyBirdCount++;
                        }
                    }
                    updateSingleAchievement(userId, "early_bird", earlyBirdCount);
                }

                // 夜猫子成就: night_owl (晚上 11 点后还在学习 10 次)
                if (currentHour >= 23) {
                    List<StudySession> allSessions = studySessionMapper.selectList(
                            new LambdaQueryWrapper<StudySession>().eq(StudySession::getUserId, userId)
                    );
                    int nightOwlCount = 0;
                    for (StudySession session : allSessions) {
                        if (session.getCreatedAt() != null && session.getCreatedAt().getHour() >= 23) {
                            nightOwlCount++;
                        }
                    }
                    updateSingleAchievement(userId, "night_owl", nightOwlCount);
                }

                // 连续天数成就: streak_7, streak_30, streak_100
                calculateAndUpdateStreak(userId);
            }

        } catch (Exception e) {
            log.error("成就引擎在分析学员 {} 时遭遇异常", userId, e);
        }
    }

    /**
     * 更新指定分类下的所有未解锁成就的进度值
     */
    private void updateCategoryAchievements(Integer userId, String category, int currentProgress) {
        List<Achievement> achievements = achievementMapper.selectList(
                new LambdaQueryWrapper<Achievement>().eq(Achievement::getCategory, category)
        );
        if (achievements == null) return;

        for (Achievement achievement : achievements) {
            processProgressUnlock(userId, achievement, currentProgress);
        }
    }

    /**
     * 更新单个特定 ID 的未解锁成就进度
     */
    private void updateSingleAchievement(Integer userId, String achievementId, int currentProgress) {
        Achievement achievement = achievementMapper.selectById(achievementId);
        if (achievement != null) {
            processProgressUnlock(userId, achievement, currentProgress);
        }
    }

    /**
     * 核心进度变更与解锁逻辑
     */
    private void processProgressUnlock(Integer userId, Achievement achievement, int progressValue) {
        UserAchievement userAchievement = userAchievementMapper.selectOne(
                new LambdaQueryWrapper<UserAchievement>()
                        .eq(UserAchievement::getUserId, userId)
                        .eq(UserAchievement::getAchievementId, achievement.getId())
        );

        if (userAchievement != null && Boolean.TRUE.equals(userAchievement.getUnlocked())) {
            return; // 已经解锁直接掠过
        }

        if (userAchievement == null) {
            userAchievement = UserAchievement.builder()
                    .userId(userId)
                    .achievementId(achievement.getId())
                    .unlocked(false)
                    .progress(progressValue)
                    .createdAt(LocalDateTime.now())
                    .build();
            userAchievementMapper.insert(userAchievement);
        } else {
            userAchievement.setProgress(progressValue);
        }

        // 解锁判定
        if (progressValue >= achievement.getMaxProgress()) {
            userAchievement.setUnlocked(true);
            userAchievement.setUnlockedAt(LocalDateTime.now());
            log.info("🎉🎉 恭喜学员 ID: {} 解锁成就: 【{}】 (描述：{})!", 
                    userId, achievement.getName(), achievement.getDescription());
        }

        userAchievementMapper.updateById(userAchievement);
    }

    /**
     * 深度计算学员在 study_sessions 中的连续学习天数 (Streak Count) 并更新相应成就
     */
    private void calculateAndUpdateStreak(Integer userId) {
        List<StudySession> sessions = studySessionMapper.selectList(
                new LambdaQueryWrapper<StudySession>().eq(StudySession::getUserId, userId)
        );
        if (sessions == null || sessions.isEmpty()) {
            return;
        }

        // 用 TreeSet 去重并按日期升序排列
        Set<LocalDate> dates = new TreeSet<>();
        for (StudySession session : sessions) {
            if (session.getCreatedAt() != null) {
                dates.add(session.getCreatedAt().toLocalDate());
            }
        }

        if (dates.isEmpty()) return;

        List<LocalDate> sortedDates = new ArrayList<>(dates);
        
        // 从最新的日期（或者今天）开始倒着往回数连续天数
        LocalDate today = LocalDate.now();
        LocalDate lastStudyDate = sortedDates.get(sortedDates.size() - 1);

        // 如果最后一次学习既不是今天也不是昨天，说明连续学习中断了，天数为 0
        if (!lastStudyDate.equals(today) && !lastStudyDate.equals(today.minusDays(1))) {
            updateSingleAchievement(userId, "streak_7", 0);
            updateSingleAchievement(userId, "streak_30", 0);
            updateSingleAchievement(userId, "streak_100", 0);
            return;
        }

        int streak = 1;
        LocalDate cursor = lastStudyDate;
        for (int i = sortedDates.size() - 2; i >= 0; i--) {
            LocalDate prev = sortedDates.get(i);
            long daysBetween = ChronoUnit.DAYS.between(prev, cursor);
            if (daysBetween == 1) {
                streak++;
                cursor = prev;
            } else if (daysBetween > 1) {
                break; // 中断
            }
        }

        log.info("学员 {} 经过精密测算，当前连续学习天数为：{} 天", userId, streak);

        updateSingleAchievement(userId, "streak_7", streak);
        updateSingleAchievement(userId, "streak_30", streak);
        updateSingleAchievement(userId, "streak_100", streak);
    }
}
