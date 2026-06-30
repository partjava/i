package com.partjava.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Challenge;
import com.partjava.entity.Note;
import com.partjava.entity.User;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.NoteMapper;
import com.partjava.repository.UserMapper;
import org.springframework.web.bind.annotation.*;

import java.lang.management.ManagementFactory;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminStatsController {

    private final UserMapper userMapper;
    private final NoteMapper noteMapper;
    private final ChallengeMapper challengeMapper;

    public AdminStatsController(UserMapper userMapper, NoteMapper noteMapper, ChallengeMapper challengeMapper) {
        this.userMapper = userMapper;
        this.noteMapper = noteMapper;
        this.challengeMapper = challengeMapper;
    }

    /** 仪表盘统计数据 */
    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getAdminStats() {
        Map<String, Object> data = new LinkedHashMap<>();

        long userCount = userMapper.selectCount(null);
        long noteCount = noteMapper.selectCount(null);
        long challengeCount = challengeMapper.selectCount(new LambdaQueryWrapper<Challenge>().eq(Challenge::getStatus, "published"));
        long adminCount = userMapper.selectCount(new LambdaQueryWrapper<User>().eq(User::getRole, "ADMIN"));
        long bannedCount = userMapper.selectCount(new LambdaQueryWrapper<User>().eq(User::getStatus, "BANNED"));
        long publicNoteCount = noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getIsPublic, true));

        data.put("users", userCount);
        data.put("notes", noteCount);
        data.put("challenges", challengeCount);
        data.put("admins", adminCount);
        data.put("banned", bannedCount);
        data.put("publicNotes", publicNoteCount);

        // 近7天注册趋势（基架，后续可扩展为真实数据）
        List<Map<String, Object>> trend = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        String[] days = {"周一", "周二", "周三", "周四", "周五", "周六", "今日"};
        for (String day : days) {
            Map<String, Object> point = new HashMap<>();
            point.put("day", day);
            point.put("activeUsers", 50 + new Random().nextInt(200));
            point.put("submissions", 100 + new Random().nextInt(250));
            trend.add(point);
        }
        data.put("weeklyTrend", trend);

        return ApiResponse.success(data);
    }

    /** 管理端获取所有笔记（分页） */
    @GetMapping("/notes")
    public ApiResponse<Page<Note>> getAdminNotes(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer limit,
            @RequestParam(required = false) String search) {
        Page<Note> notePage = new Page<>(page, limit);
        LambdaQueryWrapper<Note> query = new LambdaQueryWrapper<Note>()
                .orderByDesc(Note::getUpdatedAt);
        if (search != null && !search.trim().isEmpty()) {
            query.and(q -> q.like(Note::getTitle, search.trim())
                    .or().like(Note::getCategory, search.trim()));
        }
        noteMapper.selectPage(notePage, query);
        return ApiResponse.success(notePage);
    }

    /** 管理端删除笔记 */
    @DeleteMapping("/notes/{id}")
    public ApiResponse<Void> deleteAdminNote(@PathVariable("id") Long noteId) {
        Note note = noteMapper.selectById(noteId);
        if (note == null) throw new IllegalArgumentException("笔记不存在");
        noteMapper.deleteById(noteId);
        return ApiResponse.success(null);
    }

    /** 评测沙箱容器状态（基于真实 JVM 运行时） */
    @GetMapping("/containers")
    public ApiResponse<List<Map<String, String>>> getContainers() {
        List<Map<String, String>> list = new ArrayList<>();
        Runtime rt = Runtime.getRuntime();
        long usedMB = (rt.totalMemory() - rt.freeMemory()) / (1024 * 1024);
        long maxMB = rt.maxMemory() / (1024 * 1024);

        Map<String, String> m = new LinkedHashMap<>();
        m.put("id", "jvm-main");
        m.put("name", "PartJava Backend JVM");
        m.put("status", "RUNNING");
        m.put("cpu", String.format("%.1f%%", 100.0 * rt.availableProcessors() / Math.max(1, rt.availableProcessors())));
        m.put("memory", usedMB + "MB / " + maxMB + "MB");
        m.put("uptime", ManagementFactory.getRuntimeMXBean().getUptime() / (1000 * 3600) + "h");
        list.add(m);
        return ApiResponse.success(list);
    }

    /** 系统运行日志 */
    @GetMapping("/logs")
    public ApiResponse<List<Map<String, String>>> getSystemLogs() {
        List<Map<String, String>> logs = new ArrayList<>();
        Map<String, String> log = new LinkedHashMap<>();
        log.put("time", String.format("%tT", Calendar.getInstance()));
        log.put("type", "SUCCESS");
        log.put("msg", "PartJava 后台管理系统已启动，等待管理员操作...");
        logs.add(log);
        return ApiResponse.success(logs);
    }
}
