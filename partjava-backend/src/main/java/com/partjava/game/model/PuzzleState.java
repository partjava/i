package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class PuzzleState implements GameState {
    private final String gameId;
    private final int size = 4;
    private final int[][] board;
    private int blankR, blankC;
    private int moves;
    private boolean gameOver, won;
    private long lastMoveAt;

    public PuzzleState(String gameId) {
        this.gameId = gameId;
        this.board = new int[size][size];
        List<Integer> nums = new ArrayList<>();
        for (int i = 1; i < size * size; i++) nums.add(i);
        nums.add(0); // 空白
        Collections.shuffle(nums, new Random());
        for (int r = 0; r < size; r++) for (int c = 0; c < size; c++) {
            board[r][c] = nums.get(r * size + c);
            if (board[r][c] == 0) { blankR = r; blankC = c; }
        }
        // 确保可解
        if (!isSolvable()) {
            if (board[0][0] != 0 && board[0][1] != 0) {
                int t = board[0][0]; board[0][0] = board[0][1]; board[0][1] = t;
            }
        }
        this.lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "puzzle"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return Math.max(0, 1000 - moves * 10); }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("size") public int getSize() { return size; }
    @JsonProperty("board") public int[][] getBoard() { return board; }
    @JsonProperty("moves") public int getMoves() { return moves; }

    public boolean slide(int r, int c) {
        if (gameOver) return false;
        if (Math.abs(r - blankR) + Math.abs(c - blankC) != 1) return false;
        board[blankR][blankC] = board[r][c];
        board[r][c] = 0;
        blankR = r; blankC = c;
        moves++;
        lastMoveAt = System.currentTimeMillis();
        checkWin();
        return true;
    }

    private void checkWin() {
        int expected = 1;
        for (int r = 0; r < size; r++) for (int c = 0; c < size; c++) {
            if (r == size - 1 && c == size - 1) {
                if (board[r][c] != 0) return;
            } else {
                if (board[r][c] != expected++) return;
            }
        }
        won = true;
        gameOver = true;
    }

    private boolean isSolvable() {
        int[] flat = new int[size * size];
        int inv = 0;
        for (int r = 0; r < size; r++) for (int c = 0; c < size; c++) flat[r * size + c] = board[r][c];
        for (int i = 0; i < flat.length; i++) for (int j = i + 1; j < flat.length; j++)
            if (flat[i] != 0 && flat[j] != 0 && flat[i] > flat[j]) inv++;
        if (size % 2 == 0) inv += (size - blankR); // 偶数尺寸
        return inv % 2 == 0;
    }
}
