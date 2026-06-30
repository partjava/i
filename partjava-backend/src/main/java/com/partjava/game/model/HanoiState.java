package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class HanoiState implements GameState {
    private final String gameId;
    private final List<Deque<Integer>> pegs; // 每根柱子的盘子
    private final int disks;
    private int moves;
    private boolean gameOver, won;
    private long lastMoveAt;

    public HanoiState(String gameId, int disks) {
        this.gameId = gameId;
        this.disks = disks > 0 ? Math.min(disks, 8) : 5;
        this.pegs = new ArrayList<>(3);
        for (int i = 0; i < 3; i++) pegs.add(new ArrayDeque<>());
        for (int i = this.disks; i > 0; i--) pegs.get(0).push(i);
        this.lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "hanoi"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return moves; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("disks") public int getDisks() { return disks; }
    @JsonProperty("moves") public int getMoves() { return moves; }
    @JsonProperty("pegs") public List<List<Integer>> getPegs() {
        List<List<Integer>> result = new ArrayList<>();
        for (Deque<Integer> peg : pegs) {
            List<Integer> list = new ArrayList<>(peg);
            Collections.reverse(list);
            result.add(list);
        }
        return result;
    }

    /** 从 from 移到 to，返回 true 成功 */
    public boolean move(int from, int to) {
        if (gameOver || from < 0 || from > 2 || to < 0 || to > 2 || from == to) return false;
        Deque<Integer> src = pegs.get(from);
        Deque<Integer> dst = pegs.get(to);
        if (src.isEmpty()) return false;
        if (!dst.isEmpty() && dst.peek() < src.peek()) return false;
        dst.push(src.pop());
        moves++;
        lastMoveAt = System.currentTimeMillis();
        if (pegs.get(2).size() == disks) { won = true; gameOver = true; }
        return true;
    }
}
