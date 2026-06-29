package com.partjava.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.partjava.entity.Challenge;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChallengeMapper extends BaseMapper<Challenge> {
}
