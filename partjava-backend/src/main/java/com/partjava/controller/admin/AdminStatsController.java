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

    private static final int MAX_AUDIT_LOGS = 100;
    private static final java.util.Deque<Map<String, String>> AUDIT_LOGS = new java.util.concurrent.ConcurrentLinkedDeque<>();

    private static final Map<Integer, String> STAGE_NAMES = Map.ofEntries(
            Map.entry(1, "计算机与编程基础"),
            Map.entry(2, "Python 编程"),
            Map.entry(3, "数学基础"),
            Map.entry(4, "机器学习"),
            Map.entry(5, "深度学习"),
            Map.entry(6, "计算机视觉"),
            Map.entry(7, "自然语言处理"),
            Map.entry(8, "大语言模型"),
            Map.entry(9, "强化学习"),
            Map.entry(10, "工程部署"),
            Map.entry(11, "综合实战")
    );

    private final UserMapper userMapper;
    private final NoteMapper noteMapper;
    private final ChallengeMapper challengeMapper;

    @org.springframework.beans.factory.annotation.Autowired(required = false)
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    public AdminStatsController(UserMapper userMapper, NoteMapper noteMapper, ChallengeMapper challengeMapper) {
        this.userMapper = userMapper;
        this.noteMapper = noteMapper;
        this.challengeMapper = challengeMapper;
    }

    private void addAuditLog(String type, String msg) {
        Map<String, String> entry = new LinkedHashMap<>();
        entry.put("time", java.time.LocalTime.now().format(java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss")));
        entry.put("type", type != null ? type : "INFO");
        entry.put("msg", msg != null ? msg : "");
        AUDIT_LOGS.addFirst(entry);
        while (AUDIT_LOGS.size() > MAX_AUDIT_LOGS) {
            AUDIT_LOGS.pollLast();
        }
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

        // 近7天真实活跃与提交趋势
        Map<String, Long> activeUsersByDate = new HashMap<>();
        Map<String, Long> submissionsByDate = new HashMap<>();
        List<Map<String, Object>> stageDistribution = new ArrayList<>();

        if (jdbcTemplate != null) {
            try {
                List<Map<String, Object>> activeRows = jdbcTemplate.queryForList(
                        "SELECT d, COUNT(DISTINCT uid) AS cnt FROM (" +
                                "SELECT study_date AS d, user_id AS uid FROM study_sessions WHERE study_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) " +
                                "UNION ALL " +
                                "SELECT DATE(submitted_at) AS d, user_id AS uid FROM challenge_submissions WHERE submitted_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) " +
                                "UNION ALL " +
                                "SELECT DATE(created_at) AS d, author_id AS uid FROM notes WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)" +
                                ") t GROUP BY d"
                );
                for (Map<String, Object> row : activeRows) {
                    if (row.get("d") != null && row.get("cnt") != null) {
                        activeUsersByDate.put(String.valueOf(row.get("d")), ((Number) row.get("cnt")).longValue());
                    }
                }
            } catch (Exception ignored) {
            }

            try {
                List<Map<String, Object>> subRows = jdbcTemplate.queryForList(
                        "SELECT DATE(submitted_at) AS d, COUNT(*) AS cnt FROM challenge_submissions " +
                                "WHERE submitted_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) GROUP BY DATE(submitted_at)"
                );
                for (Map<String, Object> row : subRows) {
                    if (row.get("d") != null && row.get("cnt") != null) {
                        submissionsByDate.put(String.valueOf(row.get("d")), ((Number) row.get("cnt")).longValue());
                    }
                }
            } catch (Exception ignored) {
            }

            try {
                List<Map<String, Object>> stageRows = jdbcTemplate.queryForList(
                        "SELECT stage_id, COUNT(*) AS cnt FROM star_challenges WHERE status = 'published' GROUP BY stage_id ORDER BY stage_id"
                );
                for (Map<String, Object> row : stageRows) {
                    if (row.get("stage_id") != null && row.get("cnt") != null) {
                        int stageId = ((Number) row.get("stage_id")).intValue();
                        long cnt = ((Number) row.get("cnt")).longValue();
                        Map<String, Object> item = new LinkedHashMap<>();
                        item.put("stageId", stageId);
                        item.put("name", STAGE_NAMES.getOrDefault(stageId, "阶段 " + stageId));
                        item.put("value", cnt);
                        stageDistribution.add(item);
                    }
                }
            } catch (Exception ignored) {
            }
        }

        List<Map<String, Object>> trend = new ArrayList<>();
        java.time.LocalDate today = java.time.LocalDate.now();
        java.time.format.DateTimeFormatter fmt = java.time.format.DateTimeFormatter.ofPattern("MM-dd");
        for (int i = 6; i >= 0; i--) {
            java.time.LocalDate d = today.minusDays(i);
            String dateKey = d.toString();
            Map<String, Object> point = new LinkedHashMap<>();
            point.put("date", dateKey);
            point.put("day", i == 0 ? "今日" : d.format(fmt));
            point.put("activeUsers", activeUsersByDate.getOrDefault(dateKey, 0L));
            point.put("submissions", submissionsByDate.getOrDefault(dateKey, 0L));
            trend.add(point);
        }
        data.put("weeklyTrend", trend);
        data.put("stageDistribution", stageDistribution);

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
        addAuditLog("WARN", "删除笔记 #" + noteId + "《" + note.getTitle() + "》");
        return ApiResponse.success(null);
    }

    /** 管理端切换笔记公开/私有状态 */
    @org.springframework.web.bind.annotation.PutMapping("/notes/{id}/visibility")
    public ApiResponse<Note> updateNoteVisibility(
            @PathVariable("id") Long noteId,
            @org.springframework.web.bind.annotation.RequestBody(required = false) Map<String, Object> body) {
        Note note = noteMapper.selectById(noteId);
        if (note == null) throw new IllegalArgumentException("笔记不存在");
        Object isPublicObj = body != null ? body.get("isPublic") : null;
        boolean targetPublic = isPublicObj instanceof Boolean
                ? (Boolean) isPublicObj
                : !Boolean.TRUE.equals(note.getIsPublic());
        note.setIsPublic(targetPublic);
        noteMapper.updateById(note);
        addAuditLog("INFO", "切换笔记 #" + noteId + "《" + note.getTitle() + "》为" + (targetPublic ? "公开" : "私有"));
        return ApiResponse.success(note);
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

    /** 记录管理员终端/管理操作日志 */
    @org.springframework.web.bind.annotation.PostMapping("/logs")
    public ApiResponse<Map<String, String>> appendSystemLog(
            @org.springframework.web.bind.annotation.RequestBody(required = false) Map<String, Object> body) {
        String type = body != null && body.get("type") != null ? String.valueOf(body.get("type")).trim().toUpperCase() : "INFO";
        String msg = body != null && body.get("msg") != null ? String.valueOf(body.get("msg")).trim() : "";
        if (!msg.isEmpty()) {
            addAuditLog(type, msg);
        }
        Map<String, String> latest = AUDIT_LOGS.peekFirst();
        return ApiResponse.success(latest != null ? latest : Map.of("time", "", "type", type, "msg", msg));
    }

    /** 系统运行日志 */
    @GetMapping("/logs")
    public ApiResponse<List<Map<String, String>>> getSystemLogs() {
        List<Map<String, String>> logs = new ArrayList<>(AUDIT_LOGS);

        if (jdbcTemplate != null) {
            try {
                List<Map<String, Object>> recentSubs = jdbcTemplate.queryForList(
                        "SELECT id, challenge_id, user_id, status, DATE_FORMAT(submitted_at, '%H:%i:%s') AS t " +
                                "FROM challenge_submissions ORDER BY id DESC LIMIT 5"
                );
                for (Map<String, Object> row : recentSubs) {
                    Map<String, String> item = new LinkedHashMap<>();
                    String st = String.valueOf(row.get("status"));
                    item.put("time", row.get("t") != null ? String.valueOf(row.get("t")) : "--:--:--");
                    item.put("type", ("ACCEPTED".equalsIgnoreCase(st) || "passed".equalsIgnoreCase(st)) ? "SUCCESS" : "INFO");
                    item.put("msg", "判题提交 #" + row.get("id") + " (用户#" + row.get("user_id") + " / 题目#" + row.get("challenge_id") + ") 状态: " + st);
                    logs.add(item);
                }
            } catch (Exception ignored) {
            }

            try {
                List<Map<String, Object>> recentNotes = jdbcTemplate.queryForList(
                        "SELECT id, title, author_id, DATE_FORMAT(created_at, '%H:%i:%s') AS t " +
                                "FROM notes ORDER BY id DESC LIMIT 5"
                );
                for (Map<String, Object> row : recentNotes) {
                    Map<String, String> item = new LinkedHashMap<>();
                    item.put("time", row.get("t") != null ? String.valueOf(row.get("t")) : "--:--:--");
                    item.put("type", "INFO");
                    item.put("msg", "新笔记 #" + row.get("id") + "《" + row.get("title") + "》(作者 UID-" + row.get("author_id") + ")");
                    logs.add(item);
                }
            } catch (Exception ignored) {
            }
        }

        if (logs.isEmpty()) {
            Map<String, String> log = new LinkedHashMap<>();
            log.put("time", String.format("%tT", Calendar.getInstance()));
            log.put("type", "SUCCESS");
            log.put("msg", "PartJava 后台管理系统已启动，等待管理员操作...");
            logs.add(log);
        }
        return ApiResponse.success(logs);
    }
}
