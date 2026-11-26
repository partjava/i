package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Achievement;
import com.partjava.entity.Note;
import com.partjava.entity.NoteBookmark;
import com.partjava.entity.NoteLike;
import com.partjava.entity.User;
import com.partjava.entity.UserAchievement;
import com.partjava.repository.AchievementMapper;
import com.partjava.repository.NoteBookmarkMapper;
import com.partjava.repository.NoteLikeMapper;
import com.partjava.repository.NoteMapper;
import com.partjava.repository.UserAchievementMapper;
import com.partjava.repository.UserMapper;
import com.partjava.service.NoteService;
import lombok.Data;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserExtendedController {

    private final UserMapper userMapper;
    private final NoteMapper noteMapper;
    private final NoteBookmarkMapper noteBookmarkMapper;
    private final NoteLikeMapper noteLikeMapper;
    private final AchievementMapper achievementMapper;
    private final UserAchievementMapper userAchievementMapper;
    private final JdbcTemplate jdbcTemplate;
    private final NoteService noteService;

    public UserExtendedController(UserMapper userMapper,
                                  NoteMapper noteMapper,
                                  NoteBookmarkMapper noteBookmarkMapper,
                                  NoteLikeMapper noteLikeMapper,
                                  AchievementMapper achievementMapper,
                                  UserAchievementMapper userAchievementMapper,
                                  JdbcTemplate jdbcTemplate,
                                  NoteService noteService) {
        this.userMapper = userMapper;
        this.noteMapper = noteMapper;
        this.noteBookmarkMapper = noteBookmarkMapper;
        this.noteLikeMapper = noteLikeMapper;
        this.achievementMapper = achievementMapper;
        this.userAchievementMapper = userAchievementMapper;
        this.jdbcTemplate = jdbcTemplate;
        this.noteService = noteService;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        return userId == null ? 1 : userId;
    }

    private Long getLongUserIdOrFallback(Integer userId) {
        return Long.valueOf(getUserIdOrFallback(userId));
    }

    @GetMapping("/bookmarks")
    public ApiResponse<List<Note>> getUserBookmarks(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Long activeUserId = getLongUserIdOrFallback(userId);
        List<NoteBookmark> bookmarks = noteBookmarkMapper.selectList(
                new LambdaQueryWrapper<NoteBookmark>()
                        .eq(NoteBookmark::getUserId, activeUserId)
                        .orderByDesc(NoteBookmark::getCreatedAt)
        );
        List<Note> notes = bookmarks.stream()
                .map(bookmark -> noteMapper.selectById(bookmark.getNoteId()))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        noteService.enrichNotes(notes, activeUserId);
        return ApiResponse.success(notes);
    }

    @GetMapping("/likes")
    public ApiResponse<List<Note>> getUserLikes(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Long activeUserId = getLongUserIdOrFallback(userId);
        List<NoteLike> likes = noteLikeMapper.selectList(
                new LambdaQueryWrapper<NoteLike>()
                        .eq(NoteLike::getUserId, activeUserId)
                        .orderByDesc(NoteLike::getCreatedAt)
        );
        List<Note> notes = likes.stream()
                .map(like -> noteMapper.selectById(like.getNoteId()))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        noteService.enrichNotes(notes, activeUserId);
        return ApiResponse.success(notes);
    }

    @GetMapping("/likes-received")
    public ApiResponse<Map<String, Object>> getUserLikesReceived(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Long activeUserId = getLongUserIdOrFallback(userId);
        List<Note> myNotes = noteMapper.selectList(
                new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, activeUserId)
        );
        if (myNotes == null || myNotes.isEmpty()) {
            Map<String, Object> empty = new LinkedHashMap<>();
            empty.put("totalReceived", 0);
            empty.put("notesWithLikesCount", 0);
            empty.put("summary", List.of());
            empty.put("records", List.of());
            return ApiResponse.success(empty);
        }

        Map<Long, Note> noteMap = myNotes.stream()
                .filter(Objects::nonNull)
                .collect(Collectors.toMap(Note::getId, n -> n, (a, b) -> a));

        List<Long> myNoteIds = new ArrayList<>(noteMap.keySet());
        List<NoteLike> likes = noteLikeMapper.selectList(
                new LambdaQueryWrapper<NoteLike>()
                        .in(NoteLike::getNoteId, myNoteIds)
                        .orderByDesc(NoteLike::getCreatedAt)
        );

        Set<Long> likerIds = likes.stream()
                .map(NoteLike::getUserId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Map<Long, User> userMap = new HashMap<>();
        if (!likerIds.isEmpty()) {
            List<User> likers = userMapper.selectBatchIds(likerIds);
            if (likers != null) {
                for (User u : likers) {
                    if (u != null && u.getId() != null) {
                        userMap.put(u.getId(), u);
                    }
                }
            }
        }

        List<Map<String, Object>> records = new ArrayList<>();
        Map<Long, List<NoteLike>> byNote = new LinkedHashMap<>();
        for (NoteLike like : likes) {
            byNote.computeIfAbsent(like.getNoteId(), k -> new ArrayList<>()).add(like);
            Note targetNote = noteMap.get(like.getNoteId());
            User liker = userMap.get(like.getUserId());
            String likerName = liker != null
                    ? (liker.getNickname() != null && !liker.getNickname().isBlank() ? liker.getNickname() : liker.getUsername())
                    : ("学习者 #" + like.getUserId());

            Map<String, Object> rec = new LinkedHashMap<>();
            rec.put("id", like.getId());
            rec.put("noteId", like.getNoteId());
            rec.put("noteTitle", targetNote != null ? targetNote.getTitle() : "未命名笔记");
            rec.put("category", targetNote != null ? targetNote.getCategory() : "");
            rec.put("likerId", like.getUserId());
            rec.put("likerName", likerName);
            rec.put("likerAvatar", liker != null ? liker.getAvatar() : null);
            rec.put("likedAt", like.getCreatedAt());
            records.add(rec);
        }

        List<Map<String, Object>> summary = new ArrayList<>();
        for (Map.Entry<Long, List<NoteLike>> entry : byNote.entrySet()) {
            Note targetNote = noteMap.get(entry.getKey());
            if (targetNote == null) continue;
            List<NoteLike> noteLikes = entry.getValue();
            List<Map<String, Object>> recentLikers = new ArrayList<>();
            Set<Long> seenLiker = new HashSet<>();
            for (NoteLike nl : noteLikes) {
                if (seenLiker.contains(nl.getUserId())) continue;
                seenLiker.add(nl.getUserId());
                User u = userMap.get(nl.getUserId());
                String uName = u != null
                        ? (u.getNickname() != null && !u.getNickname().isBlank() ? u.getNickname() : u.getUsername())
                        : ("学习者 #" + nl.getUserId());
                Map<String, Object> lu = new LinkedHashMap<>();
                lu.put("id", nl.getUserId());
                lu.put("name", uName);
                lu.put("avatar", u != null ? u.getAvatar() : null);
                recentLikers.add(lu);
                if (recentLikers.size() >= 5) break;
            }
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("noteId", targetNote.getId());
            item.put("title", targetNote.getTitle());
            item.put("category", targetNote.getCategory());
            item.put("likeCount", noteLikes.size());
            item.put("latestLikedAt", noteLikes.isEmpty() ? null : noteLikes.get(0).getCreatedAt());
            item.put("recentLikers", recentLikers);
            summary.add(item);
        }
        summary.sort((a, b) -> Integer.compare((Integer) b.get("likeCount"), (Integer) a.get("likeCount")));

        Map<String, Object> res = new LinkedHashMap<>();
        res.put("totalReceived", likes.size());
        res.put("notesWithLikesCount", summary.size());
        res.put("summary", summary);
        res.put("records", records);
        return ApiResponse.success(res);
    }

    @PostMapping("/avatar")
    public ApiResponse<User> updateAvatar(@RequestAttribute(value = "userId", required = false) Integer userId,
                                          @RequestBody AvatarReq req) {
        User user = userMapper.selectById(getLongUserIdOrFallback(userId));
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        String avatar = req.getAvatar() != null ? req.getAvatar() : req.getImage();
        if (avatar == null) {
            avatar = req.getUrl();
        }
        user.setAvatar(avatar);
        userMapper.updateById(user);
        user.setPasswordHash(null);
        return ApiResponse.success(user);
    }

    @GetMapping("/profile-by-id")
    public ApiResponse<User> getProfileById(@RequestParam(value = "id", required = false) Long id,
                                            @RequestParam(value = "userId", required = false) Long queryUserId,
                                            @RequestAttribute(value = "userId", required = false) Integer requesterUserId) {
        Long targetId = id != null ? id : queryUserId;
        if (targetId == null) {
            throw new IllegalArgumentException("Missing user id");
        }
        User user = userMapper.selectById(targetId);
        if (user != null) {
            user.setPasswordHash(null);
            boolean isPrivate = user.getPublicProfile() != null && user.getPublicProfile() == 0;
            boolean isSelf = requesterUserId != null && Long.valueOf(requesterUserId.longValue()).equals(targetId);
            if (isPrivate && !isSelf) {
                user.setEmail(null);
                user.setGithub(null);
                user.setWebsite(null);
                user.setLocation(null);
                user.setBio("🔒 该用户已将个人资料设为私密");
            }
        }
        return ApiResponse.success(user);
    }

    @GetMapping("/settings")
    public ApiResponse<Map<String, Object>> getUserSettings(@RequestAttribute(value = "userId", required = false) Integer userId) {
        if (userId == null) {
            throw new IllegalArgumentException("未登录或登录已过期");
        }
        User user = userMapper.selectById(Long.valueOf(userId));
        if (user == null) {
            throw new IllegalArgumentException("用户不存在");
        }
        Map<String, Object> settings = new HashMap<>();
        settings.put("publicProfile", user.getPublicProfile() == null || user.getPublicProfile() != 0);
        settings.put("email", user.getEmail() != null ? user.getEmail() : "");
        settings.put("emailVerified", false);
        return ApiResponse.success(settings);
    }

    @PutMapping("/settings")
    public ApiResponse<Map<String, Object>> updateUserSettings(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                               @RequestBody(required = false) SettingsReq req) {
        if (userId == null) {
            throw new IllegalArgumentException("未登录或登录已过期");
        }
        User user = userMapper.selectById(Long.valueOf(userId));
        if (user == null) {
            throw new IllegalArgumentException("用户不存在");
        }
        if (req != null && req.getPublicProfile() != null) {
            user.setPublicProfile(Boolean.TRUE.equals(req.getPublicProfile()) ? 1 : 0);
            user.setUpdatedAt(LocalDateTime.now());
            userMapper.updateById(user);
        }
        Map<String, Object> settings = new HashMap<>();
        settings.put("publicProfile", user.getPublicProfile() == null || user.getPublicProfile() != 0);
        settings.put("email", user.getEmail() != null ? user.getEmail() : "");
        settings.put("emailVerified", false);
        return ApiResponse.success(settings);
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getUserStats(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        Long uid = Long.valueOf(activeUserId);

        long totalNotes = noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, uid));
        long publicNotes = noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, uid).eq(Note::getIsPublic, true));
        long totalLikes = noteLikeMapper.selectCount(new LambdaQueryWrapper<NoteLike>().inSql(NoteLike::getNoteId, "SELECT id FROM notes WHERE author_id = " + uid));
        long totalStudyTime = 0;
        long studyDays = 0;
        long categories = 0;
        long technologies = 0;
        long bookmarks = 0;
        long comments = 0;
        long earnedAchievements = 0;
        long totalAchievements = 0;
        try {
            totalStudyTime = jdbcTemplate.queryForObject(
                    "SELECT COALESCE(SUM(CASE WHEN study_time > 86400 THEN 3600 ELSE study_time END), 0) FROM study_sessions WHERE user_id = ?",
                    Long.class, uid);
            studyDays = jdbcTemplate.queryForObject("SELECT COUNT(DISTINCT DATE(created_at)) FROM study_sessions WHERE user_id = ?", Long.class, uid);
            categories = jdbcTemplate.queryForObject("SELECT COUNT(DISTINCT category) FROM notes WHERE author_id = ? AND category IS NOT NULL AND category != ''", Long.class, uid);
            technologies = jdbcTemplate.queryForObject("SELECT COUNT(DISTINCT technology) FROM notes WHERE author_id = ? AND technology IS NOT NULL AND technology != ''", Long.class, uid);
            bookmarks = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM note_bookmarks WHERE user_id = ?", Long.class, uid);
            comments = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM comments WHERE note_id IN (SELECT id FROM notes WHERE author_id = ?)", Long.class, uid);
            earnedAchievements = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM user_achievements WHERE user_id = ?", Long.class, uid);
            totalAchievements = achievementMapper.selectCount(null);
        } catch (Exception e) {
            System.out.println(">>> ACHIEVEMENT ERROR: " + e.getClass().getSimpleName() + " - " + e.getMessage());
        }

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> dailyStats = new ArrayList<>();
        List<Map<String, Object>> categoryStats = new ArrayList<>();
        try {
            // 聚合近 60 天的学习时长与创建的笔记篇数（按天合并，支持双轴趋势展示）
            Map<String, Map<String, Object>> dailyStatsMap = new TreeMap<>();

            // 1. 统计学习时长（按天汇总为分钟）
            List<Map<String, Object>> rawStudy = jdbcTemplate.queryForList(
                    "SELECT DATE(created_at) AS date, ROUND(SUM(CASE WHEN study_time > 86400 THEN 3600 ELSE study_time END) / 60) AS studyTime " +
                    "FROM study_sessions WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) " +
                    "GROUP BY DATE(created_at)", uid);
            for (Map<String, Object> row : rawStudy) {
                Object d = row.get("date");
                if (d != null) {
                    String dateStr = d.toString();
                    Map<String, Object> item = dailyStatsMap.computeIfAbsent(dateStr, k -> {
                        Map<String, Object> m = new HashMap<>();
                        m.put("date", k);
                        m.put("studyTime", 0);
                        m.put("notes", 0);
                        return m;
                    });
                    Number st = (Number) row.get("studyTime");
                    item.put("studyTime", st != null ? st.intValue() : 0);
                }
            }

            // 2. 统计近 60 天创建的笔记数量（按天汇总）
            List<Map<String, Object>> rawNotes = jdbcTemplate.queryForList(
                    "SELECT DATE(created_at) AS date, COUNT(*) AS notesCount " +
                    "FROM notes WHERE author_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) " +
                    "GROUP BY DATE(created_at)", uid);
            for (Map<String, Object> row : rawNotes) {
                Object d = row.get("date");
                if (d != null) {
                    String dateStr = d.toString();
                    Map<String, Object> item = dailyStatsMap.computeIfAbsent(dateStr, k -> {
                        Map<String, Object> m = new HashMap<>();
                        m.put("date", k);
                        m.put("studyTime", 0);
                        m.put("notes", 0);
                        return m;
                    });
                    Number nc = (Number) row.get("notesCount");
                    item.put("notes", nc != null ? nc.intValue() : 0);
                }
            }

            dailyStats = new ArrayList<>(dailyStatsMap.values());

            List<Map<String, Object>> rawCat = jdbcTemplate.queryForList(
                    "SELECT category, COUNT(*) AS cnt FROM notes WHERE author_id = ? AND category IS NOT NULL AND category != '' GROUP BY category ORDER BY cnt DESC LIMIT 10", uid);
            for (Map<String, Object> row : rawCat) {
                Map<String, Object> item = new HashMap<>();
                item.put("category", row.get("category"));
                item.put("count", row.get("cnt"));
                categoryStats.add(item);
            }
        } catch (Exception e) {
            System.out.println(">>> DAILY STATS ERROR: " + e.getClass().getSimpleName() + " - " + e.getMessage());
        }

        List<Map<String, Object>> achievementList = new ArrayList<>();
        int earnedCount = 0;
        try {
            List<Map<String, Object>> rawAchievements = jdbcTemplate.queryForList(
                "SELECT id, name, description, icon, category, max_progress, sort_order FROM achievements ORDER BY sort_order ASC");
            for (Map<String, Object> row : rawAchievements) {
                String id = (String) row.get("id");
                int maxProg = row.get("max_progress") instanceof Number ? ((Number) row.get("max_progress")).intValue() : 1;
                // 根据用户真实数据计算当前进度
                int progress = 0;
                if ("first_note".equals(id)) progress = (int) Math.min(totalNotes, maxProg);
                else if ("notes_10".equals(id)) progress = (int) Math.min(totalNotes, maxProg);
                else if ("notes_50".equals(id)) progress = (int) Math.min(totalNotes, maxProg);
                else if ("notes_100".equals(id)) progress = (int) Math.min(totalNotes, maxProg);
                else if ("streak_7".equals(id)) progress = (int) Math.min(studyDays, maxProg);
                else if ("streak_30".equals(id)) progress = (int) Math.min(studyDays, maxProg);
                else if ("streak_100".equals(id)) progress = (int) Math.min(studyDays, maxProg);
                else if ("first_share".equals(id)) progress = (int) Math.min(publicNotes, maxProg);
                else if ("helpful_user".equals(id)) progress = (int) Math.min(totalLikes, maxProg);
                else if ("knowledge_hunter".equals(id)) progress = (int) Math.min(categories, maxProg);
                // early_bird, night_owl, popular_note, perfectionist, comeback_king 暂不能从现有数据计算，保持0

                boolean unlocked = progress >= maxProg;
                if (unlocked) earnedCount++;
                Map<String, Object> item = new HashMap<>();
                item.put("id", id);
                item.put("name", row.get("name"));
                item.put("description", row.get("description"));
                item.put("icon", row.get("icon"));
                item.put("category", row.get("category"));
                item.put("maxProgress", maxProg);
                item.put("progress", progress);
                item.put("unlocked", unlocked);
                achievementList.add(item);
            }
        } catch (Exception ignored) {
        }
        long totalStudyMinutes = totalStudyTime > 0 ? (totalStudyTime / 60) : 0;
        result.put("notes", Map.of("total", totalNotes, "public", publicNotes, "private", totalNotes - publicNotes, "firstNoteDate", "", "lastActivityDate", ""));
        result.put("engagement", Map.of("likesReceived", totalLikes, "bookmarksReceived", bookmarks, "commentsReceived", comments));
        result.put("learning", Map.of(
                "categoriesStudied", categories,
                "technologiesStudied", technologies,
                "totalStudyTime", totalStudyMinutes,
                "totalStudyTimeSeconds", totalStudyTime,
                "studyDays", studyDays,
                "studyDaysTotal", studyDays
        ));
        result.put("achievements", Map.of("total", totalAchievements, "earned", Math.max(earnedCount, (int) earnedAchievements)));
        result.put("achievementList", achievementList);
        result.put("dailyStats", dailyStats);
        result.put("categoryStats", categoryStats);
        List<Map<String, Object>> recentActivity = new ArrayList<>();
        try {
            recentActivity.addAll(jdbcTemplate.queryForList(
                "SELECT CONCAT('note-', id) AS id, 'note' AS type, title, " +
                "CONCAT('创建了新笔记：', title) AS content, created_at AS date " +
                "FROM notes WHERE author_id = ? ORDER BY created_at DESC LIMIT 10", uid));
        } catch (Exception e) {
            System.out.println("Recent notes unavailable: " + e.getClass().getSimpleName());
        }
        try {
            recentActivity.addAll(jdbcTemplate.queryForList(
                "SELECT CONCAT('study-', id) AS id, 'study' AS type, " +
                "COALESCE(NULLIF(technology, ''), NULLIF(category, ''), '学习记录') AS title, " +
                "CONCAT('完成了学习：', COALESCE(NULLIF(technology, ''), NULLIF(category, ''), '学习记录')) AS content, " +
                "created_at AS date FROM study_sessions WHERE user_id = ? " +
                "AND study_time > 0 ORDER BY created_at DESC LIMIT 10", uid));
        } catch (Exception e) {
            System.out.println("Recent study sessions unavailable: " + e.getClass().getSimpleName());
        }
        recentActivity.sort((a, b) -> String.valueOf(b.get("date")).compareTo(String.valueOf(a.get("date"))));
        result.put("recentActivity", recentActivity.stream().limit(10).collect(Collectors.toList()));
        result.put("monthlyStats", new ArrayList<>());
        return ApiResponse.success(result);
    }

    @GetMapping("/achievements")
    public ApiResponse<Map<String, Object>> getAchievements(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        List<Achievement> achievements = achievementMapper.selectList(new LambdaQueryWrapper<Achievement>().orderByAsc(Achievement::getSortOrder));
        List<UserAchievement> userAchievements = userAchievementMapper.selectList(
                new LambdaQueryWrapper<UserAchievement>().eq(UserAchievement::getUserId, activeUserId)
        );
        Map<String, Object> result = new HashMap<>();
        result.put("achievements", achievements);
        result.put("userAchievements", userAchievements);
        return ApiResponse.success(result);
    }

    @PostMapping("/send-verify-email")
    public ApiResponse<Map<String, Object>> sendVerifyEmail() {
        return ApiResponse.success(Map.of("sent", true));
    }

    @PostMapping("/sync-notes")
    public ApiResponse<Map<String, Object>> syncNotes() {
        return ApiResponse.success(Map.of("success", true));
    }

    @PostMapping("/sync-notes-count")
    public ApiResponse<Map<String, Object>> syncNotesCount(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        Long count = noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, Long.valueOf(activeUserId)));
        return ApiResponse.success(Map.of("notesCount", count));
    }

    @GetMapping("/debug/stats")
    public ApiResponse<Map<String, Object>> debugStats(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        Long uid = Long.valueOf(activeUserId);
        Map<String, Object> raw = new HashMap<>();
        try {
            raw.put("user_id", uid);
            raw.put("notes_total", noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, uid)));
            raw.put("notes_public", noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, uid).eq(Note::getIsPublic, true)));
            raw.put("likes_received", noteLikeMapper.selectCount(new LambdaQueryWrapper<NoteLike>().inSql(NoteLike::getNoteId, "SELECT id FROM notes WHERE author_id = " + uid)));
            raw.put("bookmarks_mine", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM note_bookmarks WHERE user_id = ?", Long.class, uid));
            raw.put("comments_received", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM comments WHERE note_id IN (SELECT id FROM notes WHERE author_id = ?)", Long.class, uid));
            raw.put("categories", jdbcTemplate.queryForObject("SELECT COUNT(DISTINCT category) FROM notes WHERE author_id = ? AND category IS NOT NULL AND category != ''", Long.class, uid));
            raw.put("technologies", jdbcTemplate.queryForObject("SELECT COUNT(DISTINCT technology) FROM notes WHERE author_id = ? AND technology IS NOT NULL AND technology != ''", Long.class, uid));
            raw.put("study_time_total", jdbcTemplate.queryForObject("SELECT COALESCE(SUM(CASE WHEN study_time > 86400 THEN 3600 ELSE study_time END), 0) FROM study_sessions WHERE user_id = ?", Long.class, uid));
            raw.put("study_time_minutes", jdbcTemplate.queryForObject("SELECT COALESCE(ROUND(SUM(CASE WHEN study_time > 86400 THEN 3600 ELSE study_time END) / 60), 0) FROM study_sessions WHERE user_id = ?", Long.class, uid));
            raw.put("study_days", jdbcTemplate.queryForObject("SELECT COUNT(DISTINCT DATE(created_at)) FROM study_sessions WHERE user_id = ?", Long.class, uid));
            raw.put("achievements_earned", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM user_achievements WHERE user_id = ?", Long.class, uid));
            raw.put("achievements_total", achievementMapper.selectCount(null));
        } catch (Exception e) {
            raw.put("error", e.getMessage());
        }
        return ApiResponse.success(raw);
    }

    @Data
    public static class AvatarReq {
        private String avatar;
        private String image;
        private String url;
    }

    @Data
    public static class SettingsReq {
        private Boolean publicProfile;
    }
}
