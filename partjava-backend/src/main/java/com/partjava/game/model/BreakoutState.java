package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class BreakoutState implements GameState {
    private final String gameId;
    private final int width = 480, height = 640;
    private final int paddleW = 80, paddleH = 12;
    private int paddleX = 200;
    private float ballX = 240, ballY = 400;
    private float ballDx = 3, ballDy = -4;
    private final boolean[][] bricks;
    private final int brickRows = 5, brickCols = 8;
    private int score;
    private int lives = 3;
    private boolean gameOver, won;
    private boolean launched;
    private long lastMoveAt;

    public BreakoutState(String gameId) {
        this.gameId = gameId;
        this.bricks = new boolean[brickRows][brickCols];
        for (int r = 0; r < brickRows; r++) Arrays.fill(bricks[r], true);
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "breakout"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("width") public int getWidth() { return width; }
    @JsonProperty("height") public int getHeight() { return height; }
    @JsonProperty("paddleX") public int getPaddleX() { return paddleX; }
    @JsonProperty("paddleW") public int getPaddleW() { return paddleW; }
    @JsonProperty("ballX") public float getBallX() { return ballX; }
    @JsonProperty("ballY") public float getBallY() { return ballY; }
    @JsonProperty("ballDx") public float getBallDx() { return ballDx; }
    @JsonProperty("ballDy") public float getBallDy() { return ballDy; }
    @JsonProperty("bricks") public boolean[][] getBricks() { return bricks; }
    @JsonProperty("lives") public int getLives() { return lives; }
    @JsonProperty("launched") public boolean isLaunched() { return launched; }

    public void movePaddle(int x) { paddleX = Math.max(0, Math.min(width - paddleW, x)); }

    public void launch() { if (!launched) { launched = true; ballDx = 3; ballDy = -4; }}

    public boolean tick() {
        if (gameOver) return false;
        lastMoveAt = System.currentTimeMillis();
        if (!launched) {
            ballX = paddleX + paddleW / 2f;
            ballY = height - paddleH - 12;
            return true;
        }
        ballX += ballDx; ballY += ballDy;
        if (ballX <= 0 || ballX >= width) ballDx = -ballDx;
        if (ballY <= 0) ballDy = -ballDy;
        if (ballY >= height) {
            lives--;
            if (lives <= 0) { gameOver = true; return false; }
            launched = false;
            return true;
        }
        // 碰撞检测 - 球拍
        if (ballDy > 0 && ballY + 8 >= height - paddleH && ballY + 8 <= height && ballX >= paddleX && ballX <= paddleX + paddleW) {
            ballDy = -ballDy;
            ballDx = (ballX - (paddleX + paddleW / 2f)) * 0.3f;
        }
        // 碰撞检测 - 砖块
        int brickW = width / brickCols, brickH = 20;
        for (int r = 0; r < brickRows; r++) for (int c = 0; c < brickCols; c++) {
            if (!bricks[r][c]) continue;
            int bx = c * brickW, by = r * brickH + 40;
            if (ballX + 4 >= bx && ballX - 4 <= bx + brickW && ballY + 4 >= by && ballY - 4 <= by + brickH) {
                bricks[r][c] = false;
                ballDy = -ballDy;
                score += 10;
                // 检查是否全消
                boolean all = true;
                for (boolean[] row : bricks) for (boolean b : row) if (b) { all = false; break; }
                if (all) { won = true; gameOver = true; }
                return true;
            }
        }
        return true;
    }
}
