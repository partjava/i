package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("study_sessions")
public class StudySession {
    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer userId;
    private Integer studyTime;
    private String category;
    private String technology;
    private String activity;
    private LocalDateTime createdAt;

    // MySQL GENERATED COLUMN，Java 侧不需要主动插入和更新
    @TableField(exist = false)
    private LocalDate studyDate;
}
