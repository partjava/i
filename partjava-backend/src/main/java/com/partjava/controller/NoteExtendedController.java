package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Note;
import com.partjava.entity.NoteBookmark;
import com.partjava.entity.NoteLike;
import com.partjava.repository.NoteBookmarkMapper;
import com.partjava.repository.NoteLikeMapper;
import com.partjava.repository.NoteMapper;
import com.partjava.service.NoteService;
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
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class NoteExtendedController {

    private final NoteService noteService;
    private final NoteMapper noteMapper;
    private final NoteBookmarkMapper noteBookmarkMapper;
    private final NoteLikeMapper noteLikeMapper;

    public NoteExtendedController(NoteService noteService,
                                  NoteMapper noteMapper,
                                  NoteBookmarkMapper noteBookmarkMapper,
                                  NoteLikeMapper noteLikeMapper) {
        this.noteService = noteService;
        this.noteMapper = noteMapper;
        this.noteBookmarkMapper = noteBookmarkMapper;
        this.noteLikeMapper = noteLikeMapper;
    }

    private Long getUserIdOrFallback(Integer userId) {
        return userId == null ? 1L : Long.valueOf(userId);
    }

    @GetMapping("/api/notes/public")
    public ApiResponse<List<Note>> getPublicNotes() {
        return ApiResponse.success(noteService.listNotes(null, null, null, true));
    }

    @GetMapping("/api/notes/categories")
    public ApiResponse<Map<String, List<String>>> getNoteCategories() {
        List<Note> notes = noteService.listNotes(null, null, null, true);
        List<String> categories = notes.stream().map(Note::getCategory).filter(Objects::nonNull).distinct().toList();
        List<String> technologies = notes.stream().map(Note::getTechnology).filter(Objects::nonNull).distinct().toList();
        Map<String, List<String>> result = new LinkedHashMap<>();
        result.put("categories", categories);
        result.put("technologies", technologies);
        return ApiResponse.success(result);
    }

    @GetMapping("/api/notes/search")
    public ApiResponse<List<Note>> searchNotes(@RequestAttribute(value = "userId", required = false) Integer userId,
                                               @RequestParam(value = "q", required = false) String q,
                                               @RequestParam(value = "query", required = false) String query) {
        Long activeUserId = getUserIdOrFallback(userId);
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

    @PostMapping("/api/notes/batch-delete")
    public ApiResponse<Map<String, Object>> batchDeleteNotes(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                            @RequestBody BatchDeleteReq req) {
        Long activeUserId = getUserIdOrFallback(userId);
        int deleted = 0;
        if (req.getIds() != null) {
            for (Long id : req.getIds()) {
                try {
                    noteService.deleteNote(activeUserId, id);
                    deleted++;
                } catch (Exception ignored) {
                }
            }
        }
        return ApiResponse.success(Map.of("deleted", deleted));
    }

    @DeleteMapping("/api/notes/{id}/like")
    public ApiResponse<Void> unlikeNote(@RequestAttribute(value = "userId", required = false) Integer userId,
                                        @PathVariable("id") Long noteId) {
        noteLikeMapper.delete(new LambdaQueryWrapper<NoteLike>()
                .eq(NoteLike::getUserId, getUserIdOrFallback(userId))
                .eq(NoteLike::getNoteId, noteId));
        return ApiResponse.success(null);
    }

    @DeleteMapping("/api/notes/{id}/bookmark")
    public ApiResponse<Void> removeBookmark(@RequestAttribute(value = "userId", required = false) Integer userId,
                                            @PathVariable("id") Long noteId) {
        noteBookmarkMapper.delete(new LambdaQueryWrapper<NoteBookmark>()
                .eq(NoteBookmark::getUserId, getUserIdOrFallback(userId))
                .eq(NoteBookmark::getNoteId, noteId));
        return ApiResponse.success(null);
    }

    @GetMapping("/api/notes/{id}/favorite")
    public ApiResponse<Map<String, Object>> getFavoriteState(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                            @PathVariable("id") Long noteId) {
        NoteBookmark bookmark = noteBookmarkMapper.selectOne(new LambdaQueryWrapper<NoteBookmark>()
                .eq(NoteBookmark::getUserId, getUserIdOrFallback(userId))
                .eq(NoteBookmark::getNoteId, noteId));
        return ApiResponse.success(Map.of("favorite", bookmark != null));
    }

    @PostMapping("/api/notes/{id}/favorite")
    public ApiResponse<Map<String, Object>> toggleFavorite(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                          @PathVariable("id") Long noteId) {
        Long activeUserId = getUserIdOrFallback(userId);
        NoteBookmark existing = noteBookmarkMapper.selectOne(new LambdaQueryWrapper<NoteBookmark>()
                .eq(NoteBookmark::getUserId, activeUserId)
                .eq(NoteBookmark::getNoteId, noteId));
        boolean favorite;
        if (existing != null) {
            noteBookmarkMapper.deleteById(existing.getId());
            favorite = false;
        } else {
            noteService.toggleBookmarkNote(activeUserId, noteId);
            favorite = true;
        }
        return ApiResponse.success(Map.of("favorite", favorite));
    }

    @Data
    public static class BatchDeleteReq {
        private List<Long> ids = new ArrayList<>();
    }
}
