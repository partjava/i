package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class PipeConnectState implements GameState {
    private final String gameId;
    private final int rows = 6, cols = 6;
    private final int[][] pipes; // 0=empty, 1-4=pipe type with rotation
    private final boolean[][] connected;
    private int score;
    private boolean gameOver, won;
    private long lastMoveAt;

    public PipeConnectState(String gameId) {
        this.gameId = gameId;
        this.pipes = new int[rows][cols];
        this.connected = new boolean[rows][cols];
        Random rng = new Random();
        // 生成简单连通管道
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++)
            pipes[r][c] = rng.nextInt(4) + 1; // 1=straight, 2=corner, 3=T, 4=cross
        // 标记入口出口
        pipes[0][0] = 1;
        pipes[rows-1][cols-1] = 1;
        checkConnection();
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "pipeconnect"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("rows") public int getRows() { return rows; }
    @JsonProperty("cols") public int getCols() { return cols; }
    @JsonProperty("pipes") public int[][] getPipes() { return pipes; }
    @JsonProperty("connected") public boolean[][] getConnected() { return connected; }

    public boolean rotate(int r, int c) {
        if (gameOver || r < 0 || r >= rows || c < 0 || c >= cols) return false;
        lastMoveAt = System.currentTimeMillis();
        pipes[r][c] = pipes[r][c] % 4 + 1; // 旋转到下一方向
        checkConnection();
        if (connected[rows-1][cols-1]) { won = true; gameOver = true; score = 100; }
        return true;
    }

    private void checkConnection() {
        for (int r = 0; r < rows; r++) Arrays.fill(connected[r], false);
        if (pipes[0][0] != 0) dfs(0, 0, new boolean[rows][cols]);
    }

    private void dfs(int r, int c, boolean[][] visited) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || pipes[r][c] == 0) return;
        visited[r][c] = true;
        connected[r][c] = true;
        int p = pipes[r][c];
        boolean up = p == 1 || p == 3, down = p == 2 || p == 3, left = p == 1 || p == 4, right = p == 2 || p == 4;
        if (up) dfs(r-1, c, visited);
        if (down) dfs(r+1, c, visited);
        if (left) dfs(r, c-1, visited);
        if (right) dfs(r, c+1, visited);
    }
}
