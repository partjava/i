package com.partjava.service;

import com.partjava.entity.StudyProgress;
import java.util.List;

public interface StudyService {
    /**
     * 同步并打卡计学员的学习时长与积分
     *
     * @param userId      学员用户ID
     * @param studyTime   本次学习打卡时间 (秒)
     * @param category    大类
     * @param technology  技术分类
     * @param activity    动态描述
     */
    void syncStudyTime(Integer userId, Integer studyTime, String category, String technology, String activity);

    /**
     * 记录静态页面阅读进度状态
     */
    void updatePageProgress(Integer userId, String pagePath, boolean completed);

    /**
     * 拉取该学员已记录的所有页面学习进度列表
     */
    List<StudyProgress> getPageProgressList(Integer userId);
}
