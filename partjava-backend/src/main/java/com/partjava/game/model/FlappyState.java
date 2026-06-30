package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class FlappyState implements GameState {
    private final String gameId;
    private final int width = 400, height = 600;
    private float birdY = 250, birdVy = 0;
    private final float gravity = 0.5f;
    private final List<Pipe> pipes = new ArrayList<>();
    private int score;
    private boolean gameOver;
    private int frame;
    private long lastMoveAt;
    private final Random rng = new Random();

    public FlappyState(String gameId) {
        this.gameId = gameId;
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "flappy"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("width") public int getWidth() { return width; }
    @JsonProperty("height") public int getHeight() { return height; }
    @JsonProperty("birdY") public float getBirdY() { return birdY; }
    @JsonProperty("birdVy") public float getBirdVy() { return birdVy; }
    @JsonProperty("pipes") public List<Pipe> getPipes() { return pipes; }

    public void jump() { if (!gameOver) birdVy = -8; }

    public boolean tick() {
        if (gameOver) return false;
        lastMoveAt = System.currentTimeMillis();
        frame++;
        birdVy += gravity;
        birdY += birdVy;
        if (birdY < 0 || birdY > height) { gameOver = true; return false; }
        if (frame % 80 == 0) {
            int gap = 150;
            int pipeY = 100 + rng.nextInt(height - 300);
            pipes.add(new Pipe(width, pipeY, gap));
        }
        List<Pipe> toRemove = new ArrayList<>();
        for (Pipe p : pipes) {
            p.x -= 4;
            if (p.x + 50 < 0) toRemove.add(p);
            if (!p.passed && p.x + 50 < 100) { p.passed = true; score++; }
            if (birdX() + 20 > p.x && birdX() < p.x + 50 &&
                (birdY < p.pipeY || birdY + 20 > p.pipeY + p.gap)) { gameOver = true; return false; }
        }
        pipes.removeAll(toRemove);
        return true;
    }

    private int birdX() { return 80; }

    public static class Pipe {
        public int x, pipeY, gap;
        public boolean passed;
        Pipe(int x, int pipeY, int gap) { this.x = x; this.pipeY = pipeY; this.gap = gap; }
    }
}
