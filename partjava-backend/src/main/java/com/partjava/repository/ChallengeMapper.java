package com.partjava.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.partjava.entity.Challenge;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChallengeMapper extends BaseMapper<Challenge> {

    @Select("SELECT u.id AS user_id, u.username, " +
            "COUNT(DISTINCT r.challenge_id) AS completed, " +
            "COALESCE(SUM(c.points), 0) AS points " +
            "FROM users u " +
            "LEFT JOIN star_challenge_records r ON u.id = r.user_id AND r.code_passed = 1 " +
            "LEFT JOIN star_challenges c ON r.challenge_id = c.id " +
            "GROUP BY u.id, u.username " +
            "ORDER BY completed DESC, points DESC " +
            "LIMIT 50")
    List<Map<String, Object>> getLeaderboard();
}
