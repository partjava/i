package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Challenge;
import com.partjava.entity.Note;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.NoteMapper;
import com.partjava.repository.UserMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final UserMapper userMapper;
    private final NoteMapper noteMapper;
    private final ChallengeMapper challengeMapper;

    public StatsController(UserMapper userMapper, NoteMapper noteMapper, ChallengeMapper challengeMapper) {
        this.userMapper = userMapper;
        this.noteMapper = noteMapper;
        this.challengeMapper = challengeMapper;
    }

    @GetMapping("/platform")
    public ApiResponse<Map<String, Object>> getPlatformStats() {
        Map<String, Object> result = new HashMap<>();
        result.put("users", userMapper.selectCount(null));
        result.put("notes", noteMapper.selectCount(null));
        result.put("publicNotes", noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getIsPublic, true)));
        result.put("challenges", challengeMapper.selectCount(new LambdaQueryWrapper<Challenge>().eq(Challenge::getStatus, "published")));
        return ApiResponse.success(result);
    }
}
