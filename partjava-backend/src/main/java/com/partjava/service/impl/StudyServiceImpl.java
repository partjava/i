package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.entity.LearningStat;
import com.partjava.entity.StudyProgress;
import com.partjava.entity.StudySession;
import com.partjava.event.UserActionEvent;
import com.partjava.repository.LearningStatMapper;
import com.partjava.repository.StudyProgressMapper;
import com.partjava.repository.StudySessionMapper;
import com.partjava.service.StudyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class StudyServiceImpl implements StudyService {

    private final StudySessionMapper studySessionMapper;
    private final LearningStatMapper learningStatMapper;
    private final StudyProgressMapper studyProgressMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public StudyServiceImpl(StudySessionMapper studySessionMapper,
                            LearningStatMapper learningStatMapper,
                            StudyProgressMapper studyProgressMapper,
                            ApplicationEventPublisher eventPublisher) {
        this.studySessionMapper = studySessionMapper;
        this.learningStatMapper = learningStatMapper;
        this.studyProgressMapper = studyProgressMapper;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @Transactional
    public void syncStudyTime(Integer userId, Integer studyTime, String category, String technology, String activity) {
        if (studyTime == null || studyTime <= 0) {
            return;
        }

        // 1. 检验今天该学员是否有打卡历史（每个人每天仅限一条物理记录）
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59).withNano(999999999);

        StudySession todaySession = studySessionMapper.selectOne(
                new LambdaQueryWrapper<StudySession>()
                        .eq(StudySession::getUserId, userId)
                        .between(StudySession::getCreatedAt, startOfDay, endOfDay)
        );

        if (todaySession != null) {
            todaySession.setStudyTime(todaySession.getStudyTime() + studyTime);
            todaySession.setCategory(category);
            todaySession.setTechnology(technology);
            todaySession.setActivity(activity);
            studySessionMapper.updateById(todaySession);
        } else {
            todaySession = StudySession.builder()
                    .userId(userId)
                    .studyTime(studyTime)
                    .category(category)
                    .technology(technology)
                    .activity(activity)
                    .createdAt(LocalDateTime.now())
                    .build();
            studySessionMapper.insert(todaySession);
        }

        // 2. 级联累计该用户的全局统计历史与积分 (每学满60秒/1分钟折算1积分)
        LearningStat stats = learningStatMapper.selectOne(
                new LambdaQueryWrapper<LearningStat>().eq(LearningStat::getUserId, userId)
        );

        int pointsToAdd = studyTime / 60; // 换算成积分

        if (stats != null) {
            stats.setStudyTime(stats.getStudyTime() + studyTime);
            stats.setPoints(stats.getPoints() + pointsToAdd);
            stats.setCategory(category);
            stats.setTechnology(technology);
            stats.setActivity(activity);
            stats.setLastStudyDate(LocalDate.now());
            stats.setUpdatedAt(LocalDateTime.now());
            learningStatMapper.updateById(stats);
        } else {
            stats = LearningStat.builder()
                    .userId(userId)
                    .points(pointsToAdd)
                    .studyTime(studyTime)
                    .category(category)
                    .technology(technology)
                    .activity(activity)
                    .lastStudyDate(LocalDate.now())
                    .notesCount(0) // 笔记数由 note 事件单独累加
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            learningStatMapper.insert(stats);
        }

        log.info("同步学员 {} 学习打卡时间：{} 秒，折合增加积分：{} 分", userId, studyTime, pointsToAdd);

        // 3. 🚀 发布异步用户事件，累计成就进度（例如：学习总时长打卡里程碑）
        eventPublisher.publishEvent(new UserActionEvent(this, userId, "STUDY_TIME", studyTime));
    }

    @Override
    @Transactional
    public void updatePageProgress(Integer userId, String pagePath, boolean completed) {
        if (pagePath == null || pagePath.trim().isEmpty()) {
            throw new IllegalArgumentException("阅读页面路径不能为空");
        }

        String cleanPath = pagePath.trim();

        StudyProgress progress = studyProgressMapper.selectOne(
                new LambdaQueryWrapper<StudyProgress>()
                        .eq(StudyProgress::getUserId, userId)
                        .eq(StudyProgress::getPagePath, cleanPath)
        );

        int compVal = completed ? 1 : 0;

        if (progress != null) {
            // 如果原本没完成而现在完成，则记录完成时间
            if (progress.getCompleted() == 0 && compVal == 1) {
                progress.setCompleted(compVal);
                progress.setCompletedAt(LocalDateTime.now());
                studyProgressMapper.updateById(progress);
                
                // 发布异步阅读成就进度
                eventPublisher.publishEvent(new UserActionEvent(this, userId, "READ_PAGE", 1));
            }
        } else {
            progress = StudyProgress.builder()
                    .userId(userId)
                    .pagePath(cleanPath)
                    .completed(compVal)
                    .completedAt(compVal == 1 ? LocalDateTime.now() : null)
                    .createdAt(LocalDateTime.now())
                    .build();
            studyProgressMapper.insert(progress);

            if (compVal == 1) {
                eventPublisher.publishEvent(new UserActionEvent(this, userId, "READ_PAGE", 1));
            }
        }
    }

    @Override
    public List<StudyProgress> getPageProgressList(Integer userId) {
        return studyProgressMapper.selectList(
                new LambdaQueryWrapper<StudyProgress>().eq(StudyProgress::getUserId, userId)
        );
    }
}
