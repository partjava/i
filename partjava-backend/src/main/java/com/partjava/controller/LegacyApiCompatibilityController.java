package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Achievement;
import com.partjava.entity.Challenge;
import com.partjava.entity.LearningStat;
import com.partjava.entity.Note;
import com.partjava.entity.NoteBookmark;
import com.partjava.entity.NoteLike;
import com.partjava.entity.User;
import com.partjava.entity.UserAchievement;
import com.partjava.repository.AchievementMapper;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.LearningStatMapper;
import com.partjava.repository.NoteBookmarkMapper;
import com.partjava.repository.NoteLikeMapper;
import com.partjava.repository.NoteMapper;
import com.partjava.repository.UserAchievementMapper;
import com.partjava.repository.UserMapper;
import com.partjava.service.SearchService;
import com.partjava.service.StudyService;
import lombok.Data;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
public class LegacyApiCompatibilityController {

    private final NoteMapper noteMapper;
    private final NoteBookmarkMapper noteBookmarkMapper;
    private final NoteLikeMapper noteLikeMapper;
    private final UserMapper userMapper;
    private final LearningStatMapper learningStatMapper;
    private final AchievementMapper achievementMapper;
    private final UserAchievementMapper userAchievementMapper;
    private final ChallengeMapper challengeMapper;
    private final StudyService studyService;
    private final SearchService searchService;

    public LegacyApiCompatibilityController(NoteMapper noteMapper,
                                            NoteBookmarkMapper noteBookmarkMapper,
                                            NoteLikeMapper noteLikeMapper,
                                            UserMapper userMapper,
                                            LearningStatMapper learningStatMapper,
                                            AchievementMapper achievementMapper,
                                            UserAchievementMapper userAchievementMapper,
                                            ChallengeMapper challengeMapper,
                                            StudyService studyService,
                                            SearchService searchService) {
        this.noteMapper = noteMapper;
        this.noteBookmarkMapper = noteBookmarkMapper;
        this.noteLikeMapper = noteLikeMapper;
        this.userMapper = userMapper;
        this.learningStatMapper = learningStatMapper;
        this.achievementMapper = achievementMapper;
        this.userAchievementMapper = userAchievementMapper;
        this.challengeMapper = challengeMapper;
        this.studyService = studyService;
        this.searchService = searchService;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        return userId == null ? 1 : userId;
    }

    private Long getLongUserIdOrFallback(Integer userId) {
        return Long.valueOf(getUserIdOrFallback(userId));
    }

    @GetMapping("/api/auth/session")
    public Map<String, Object> getSession(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Map<String, Object> session = new HashMap<>();
        session.put("authenticated", userId != null);
        session.put("userId", userId);
        return session;
    }

    @PostMapping("/api/auth/session")
    public Map<String, Object> postSession(@RequestAttribute(value = "userId", required = false) Integer userId) {
        return getSession(userId);
    }

    @PostMapping("/api/auth/signout")
    public Map<String, Object> signOut() {
        return Map.of("success", true);
    }

    @GetMapping("/api/public-notes")
    public ApiResponse<List<Note>> getPublicNotes() {
        return ApiResponse.success(noteMapper.selectList(
                new LambdaQueryWrapper<Note>()
                        .eq(Note::getIsPublic, true)
                        .orderByDesc(Note::getCreatedAt)
        ));
    }

    @GetMapping("/api/notes/search")
    public ApiResponse<List<Note>> searchNotes(@RequestAttribute(value = "userId", required = false) Integer userId,
                                               @RequestParam(value = "q", required = false) String q,
                                               @RequestParam(value = "query", required = false) String query) {
        Long activeUserId = getLongUserIdOrFallback(userId);
        String keyword = q != null ? q : query;
        LambdaQueryWrapper<Note> wrapper = new LambdaQueryWrapper<Note>()
                .and(scope -> scope.eq(Note::getIsPublic, true).or().eq(Note::getAuthorId, activeUserId));
        if (keyword != null && !keyword.trim().isEmpty()) {
            String clean = keyword.trim();
            wrapper.and(search -> search.like(Note::getTitle, clean).or().like(Note::getContent, clean));
        }
        wrapper.orderByDesc(Note::getCreatedAt);
        return ApiResponse.success(noteMapper.selectList(wrapper));
    }

    @GetMapping("/api/notes/categories")
    public ApiResponse<Map<String, List<String>>> getNoteCategories() {
        List<Note> notes = noteMapper.selectList(new LambdaQueryWrapper<Note>().eq(Note::getIsPublic, true));
        List<String> categories = notes.stream().map(Note::getCategory).filter(Objects::nonNull).distinct().toList();
        List<String> technologies = notes.stream().map(Note::getTechnology).filter(Objects::nonNull).distinct().toList();
        Map<String, List<String>> result = new LinkedHashMap<>();
        result.put("categories", categories);
        result.put("technologies", technologies);
        return ApiResponse.success(result);
    }

    @PostMapping("/api/notes/batch-delete")
    public ApiResponse<Map<String, Object>> batchDeleteNotes(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                            @RequestBody BatchDeleteReq req) {
        Long activeUserId = getLongUserIdOrFallback(userId);
        int deleted = 0;
        if (req.getIds() != null) {
            for (Long id : req.getIds()) {
                Note note = noteMapper.selectById(id);
                if (note != null && activeUserId.equals(note.getAuthorId())) {
                    noteMapper.deleteById(id);
                    deleted++;
                }
            }
        }
        return ApiResponse.success(Map.of("deleted", deleted));
    }

    @DeleteMapping("/api/notes/{id}/like")
    public ApiResponse<Void> unlikeNote(@RequestAttribute(value = "userId", required = false) Integer userId,
                                        @PathVariable("id") Long noteId) {
        noteLikeMapper.delete(new LambdaQueryWrapper<NoteLike>()
                .eq(NoteLike::getUserId, getLongUserIdOrFallback(userId))
                .eq(NoteLike::getNoteId, noteId));
        return ApiResponse.success(null);
    }

    @DeleteMapping("/api/notes/{id}/bookmark")
    public ApiResponse<Void> removeBookmark(@RequestAttribute(value = "userId", required = false) Integer userId,
                                            @PathVariable("id") Long noteId) {
        noteBookmarkMapper.delete(new LambdaQueryWrapper<NoteBookmark>()
                .eq(NoteBookmark::getUserId, getLongUserIdOrFallback(userId))
                .eq(NoteBookmark::getNoteId, noteId));
        return ApiResponse.success(null);
    }

    @GetMapping("/api/notes/{id}/favorite")
    public ApiResponse<Map<String, Object>> getFavoriteState(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                            @PathVariable("id") Long noteId) {
        NoteBookmark bookmark = noteBookmarkMapper.selectOne(new LambdaQueryWrapper<NoteBookmark>()
                .eq(NoteBookmark::getUserId, getLongUserIdOrFallback(userId))
                .eq(NoteBookmark::getNoteId, noteId));
        return ApiResponse.success(Map.of("favorite", bookmark != null));
    }

    @PostMapping("/api/notes/{id}/favorite")
    public ApiResponse<Map<String, Object>> toggleFavorite(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                          @PathVariable("id") Long noteId) {
        Long activeUserId = getLongUserIdOrFallback(userId);
        NoteBookmark existing = noteBookmarkMapper.selectOne(new LambdaQueryWrapper<NoteBookmark>()
                .eq(NoteBookmark::getUserId, activeUserId)
                .eq(NoteBookmark::getNoteId, noteId));
        boolean favorite;
        if (existing != null) {
            noteBookmarkMapper.deleteById(existing.getId());
            favorite = false;
        } else {
            NoteBookmark bookmark = new NoteBookmark();
            bookmark.setUserId(activeUserId);
            bookmark.setNoteId(noteId);
            bookmark.setCreatedAt(java.time.LocalDateTime.now());
            noteBookmarkMapper.insert(bookmark);
            favorite = true;
        }
        return ApiResponse.success(Map.of("favorite", favorite));
    }

    @GetMapping("/api/user/bookmarks")
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

    @PostMapping("/api/user/avatar")
    public ApiResponse<User> updateAvatar(@RequestAttribute(value = "userId", required = false) Integer userId,
                                          @RequestBody AvatarReq req) {
        User user = userMapper.selectById(getLongUserIdOrFallback(userId));
        if (user == null) {
            throw new IllegalArgumentException("用户不存在");
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

    @GetMapping("/api/user/profile-by-id")
    public ApiResponse<User> getProfileById(@RequestParam(value = "id", required = false) Long id,
                                            @RequestParam(value = "userId", required = false) Long queryUserId) {
        Long targetId = id != null ? id : queryUserId;
        if (targetId == null) {
            throw new IllegalArgumentException("缺少用户 ID");
        }
        User user = userMapper.selectById(targetId);
        if (user != null) {
            user.setPasswordHash(null);
        }
        return ApiResponse.success(user);
    }

    @GetMapping("/api/user/stats")
    public ApiResponse<Map<String, Object>> getUserStats(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        LearningStat stat = learningStatMapper.selectOne(
                new LambdaQueryWrapper<LearningStat>().eq(LearningStat::getUserId, activeUserId)
        );
        Long notesCount = noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, Long.valueOf(activeUserId)));
        Map<String, Object> result = new HashMap<>();
        result.put("points", stat != null && stat.getPoints() != null ? stat.getPoints() : 0);
        result.put("studyTime", stat != null && stat.getStudyTime() != null ? stat.getStudyTime() : 0);
        result.put("notesCount", notesCount);
        result.put("lastStudyDate", stat != null ? stat.getLastStudyDate() : null);
        return ApiResponse.success(result);
    }

    @GetMapping("/api/user/achievements")
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

    @PostMapping("/api/user/send-verify-email")
    public ApiResponse<Map<String, Object>> sendVerifyEmail() {
        return ApiResponse.success(Map.of("sent", true));
    }

    @PostMapping("/api/user/sync-notes")
    public ApiResponse<Map<String, Object>> syncNotes() {
        return ApiResponse.success(Map.of("success", true));
    }

    @PostMapping("/api/user/sync-notes-count")
    public ApiResponse<Map<String, Object>> syncNotesCount(@RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        Long count = noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getAuthorId, Long.valueOf(activeUserId)));
        return ApiResponse.success(Map.of("notesCount", count));
    }

    @PostMapping("/api/user/track-learning")
    public ApiResponse<Void> trackLearning(@RequestAttribute(value = "userId", required = false) Integer userId,
                                           @RequestBody TrackLearningReq req) {
        Integer time = req.getStudyTime() != null ? req.getStudyTime() : req.getTime();
        if (time == null) {
            time = req.getDuration();
        }
        if (time == null || time <= 0) {
            time = 60;
        }
        studyService.syncStudyTime(getUserIdOrFallback(userId), time, req.getCategory(), req.getTechnology(), req.getActivity());
        return ApiResponse.success(null);
    }

    @PostMapping("/api/study/record")
    public ApiResponse<Void> recordStudy(@RequestAttribute(value = "userId", required = false) Integer userId,
                                         @RequestBody TrackLearningReq req) {
        return trackLearning(userId, req);
    }

    @PostMapping("/api/search/history")
    public ApiResponse<Map<String, Object>> saveSearchHistory(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                             @RequestBody SearchHistoryReq req) {
        if (req.getQuery() != null && !req.getQuery().trim().isEmpty()) {
            searchService.searchGlobal(getUserIdOrFallback(userId), req.getQuery());
        }
        return ApiResponse.success(Map.of("success", true));
    }

    @GetMapping("/api/stats/platform")
    public ApiResponse<Map<String, Object>> getPlatformStats() {
        Map<String, Object> result = new HashMap<>();
        result.put("users", userMapper.selectCount(null));
        result.put("notes", noteMapper.selectCount(null));
        result.put("publicNotes", noteMapper.selectCount(new LambdaQueryWrapper<Note>().eq(Note::getIsPublic, true)));
        result.put("challenges", challengeMapper.selectCount(new LambdaQueryWrapper<Challenge>().eq(Challenge::getStatus, "published")));
        return ApiResponse.success(result);
    }

    @Data
    public static class BatchDeleteReq {
        private List<Long> ids = new ArrayList<>();
    }

    @Data
    public static class AvatarReq {
        private String avatar;
        private String image;
        private String url;
    }

    @Data
    public static class TrackLearningReq {
        private Integer time;
        private Integer studyTime;
        private Integer duration;
        private String category;
        private String technology;
        private String activity;
    }

    @Data
    public static class SearchHistoryReq {
        private String query;
    }
}
