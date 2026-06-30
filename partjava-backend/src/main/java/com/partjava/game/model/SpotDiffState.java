package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class SpotDiffState implements GameState {
    private final String gameId;
    private final int size = 8;
    private final int[][] image1, image2;
    private final boolean[][] found;
    private final List<int[]> differences;
    private int foundCount;
    private boolean gameOver, won;
    private long lastMoveAt;

    public SpotDiffState(String gameId) {
        this.gameId = gameId;
        this.image1 = new int[size][size];
        this.image2 = new int[size][size];
        this.found = new boolean[size][size];
        this.differences = new ArrayList<>();
        Random rng = new Random();
        for (int r = 0; r < size; r++) for (int c = 0; c < size; c++) image1[r][c] = rng.nextInt(6) + 1;
        for (int r = 0; r < size; r++) System.arraycopy(image1[r], 0, image2[r], 0, size);
        int diffCount = 5;
        for (int i = 0; i < diffCount; i++) {
            int r, c;
            do { r = rng.nextInt(size); c = rng.nextInt(size); }
            while (image2[r][c] != image1[r][c]);
            image2[r][c] = (image1[r][c] + rng.nextInt(5) + 1) % 6 + 1;
            differences.add(new int[]{r, c});
        }
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "spotdiff"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return foundCount; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("size") public int getSize() { return size; }
    @JsonProperty("image1") public int[][] getImage1() { return image1; }
    @JsonProperty("image2") public int[][] getImage2() { return image2; }
    @JsonProperty("found") public boolean[][] getFound() { return found; }
    @JsonProperty("foundCount") public int getFoundCount() { return foundCount; }
    @JsonProperty("totalDiffs") public int getTotalDiffs() { return differences.size(); }

    public boolean check(int r, int c) {
        if (gameOver || r < 0 || r >= size || c < 0 || c >= size || found[r][c]) return false;
        lastMoveAt = System.currentTimeMillis();
        if (image1[r][c] != image2[r][c]) {
            found[r][c] = true;
            foundCount++;
            if (foundCount >= differences.size()) { won = true; gameOver = true; }
            return true;
        }
        return false;
    }
}
