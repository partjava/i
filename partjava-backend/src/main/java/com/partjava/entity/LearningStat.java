package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
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
@TableName("learning_stats")
public class LearningStat {
    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer userId;
    private String activity;
    private Integer points;
    private String category;
    private String technology;
    private Integer studyTime;
    private Integer notesCount;
    private LocalDate lastStudyDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
