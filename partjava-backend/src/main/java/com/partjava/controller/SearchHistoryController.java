package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.service.SearchService;
import lombok.Data;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SearchHistoryController {

    private final SearchService searchService;

    public SearchHistoryController(SearchService searchService) {
        this.searchService = searchService;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        return userId == null ? 1 : userId;
    }

    @PostMapping("/api/search/history")
    public ApiResponse<Map<String, Object>> saveSearchHistory(@RequestAttribute(value = "userId", required = false) Integer userId,
                                                             @RequestBody SearchHistoryReq req) {
        if (req.getQuery() != null && !req.getQuery().trim().isEmpty()) {
            searchService.searchGlobal(getUserIdOrFallback(userId), req.getQuery());
        }
        return ApiResponse.success(Map.of("success", true));
    }

    @Data
    public static class SearchHistoryReq {
        private String query;
    }
}
