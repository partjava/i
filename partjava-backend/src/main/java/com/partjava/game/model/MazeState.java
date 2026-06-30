package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class MazeState implements GameState {
    private final String gameId;
    private final int size = 15;
    private final int[][] maze; // 0=path, 1=wall
    private int playerR, playerC;
    private final int exitR, exitC;
    private int score;
    private int moves;
    private boolean gameOver, won;
    private long lastMoveAt;

    public MazeState(String gameId) {
        this.gameId = gameId;
        this.maze = new int[size][size];
        generateMaze();
        this.playerR = 1; this.playerC = 1;
        this.exitR = size - 2; this.exitC = size - 2;
        maze[exitR][exitC] = 2; // exit marker
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "maze"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return Math.max(0, 1000 - moves); }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("size") public int getSize() { return size; }
    @JsonProperty("maze") public int[][] getMaze() { return maze; }
    @JsonProperty("playerR") public int getPlayerR() { return playerR; }
    @JsonProperty("playerC") public int getPlayerC() { return playerC; }
    @JsonProperty("exitR") public int getExitR() { return exitR; }
    @JsonProperty("exitC") public int getExitC() { return exitC; }
    @JsonProperty("moves") public int getMoves() { return moves; }

    private void generateMaze() {
        for (int r = 0; r < size; r++) for (int c = 0; c < size; c++) maze[r][c] = 1;
        carve(1, 1);
    }

    private void carve(int r, int c) {
        maze[r][c] = 0;
        List<int[]> dirs = Arrays.asList(new int[]{-2,0}, new int[]{2,0}, new int[]{0,-2}, new int[]{0,2});
        Collections.shuffle(dirs, new Random());
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr > 0 && nr < size - 1 && nc > 0 && nc < size - 1 && maze[nr][nc] == 1) {
                maze[r + d[0]/2][c + d[1]/2] = 0;
                carve(nr, nc);
            }
        }
    }

    public boolean move(int dr, int dc) {
        if (gameOver) return false;
        int nr = playerR + dr, nc = playerC + dc;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size || maze[nr][nc] == 1) return false;
        playerR = nr; playerC = nc;
        moves++;
        lastMoveAt = System.currentTimeMillis();
        if (playerR == exitR && playerC == exitC) { won = true; gameOver = true; score = getScore(); }
        return true;
    }
}
