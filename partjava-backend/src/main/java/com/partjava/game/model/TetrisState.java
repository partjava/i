package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class TetrisState implements GameState {
    private final String gameId;
    private final int cols = 10, rows = 20;
    private final int[][] board;
    private Tetromino current, next;
    private int score;
    private int level = 1;
    private int lines;
    private boolean gameOver;
    private long lastMoveAt;
    private final Random rng = new Random();

    private static final int[][][] SHAPES = {
        {{1,1,1,1}},                          // I
        {{1,1},{1,1}},                        // O
        {{1,1,1},{0,1,0}},                    // T
        {{1,1,1},{1,0,0}},                    // L
        {{1,1,1},{0,0,1}},                    // J
        {{1,1,0},{0,1,1}},                    // S
        {{0,1,1},{1,1,0}}                     // Z
    };

    public TetrisState(String gameId) {
        this.gameId = gameId;
        this.board = new int[rows][cols];
        this.current = new Tetromino(SHAPES[rng.nextInt(SHAPES.length)], 3, 0);
        this.next = new Tetromino(SHAPES[rng.nextInt(SHAPES.length)], 3, 0);
        this.lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "tetris"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("board") public int[][] getBoard() { return board; }
    @JsonProperty("cols") public int getCols() { return cols; }
    @JsonProperty("rows") public int getRows() { return rows; }
    @JsonProperty("current") public Tetromino getCurrent() { return current; }
    @JsonProperty("next") public Tetromino getNext() { return next; }
    @JsonProperty("level") public int getLevel() { return level; }
    @JsonProperty("lines") public int getLines() { return lines; }

    public boolean moveLeft() { return movePiece(-1, 0); }
    public boolean moveRight() { return movePiece(1, 0); }
    public boolean moveDown() { return movePiece(0, 1); }
    public void rotate() {
        int[][] rotated = rotateMatrix(current.shape);
        if (canPlace(rotated, current.x, current.y))
            current.shape = rotated;
    }
    public void hardDrop() {
        while (movePiece(0, 1)) {}
    }

    private boolean movePiece(int dx, int dy) {
        if (canPlace(current.shape, current.x + dx, current.y + dy)) {
            current.x += dx; current.y += dy;
            return true;
        }
        return false;
    }

    public boolean tick() {
        if (gameOver) return false;
        if (!moveDown()) {
            lockPiece();
            clearLines();
            current = next;
            next = new Tetromino(SHAPES[rng.nextInt(SHAPES.length)], 3, 0);
            if (!canPlace(current.shape, current.x, current.y)) { gameOver = true; return false; }
        }
        lastMoveAt = System.currentTimeMillis();
        return true;
    }

    private void lockPiece() {
        for (int r = 0; r < current.shape.length; r++)
            for (int c = 0; c < current.shape[0].length; c++)
                if (current.shape[r][c] != 0)
                    board[current.y + r][current.x + c] = 1;
    }

    private void clearLines() {
        int cleared = 0;
        for (int r = rows - 1; r >= 0; r--) {
            boolean full = true;
            for (int c = 0; c < cols; c++) if (board[r][c] == 0) { full = false; break; }
            if (full) {
                for (int r2 = r; r2 > 0; r2--) System.arraycopy(board[r2 - 1], 0, board[r2], 0, cols);
                Arrays.fill(board[0], 0);
                cleared++;
                r++; // 重新检查同一行
            }
        }
        if (cleared > 0) {
            lines += cleared;
            score += cleared * 100 * level;
            level = 1 + lines / 10;
        }
    }

    private boolean canPlace(int[][] shape, int x, int y) {
        for (int r = 0; r < shape.length; r++)
            for (int c = 0; c < shape[0].length; c++)
                if (shape[r][c] != 0) {
                    int bx = x + c, by = y + r;
                    if (bx < 0 || bx >= cols || by >= rows) return false;
                    if (by >= 0 && board[by][bx] != 0) return false;
                }
        return true;
    }

    private int[][] rotateMatrix(int[][] m) {
        int r = m.length, c = m[0].length;
        int[][] rotated = new int[c][r];
        for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) rotated[j][r - 1 - i] = m[i][j];
        return rotated;
    }

    public static class Tetromino {
        public int[][] shape;
        public int x, y;
        Tetromino(int[][] shape, int x, int y) { this.shape = shape; this.x = x; this.y = y; }
    }
}
