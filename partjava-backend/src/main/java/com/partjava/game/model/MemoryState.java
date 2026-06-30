package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class MemoryState implements GameState {
    private final String gameId;
    private final int size = 4;
    private final int[] cards;        // 牌面值
    private final boolean[] flipped;  // 是否翻开
    private final boolean[] matched;  // 是否配对
    private int firstPick = -1;
    private int score;
    private int pairs;
    private boolean gameOver, won;
    private long lastMoveAt;

    public MemoryState(String gameId) {
        this.gameId = gameId;
        int total = size * size;
        this.cards = new int[total];
        this.flipped = new boolean[total];
        this.matched = new boolean[total];
        // 生成配对
        for (int i = 0; i < total; i++) cards[i] = i / 2;
        List<Integer> list = new ArrayList<>();
        for (int v : cards) list.add(v);
        Collections.shuffle(list, new Random());
        for (int i = 0; i < total; i++) cards[i] = list.get(i);
        this.lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "memory"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("size") public int getSize() { return size; }
    @JsonProperty("cards") public int[] getCards() { return cards; }
    @JsonProperty("flipped") public boolean[] getFlipped() { return flipped; }
    @JsonProperty("matched") public boolean[] getMatched() { return matched; }

    /** 翻牌 */
    public boolean flip(int idx) {
        if (gameOver || idx < 0 || idx >= cards.length || flipped[idx] || matched[idx]) return false;
        lastMoveAt = System.currentTimeMillis();
        flipped[idx] = true;

        if (firstPick == -1) {
            firstPick = idx;
        } else {
            if (cards[firstPick] == cards[idx]) {
                matched[firstPick] = matched[idx] = true;
                flipped[firstPick] = flipped[idx] = false;
                pairs++;
                score += 10;
                if (pairs == cards.length / 2) { won = true; gameOver = true; }
            } else {
                // 不匹配 — 前端负责翻回，后端先把翻开状态记下来
                score = Math.max(0, score - 1);
            }
            firstPick = -1;
        }
        return true;
    }

    /** 前端通知"已翻回" */
    public boolean resetFlip(int idx) {
        if (idx >= 0 && idx < cards.length) {
            flipped[idx] = false;
            return true;
        }
        return false;
    }
}
