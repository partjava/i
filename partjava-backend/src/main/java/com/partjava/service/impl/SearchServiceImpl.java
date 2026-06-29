package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.entity.Challenge;
import com.partjava.entity.Note;
import com.partjava.entity.SearchHistory;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.NoteMapper;
import com.partjava.repository.SearchHistoryMapper;
import com.partjava.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class SearchServiceImpl implements SearchService {

    private final NoteMapper noteMapper;
    private final ChallengeMapper challengeMapper;
    private final SearchHistoryMapper searchHistoryMapper;

    @Autowired
    public SearchServiceImpl(NoteMapper noteMapper,
                             ChallengeMapper challengeMapper,
                             SearchHistoryMapper searchHistoryMapper) {
        this.noteMapper = noteMapper;
        this.challengeMapper = challengeMapper;
        this.searchHistoryMapper = searchHistoryMapper;
    }

    @Override
    @Transactional
    public SearchResultResp searchGlobal(Integer userId, String query) {
        if (query == null || query.trim().isEmpty()) {
            return new SearchResultResp(new ArrayList<>(), new ArrayList<>());
        }
        
        String cleanQuery = query.trim();

        // 1. 如果用户已登录，异步/同步将此次关键词写入历史记录（排重处理）
        if (userId != null) {
            try {
                // 删除同名旧词
                searchHistoryMapper.delete(
                        new LambdaQueryWrapper<SearchHistory>()
                                .eq(SearchHistory::getUserId, userId)
                                .eq(SearchHistory::getQuery, cleanQuery)
                );
                
                // 插入最新词
                SearchHistory history = SearchHistory.builder()
                        .userId(userId)
                        .query(cleanQuery)
                        .createdAt(LocalDateTime.now())
                        .build();
                searchHistoryMapper.insert(history);

                // 维持近 10 条额度上限，删除多余老词
                List<SearchHistory> list = searchHistoryMapper.selectList(
                        new LambdaQueryWrapper<SearchHistory>()
                                .eq(SearchHistory::getUserId, userId)
                                .orderByDesc(SearchHistory::getCreatedAt)
                );
                if (list.size() > 10) {
                    for (int i = 10; i < list.size(); i++) {
                        searchHistoryMapper.deleteById(list.get(i).getId());
                    }
                }
            } catch (Exception e) {
                log.error("写入学员 {} 检索词 {} 历史失败", userId, cleanQuery, e);
            }
        }

        // 2. 检索笔记 (模糊匹配 title/content，且必须公开或者是作者本人的笔记)
        LambdaQueryWrapper<Note> noteQuery = new LambdaQueryWrapper<Note>()
                .and(q -> q.like(Note::getTitle, cleanQuery).or().like(Note::getContent, cleanQuery));
        if (userId != null) {
            noteQuery.and(q -> q.eq(Note::getIsPublic, true).or().eq(Note::getAuthorId, userId));
        } else {
            noteQuery.eq(Note::getIsPublic, true);
        }
        List<Note> notes = noteMapper.selectList(noteQuery);

        // 3. 检索算法宇宙挑战关卡 (模糊匹配挑战 title)
        List<Challenge> challenges = challengeMapper.selectList(
                new LambdaQueryWrapper<Challenge>()
                        .like(Challenge::getTitle, cleanQuery)
                        .eq(Challenge::getStatus, "published")
        );

        return new SearchResultResp(notes, challenges);
    }

    @Override
    public List<SearchHistory> getSearchHistory(Integer userId) {
        return searchHistoryMapper.selectList(
                new LambdaQueryWrapper<SearchHistory>()
                        .eq(SearchHistory::getUserId, userId)
                        .orderByDesc(SearchHistory::getCreatedAt)
                        .last("LIMIT 10")
        );
    }

    @Override
    @Transactional
    public void clearSearchHistory(Integer userId) {
        searchHistoryMapper.delete(
                new LambdaQueryWrapper<SearchHistory>()
                        .eq(SearchHistory::getUserId, userId)
                );
    }
}
