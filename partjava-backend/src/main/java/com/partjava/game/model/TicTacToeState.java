package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Arrays;

/**
 * 井字棋游戏状态
 */
public class TicTacToeState implements GameState {
    private final String gameId;
    private final String[][] board; // "X", "O", or null
    private String currentPlayer = "X";
    private String winner;
    private boolean gameOver;
    private int score;
    private long lastMoveAt;

    public TicTacToeState(String gameId) {
        this.gameId = gameId;
        this.board = new String[3][3];
        this.lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "tictactoe"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return winner; }
    @Override public long getLastMoveAt() { return lastMoveAt; }

    @JsonProperty("board") public String[][] getBoard() { return board; }
    @JsonProperty("currentPlayer") public String getCurrentPlayer() { return currentPlayer; }

    public void setLastMoveAt(long t) { this.lastMoveAt = t; }
    public void setGameOver(boolean v) { this.gameOver = v; }
    public void setWinner(String w) { this.winner = w; }
    public void setScore(int s) { this.score = s; }

    /** 尝试落子，返回 true 如果成功 */
    public boolean place(int row, int col) {
        if (row < 0 || row > 2 || col < 0 || col > 2) return false;
        if (board[row][col] != null || gameOver) return false;
        board[row][col] = currentPlayer;
        lastMoveAt = System.currentTimeMillis();

        // 检查胜利
        if (checkWin(row, col, currentPlayer)) {
            winner = currentPlayer;
            gameOver = true;
            score = currentPlayer.equals("X") ? 1 : 0;
            return true;
        }

        // 检查平局
        boolean full = true;
        for (String[] r : board) for (String c : r) if (c == null) full = false;
        if (full) {
            gameOver = true;
            winner = null; // 平局
            score = 0;
            return true;
        }

        currentPlayer = currentPlayer.equals("X") ? "O" : "X";
        return true;
    }

    private boolean checkWin(int row, int col, String player) {
        // 行
        if (board[row][0] == player && board[row][1] == player && board[row][2] == player) return true;
        // 列
        if (board[0][col] == player && board[1][col] == player && board[2][col] == player) return true;
        // 对角线
        if (row == col && board[0][0] == player && board[1][1] == player && board[2][2] == player) return true;
        if (row + col == 2 && board[0][2] == player && board[1][1] == player && board[2][0] == player) return true;
        return false;
    }
}
