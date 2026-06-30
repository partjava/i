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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class StudyServiceImpl implements StudyService {

    private final StudySessionMapper studySessionMapper;
    private final LearningStatMapper learningStatMapper;
    private final StudyProgressMapper studyProgressMapper;
    private final ApplicationEventPublisher eventPublisher;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudyServiceImpl(StudySessionMapper studySessionMapper,
                            LearningStatMapper learningStatMapper,
                            StudyProgressMapper studyProgressMapper,
                            ApplicationEventPublisher eventPublisher,
                            JdbcTemplate jdbcTemplate) {
        this.studySessionMapper = studySessionMapper;
        this.learningStatMapper = learningStatMapper;
        this.studyProgressMapper = studyProgressMapper;
        this.eventPublisher = eventPublisher;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public void syncStudyTime(Integer userId, Integer studyTime, String category, String technology, String activity) {
        if (studyTime == null || studyTime <= 0) return;

        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59).withNano(999999999);

        StudySession todaySession = studySessionMapper.selectOne(
                new LambdaQueryWrapper<StudySession>()
                        .eq(StudySession::getUserId, userId)
                        .between(StudySession::getCreatedAt, startOfDay, endOfDay));

        if (todaySession != null) {
            todaySession.setStudyTime(todaySession.getStudyTime() + studyTime);
            todaySession.setCategory(category);
            todaySession.setTechnology(technology);
            todaySession.setActivity(activity);
            studySessionMapper.updateById(todaySession);
        } else {
            todaySession = StudySession.builder()
                    .userId(userId).studyTime(studyTime)
                    .category(category).technology(technology).activity(activity)
                    .createdAt(LocalDateTime.now()).build();
            studySessionMapper.insert(todaySession);
        }

        // 用原生 SQL 更新汇总表
        int pointsToAdd = studyTime / 60;
        List<Integer> ids = jdbcTemplate.queryForList(
                "SELECT id FROM learning_stats WHERE user_id = ? LIMIT 1", Integer.class, userId);
        if (!ids.isEmpty()) {
            jdbcTemplate.update(
                    "UPDATE learning_stats SET study_time = study_time + ?, points = points + ?, category = ?, updated_at = NOW() WHERE user_id = ?",
                    studyTime, pointsToAdd, category, userId);
        } else {
            jdbcTemplate.update(
                    "INSERT INTO learning_stats (user_id, study_time, points, category, technology, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
                    userId, studyTime, pointsToAdd, category, technology);
        }

        log.info("同步学员 {} 学习 {}秒, +{}分", userId, studyTime, pointsToAdd);
        eventPublisher.publishEvent(new UserActionEvent(this, userId, "STUDY_TIME", studyTime));
    }

    @Override
    public Map<String, Object> getUserStudyStats(Integer userId) {
        Map<String, Object> row = jdbcTemplate.queryForMap(
                "SELECT COALESCE(study_time,0) / 60 AS totalStudyTime, COALESCE(points,0) AS totalPoints FROM learning_stats WHERE user_id = ?",
                userId);
        return row;
    }

    @Override
    @Transactional
    public void updatePageProgress(Integer userId, String pagePath, boolean completed) {
        if (pagePath == null || pagePath.trim().isEmpty())
            throw new IllegalArgumentException("阅读页面路径不能为空");

        String cleanPath = pagePath.trim();
        StudyProgress progress = studyProgressMapper.selectOne(
                new LambdaQueryWrapper<StudyProgress>()
                        .eq(StudyProgress::getUserId, userId)
                        .eq(StudyProgress::getPagePath, cleanPath));

        int compVal = completed ? 1 : 0;
        if (progress != null) {
            if (progress.getCompleted() == 0 && compVal == 1) {
                progress.setCompleted(compVal);
                progress.setCompletedAt(LocalDateTime.now());
                studyProgressMapper.updateById(progress);
                eventPublisher.publishEvent(new UserActionEvent(this, userId, "READ_PAGE", 1));
            }
        } else {
            progress = StudyProgress.builder()
                    .userId(userId).pagePath(cleanPath).completed(compVal)
                    .completedAt(compVal == 1 ? LocalDateTime.now() : null)
                    .createdAt(LocalDateTime.now()).build();
            studyProgressMapper.insert(progress);
            if (compVal == 1)
                eventPublisher.publishEvent(new UserActionEvent(this, userId, "READ_PAGE", 1));
        }
    }

    @Override
    public List<StudyProgress> getPageProgressList(Integer userId) {
        return studyProgressMapper.selectList(
                new LambdaQueryWrapper<StudyProgress>().eq(StudyProgress::getUserId, userId));
    }
}
