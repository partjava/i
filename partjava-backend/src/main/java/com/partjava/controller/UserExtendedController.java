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
import lombok.Data;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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

    public UserExtendedController(UserMapper userMapper,
                                  NoteMapper noteMapper,
                                  NoteBookmarkMapper noteBookmarkMapper,
                                  NoteLikeMapper noteLikeMapper,
                                  AchievementMapper achievementMapper,
                                  UserAchievementMapper userAchievementMapper,
                                  JdbcTemplate jdbcTemplate) {
        this.userMapper = userMapper;
        this.noteMapper = noteMapper;
        this.noteBookmarkMapper = noteBookmarkMapper;
        this.noteLikeMapper = noteLikeMapper;
        this.achievementMapper = achievementMapper;
        this.userAchievementMapper = userAchievementMapper;
        this.jdbcTemplate = jdbcTemplate;
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
                new LambdaQueryWrapper<NoteBookmark>().eq(NoteBookmark::getUserId, activeUserId)
        );
        List<Note> notes = bookmarks.stream()
                .map(bookmark -> noteMapper.selectById(bookmark.getNoteId()))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return ApiResponse.success(notes);
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
                                            @RequestParam(value = "userId", required = false) Long queryUserId) {
        Long targetId = id != null ? id : queryUserId;
        if (targetId == null) {
            throw new IllegalArgumentException("Missing user id");
        }
        User user = userMapper.selectById(targetId);
        if (user != null) {
            user.setPasswordHash(null);
        }
        return ApiResponse.success(user);
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
            totalStudyTime = jdbcTemplate.queryForObject("SELECT COALESCE(SUM(study_time), 0) FROM study_sessions WHERE user_id = ?", Long.class, uid);
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
            dailyStats = jdbcTemplate.queryForList(
                    "SELECT DATE(created_at) AS date, SUM(study_time) AS studyTime, 0 AS notes FROM study_sessions WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) GROUP BY DATE(created_at) ORDER BY date", uid);
            List<Map<String, Object>> rawCat = jdbcTemplate.queryForList(
                    "SELECT category, COUNT(*) AS cnt FROM notes WHERE author_id = ? AND category IS NOT NULL AND category != '' GROUP BY category ORDER BY cnt DESC LIMIT 10", uid);
            for (Map<String, Object> row : rawCat) {
                Map<String, Object> item = new HashMap<>();
                item.put("category", row.get("category"));
                item.put("count", row.get("cnt"));
                categoryStats.add(item);
            }
        } catch (Exception ignored) {
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
        result.put("notes", Map.of("total", totalNotes, "public", publicNotes, "private", totalNotes - publicNotes, "firstNoteDate", "", "lastActivityDate", ""));
        result.put("engagement", Map.of("likesReceived", totalLikes, "bookmarksReceived", bookmarks, "commentsReceived", comments));
        result.put("learning", Map.of("categoriesStudied", categories, "technologiesStudied", technologies, "totalStudyTime", totalStudyTime, "studyDays", studyDays, "studyDaysTotal", studyDays));
        result.put("achievements", Map.of("total", totalAchievements, "earned", Math.max(earnedCount, (int) earnedAchievements)));
        result.put("achievementList", achievementList);
        result.put("dailyStats", dailyStats);
        result.put("categoryStats", categoryStats);
        result.put("recentActivity", new ArrayList<>());
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
            raw.put("study_time_total", jdbcTemplate.queryForObject("SELECT COALESCE(SUM(study_time), 0) FROM study_sessions WHERE user_id = ?", Long.class, uid));
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
}
