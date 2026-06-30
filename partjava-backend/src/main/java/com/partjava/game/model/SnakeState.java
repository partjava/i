package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class SnakeState implements GameState {
    private final String gameId;
    private final int width = 20, height = 20;
    private final List<int[]> snake; // body segments [x,y]
    private int foodX, foodY;
    private int dx = 1, dy = 0;
    private int nextDx = 1, nextDy = 0;
    private int score;
    private boolean gameOver, won;
    private long lastMoveAt;
    private final Random rng = new Random();

    public SnakeState(String gameId) {
        this.gameId = gameId;
        this.snake = new ArrayList<>();
        snake.add(new int[]{5, 10});
        snake.add(new int[]{4, 10});
        snake.add(new int[]{3, 10});
        spawnFood();
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "snake"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("width") public int getWidth() { return width; }
    @JsonProperty("height") public int getHeight() { return height; }
    @JsonProperty("snake") public List<int[]> getSnake() { return snake; }
    @JsonProperty("foodX") public int getFoodX() { return foodX; }
    @JsonProperty("foodY") public int getFoodY() { return foodY; }
    @JsonProperty("dx") public int getDx() { return dx; }
    @JsonProperty("dy") public int getDy() { return dy; }

    public void setDirection(int ndx, int ndy) {
        if (ndx == -dx && ndy == -dy) return; // 不能反向
        nextDx = ndx; nextDy = ndy;
    }

    /** 游戏 tick — 移动一步 */
    public boolean tick() {
        if (gameOver) return false;
        dx = nextDx; dy = nextDy;
        int headX = snake.get(0)[0] + dx;
        int headY = snake.get(0)[1] + dy;
        if (headX < 0 || headX >= width || headY < 0 || headY >= height) { gameOver = true; return false; }
        for (int[] seg : snake) if (seg[0] == headX && seg[1] == headY) { gameOver = true; return false; }
        snake.add(0, new int[]{headX, headY});
        if (headX == foodX && headY == foodY) {
            score += 10;
            if (snake.size() >= width * height) { won = true; gameOver = true; return false; }
            spawnFood();
        } else {
            snake.remove(snake.size() - 1);
        }
        lastMoveAt = System.currentTimeMillis();
        return true;
    }

    private void spawnFood() {
        do {
            foodX = rng.nextInt(width);
            foodY = rng.nextInt(height);
        } while (isOnSnake(foodX, foodY));
    }

    private boolean isOnSnake(int x, int y) {
        for (int[] s : snake) if (s[0] == x && s[1] == y) return true;
        return false;
    }
}
