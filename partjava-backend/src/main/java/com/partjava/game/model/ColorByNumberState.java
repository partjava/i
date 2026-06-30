package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class ColorByNumberState implements GameState {
    private final String gameId;
    private final int rows = 10, cols = 10;
    private final int[][] pattern; // 目标颜色编号
    private final int[][] board;   // 玩家填的颜色
    private final int maxColors = 5;
    private int filled;
    private boolean gameOver, won;
    private long lastMoveAt;

    public ColorByNumberState(String gameId) {
        this.gameId = gameId;
        this.pattern = new int[rows][cols];
        this.board = new int[rows][cols];
        Random rng = new Random();
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++)
            pattern[r][c] = rng.nextInt(maxColors) + 1;
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "colorbynumber"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return filled; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("rows") public int getRows() { return rows; }
    @JsonProperty("cols") public int getCols() { return cols; }
    @JsonProperty("pattern") public int[][] getPattern() { return pattern; }
    @JsonProperty("board") public int[][] getBoard() { return board; }
    @JsonProperty("maxColors") public int getMaxColors() { return maxColors; }

    public boolean paint(int r, int c, int color) {
        if (gameOver || r < 0 || r >= rows || c < 0 || c >= cols) return false;
        if (color < 1 || color > maxColors) return false;
        if (board[r][c] == color) return false;
        board[r][c] = color;
        if (color == pattern[r][c]) filled++;
        lastMoveAt = System.currentTimeMillis();
        if (filled == rows * cols) { won = true; gameOver = true; }
        return true;
    }
}
