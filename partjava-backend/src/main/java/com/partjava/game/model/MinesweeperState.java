package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Random;

public class MinesweeperState implements GameState {
    private final String gameId;
    private final int rows, cols, mines;
    private final int[][] board;   // -1=地雷, 0-8=周围地雷数
    private final boolean[][] revealed;
    private final boolean[][] flagged;
    private boolean gameOver, won;
    private int revealedCount;
    private int score;
    private long lastMoveAt;
    private boolean firstMove = true;
    private static final Random RNG = new Random();

    public MinesweeperState(String gameId, int rows, int cols, int mines) {
        this.gameId = gameId;
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.board = new int[rows][cols];
        this.revealed = new boolean[rows][cols];
        this.flagged = new boolean[rows][cols];
        this.lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "minesweeper"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }

    @JsonProperty("rows") public int getRows() { return rows; }
    @JsonProperty("cols") public int getCols() { return cols; }
    @JsonProperty("mines") public int getMines() { return mines; }
    @JsonProperty("board") public int[][] getBoard() { return board; }
    @JsonProperty("revealed") public boolean[][] getRevealed() { return revealed; }
    @JsonProperty("flagged") public boolean[][] getFlagged() { return flagged; }
    @JsonProperty("revealedCount") public int getRevealedCount() { return revealedCount; }
    @JsonProperty("firstMove") public boolean isFirstMove() { return firstMove; }

    public void setGameOver(boolean v) { this.gameOver = v; }
    public void setWon(boolean v) { this.won = v; }

    /** 生成地雷（确保第一次点击位置安全） */
    private void generateMines(int safeR, int safeC) {
        int placed = 0;
        while (placed < mines) {
            int r = RNG.nextInt(rows);
            int c = RNG.nextInt(cols);
            // 保证第一次点击位置及其周围安全
            if (board[r][c] == -1) continue;
            if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
            board[r][c] = -1;
            placed++;
        }
        // 计算数字
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (board[r][c] == -1) continue;
                int count = 0;
                for (int dr = -1; dr <= 1; dr++)
                    for (int dc = -1; dc <= 1; dc++) {
                        int nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] == -1) count++;
                    }
                board[r][c] = count;
            }
        }
        firstMove = false;
    }

    /** 点开格子 */
    public boolean reveal(int r, int c) {
        if (gameOver || r < 0 || r >= rows || c < 0 || c >= cols) return false;
        if (revealed[r][c] || flagged[r][c]) return false;
        lastMoveAt = System.currentTimeMillis();

        if (firstMove) generateMines(r, c);

        if (board[r][c] == -1) {
            revealed[r][c] = true;
            gameOver = true;
            return true;
        }

        revealFlood(r, c);
        checkWin();
        return true;
    }

    /** 标注/取消标注地雷 */
    public boolean toggleFlag(int r, int c) {
        if (gameOver || r < 0 || r >= rows || c < 0 || c >= cols) return false;
        if (revealed[r][c]) return false;
        flagged[r][c] = !flagged[r][c];
        lastMoveAt = System.currentTimeMillis();
        return true;
    }

    private void revealFlood(int r, int c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (revealed[r][c] || flagged[r][c]) return;
        revealed[r][c] = true;
        revealedCount++;
        if (board[r][c] == 0) {
            for (int dr = -1; dr <= 1; dr++)
                for (int dc = -1; dc <= 1; dc++)
                    revealFlood(r + dr, c + dc);
        }
    }

    private void checkWin() {
        int totalSafe = rows * cols - mines;
        if (revealedCount >= totalSafe) {
            won = true;
            gameOver = true;
            score = Math.max(100, (rows * cols * 10) / (int) Math.max(1, System.currentTimeMillis() / 1000));
        }
    }
}
