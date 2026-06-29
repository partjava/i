package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("achievements")
public class Achievement {
    @TableId(type = IdType.INPUT)
    private String id;
    private String name;
    private String description;
    private String icon;
    private String category;
    private Integer maxProgress;
    private Integer sortOrder;
}
