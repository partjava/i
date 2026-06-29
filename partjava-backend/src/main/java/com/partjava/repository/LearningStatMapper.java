package com.partjava.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.partjava.entity.LearningStat;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LearningStatMapper extends BaseMapper<LearningStat> {
}
