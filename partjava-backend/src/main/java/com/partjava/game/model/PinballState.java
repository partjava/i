package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class PinballState implements GameState {
    private final String gameId;
    private final int width = 400, height = 600;
    private float paddleLX = 160, paddleRX = 240;
    private float ballX = 200, ballY = 500;
    private float ballDx = 2, ballDy = -5;
    private final List<Bumper> bumpers = new ArrayList<>();
    private int score;
    private int lives = 3;
    private boolean gameOver;
    private long lastMoveAt;
    private final Random rng = new Random();

    public PinballState(String gameId) {
        this.gameId = gameId;
        for (int i = 0; i < 5; i++) bumpers.add(new Bumper(50 + rng.nextInt(300), 100 + rng.nextInt(250), 25));
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "pinball"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("width") public int getWidth() { return width; }
    @JsonProperty("height") public int getHeight() { return height; }
    @JsonProperty("ballX") public float getBallX() { return ballX; }
    @JsonProperty("ballY") public float getBallY() { return ballY; }
    @JsonProperty("ballDx") public float getBallDx() { return ballDx; }
    @JsonProperty("ballDy") public float getBallDy() { return ballDy; }
    @JsonProperty("paddleLX") public float getPaddleLX() { return paddleLX; }
    @JsonProperty("paddleRX") public float getPaddleRX() { return paddleRX; }
    @JsonProperty("bumpers") public List<Bumper> getBumpers() { return bumpers; }
    @JsonProperty("lives") public int getLives() { return lives; }

    public boolean tick() {
        if (gameOver) return false;
        lastMoveAt = System.currentTimeMillis();
        ballX += ballDx; ballY += ballDy;
        if (ballX < 10 || ballX > width - 10) ballDx = -ballDx;
        if (ballY < 10) ballDy = -ballDy;
        if (ballY > height) { lives--; if (lives <= 0) { gameOver = true; return false; } reset(); return true; }
        // 左挡板
        if (ballY + 10 > height - 30 && ballX > paddleLX && ballX < paddleLX + 80) { ballDy = -Math.abs(ballDy); ballDx -= 0.5f; }
        // 右挡板
        if (ballY + 10 > height - 30 && ballX > paddleRX && ballX < paddleRX + 80) { ballDy = -Math.abs(ballDy); ballDx += 0.5f; }
        // 弹射器
        for (Bumper b : bumpers) {
            float dx = ballX - b.x, dy = ballY - b.y;
            float dist = (float) Math.sqrt(dx * dx + dy * dy);
            if (dist < b.radius + 8) {
                ballDx = dx / dist * 5; ballDy = dy / dist * 5;
                score += 10;
            }
        }
        return true;
    }

    public void movePaddle(int lx, int rx) { paddleLX = lx; paddleRX = rx; }
    private void reset() { ballX = 200; ballY = 400; ballDx = 2; ballDy = -5; }

    public static class Bumper {
        public int x, y, radius;
        Bumper(int x, int y, int r) { this.x = x; this.y = y; this.radius = r; }
    }
}
