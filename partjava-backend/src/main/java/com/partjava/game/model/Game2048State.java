package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Arrays;
import java.util.Random;

public class Game2048State implements GameState {
    private final String gameId;
    private final int[][] grid;
    private int score;
    private boolean gameOver;
    private boolean won;
    private long lastMoveAt;
    private static final Random RNG = new Random();

    public Game2048State(String gameId) {
        this.gameId = gameId;
        this.grid = new int[4][4];
        this.lastMoveAt = System.currentTimeMillis();
        spawnTile();
        spawnTile();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "2048"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }

    @JsonProperty("grid") public int[][] getGrid() { return grid; }
    @JsonProperty("won") public boolean hasWon() { return won; }

    public void setGameOver(boolean v) { this.gameOver = v; }

    private void spawnTile() {
        int empty = 0;
        for (int[] r : grid) for (int c : r) if (c == 0) empty++;
        if (empty == 0) return;
        int idx = RNG.nextInt(empty);
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                if (grid[i][j] == 0) {
                    if (idx-- == 0) {
                        grid[i][j] = RNG.nextDouble() < 0.9 ? 2 : 4;
                        return;
                    }
                }
            }
        }
    }

    public boolean slide(String direction) {
        if (gameOver) return false;
        lastMoveAt = System.currentTimeMillis();
        boolean moved = false;
        int[][] old = clone(grid);
        switch (direction.toLowerCase()) {
            case "left": moved = slideLeft(); break;
            case "right": moved = slideRight(); break;
            case "up": moved = slideUp(); break;
            case "down": moved = slideDown(); break;
        }
        if (moved) {
            spawnTile();
            if (!canMove()) gameOver = true;
            if (hasWon()) won = true;
        }
        return moved;
    }

    private boolean slideLeft() {
        boolean moved = false;
        for (int i = 0; i < 4; i++) {
            int[] row = compact(grid[i]);
            for (int j = 0; j < 3; j++) {
                if (row[j] != 0 && row[j] == row[j+1]) {
                    row[j] *= 2;
                    score += row[j];
                    if (row[j] == 2048) won = true;
                    row[j+1] = 0;
                }
            }
            row = compact(row);
            if (!Arrays.equals(grid[i], row)) moved = true;
            grid[i] = row;
        }
        return moved;
    }

    private boolean slideRight() {
        boolean moved = false;
        for (int i = 0; i < 4; i++) {
            reverse(grid[i]);
            int[] row = compact(grid[i]);
            for (int j = 0; j < 3; j++) {
                if (row[j] != 0 && row[j] == row[j+1]) {
                    row[j] *= 2; score += row[j];
                    if (row[j] == 2048) won = true;
                    row[j+1] = 0;
                }
            }
            row = compact(row);
            reverse(row);
            if (!Arrays.equals(grid[i], row)) moved = true;
            grid[i] = row;
        }
        return moved;
    }

    private boolean slideUp() {
        transpose();
        boolean m = slideLeft();
        transpose();
        return m;
    }

    private boolean slideDown() {
        transpose();
        boolean m = slideRight();
        transpose();
        return m;
    }

    private int[] compact(int[] line) {
        int[] r = new int[4];
        int idx = 0;
        for (int v : line) if (v != 0) r[idx++] = v;
        return r;
    }

    private void reverse(int[] arr) {
        for (int i = 0; i < 2; i++) { int t = arr[i]; arr[i] = arr[3-i]; arr[3-i] = t; }
    }

    private void transpose() {
        for (int i = 0; i < 4; i++) for (int j = i+1; j < 4; j++) {
            int t = grid[i][j]; grid[i][j] = grid[j][i]; grid[j][i] = t;
        }
    }

    private int[][] clone(int[][] src) {
        int[][] dst = new int[4][4];
        for (int i = 0; i < 4; i++) dst[i] = src[i].clone();
        return dst;
    }

    private boolean canMove() {
        for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++) {
            if (grid[i][j] == 0) return true;
            if (j < 3 && grid[i][j] == grid[i][j+1]) return true;
            if (i < 3 && grid[i][j] == grid[i+1][j]) return true;
        }
        return false;
    }
}
