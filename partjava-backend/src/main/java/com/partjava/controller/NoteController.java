package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.entity.Note;
import com.partjava.service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    private Long getUserIdOrFallback(Integer userId) {
        if (userId == null) {
            return 1L; // 默认测试降级用户 id = 1
        }
        return Long.valueOf(userId);
    }

    /**
     * 条件查询随堂笔记列表
     */
    @GetMapping
    public ApiResponse<List<Note>> getNotes(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "technology", required = false) String technology,
            @RequestParam(value = "isPublic", required = false) Boolean isPublic) {
        Long activeUserId = getUserIdOrFallback(userId);
        List<Note> list = noteService.listNotes(activeUserId, category, technology, isPublic);
        return ApiResponse.success(list);
    }

    /**
     * 查看笔记详情
     */
    @GetMapping("/{id}")
    public ApiResponse<Note> getNoteDetail(@PathVariable("id") Long noteId) {
        Note note = noteService.getNoteById(noteId);
        return ApiResponse.success(note);
    }

    /**
     * 保存/新建笔记
     */
    @PostMapping
    public ApiResponse<Note> createNote(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestBody Note note) {
        Long activeUserId = getUserIdOrFallback(userId);
        Note created = noteService.createNote(activeUserId, note);
        return ApiResponse.success(created);
    }

    /**
     * 更新随堂笔记
     */
    @PutMapping("/{id}")
    public ApiResponse<Note> updateNote(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long noteId,
            @RequestBody Note note) {
        Long activeUserId = getUserIdOrFallback(userId);
        Note updated = noteService.updateNote(activeUserId, noteId, note);
        return ApiResponse.success(updated);
    }

    /**
     * 删除随堂笔记
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteNote(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long noteId) {
        Long activeUserId = getUserIdOrFallback(userId);
        noteService.deleteNote(activeUserId, noteId);
        return ApiResponse.success(null);
    }

    /**
     * 点赞/取消点赞笔记
     */
    @PostMapping("/{id}/like")
    public ApiResponse<Void> toggleLike(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long noteId) {
        Long activeUserId = getUserIdOrFallback(userId);
        noteService.toggleLikeNote(activeUserId, noteId);
        return ApiResponse.success(null);
    }

    /**
     * 收藏/取消收藏笔记
     */
    @PostMapping("/{id}/bookmark")
    public ApiResponse<Void> toggleBookmark(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long noteId) {
        Long activeUserId = getUserIdOrFallback(userId);
        noteService.toggleBookmarkNote(activeUserId, noteId);
        return ApiResponse.success(null);
    }

    /**
     * 进阶 VIP 专享：一键复用/克隆笔记
     */
    @PostMapping("/{id}/clone")
    public ApiResponse<Note> cloneNote(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long noteId) {
        Long activeUserId = getUserIdOrFallback(userId);
        Note cloned = noteService.cloneNote(activeUserId, noteId);
        return ApiResponse.success(cloned);
    }
}
