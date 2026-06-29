package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("study_progress")
public class StudyProgress {
    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer userId;
    private String pagePath;
    private Integer completed; // 0=未完成, 1=已完成
    private LocalDateTime completedAt;
    private LocalDateTime createdAt;
}
