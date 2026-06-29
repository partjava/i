package com.partjava.service;

import com.partjava.entity.SearchHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

public interface SearchService {
    /**
     * 全局综合模糊检索（跨随堂笔记、宇宙算法关卡等实体）
     *
     * @param userId 学员用户ID
     * @param query  检索关键词
     */
    SearchResultResp searchGlobal(Integer userId, String query);

    /**
     * 获取当前用户的近 10 条检索历史关键词记录
     */
    List<SearchHistory> getSearchHistory(Integer userId);

    /**
     * 清空当前用户的全部检索历史记录
     */
    void clearSearchHistory(Integer userId);

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    class SearchResultResp {
        private List<com.partjava.entity.Note> notes;
        private List<com.partjava.entity.Challenge> challenges;
    }
}
