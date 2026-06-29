package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
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
@TableName("star_challenges")
public class Challenge {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;              // 自增物理主键 (int)
    
    @TableField("level_title")
    private String title;            // 关卡标题 (level_title)
    
    @TableField("stage_id")
    private Integer stageId;         // 对应宇宙阶段 (1-11)
    
    @TableField("topic_name")
    private String topicName;        // 对应大主题名称 (如: 语法基础)

    @TableField("subtopic_name")
    private String subtopicName;     // 对应小节名称 (如: 变量与数据类型)

    @TableField("level_index")
    private Integer levelIndex;      // 关卡在小节内的序列号 (1, 2, 3)

    @TableField("access_level")
    private String accessLevel;      // 访问权限: free, member, vip

    @TableField("status")
    private String status;           // 状态: published, draft, archived

    @TableField(exist = false)
    private Integer points = 10;     // 奖励积分 (老物理表无此列，降级为逻辑属性)
    
    private String difficulty;       // 难度 (easy, medium, hard)

    private String slug;             // 别名标识 (如: svm-iris-classification)
    
    @TableField("created_at")
    private LocalDateTime createdAt;
}
