package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.entity.SearchHistory;
import com.partjava.service.SearchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        if (userId == null) {
            return 1; // 默认测试降级用户 id = 1
        }
        return userId;
    }

    /**
     * 全局综合跨实体模糊检索
     */
    @GetMapping("/global")
    public ApiResponse<SearchService.SearchResultResp> searchGlobal(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestParam("query") String query) {
        Integer activeUserId = getUserIdOrFallback(userId);
        SearchService.SearchResultResp result = searchService.searchGlobal(activeUserId, query);
        return ApiResponse.success(result);
    }

    /**
     * 获取当前用户的检索历史词记录 (最多 10 条)
     */
    @GetMapping("/history")
    public ApiResponse<List<SearchHistory>> getHistory(
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        List<SearchHistory> list = searchService.getSearchHistory(activeUserId);
        return ApiResponse.success(list);
    }

    /**
     * 清空当前登录学员的全部搜索历史
     */
    @DeleteMapping("/history")
    public ApiResponse<Void> clearHistory(
            @RequestAttribute(value = "userId", required = false) Integer userId) {
        Integer activeUserId = getUserIdOrFallback(userId);
        searchService.clearSearchHistory(activeUserId);
        return ApiResponse.success(null);
    }
}
