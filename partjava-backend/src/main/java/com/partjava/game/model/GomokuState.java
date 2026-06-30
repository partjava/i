package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GomokuState implements GameState {
    private final String gameId;
    private final int[][] board; // 0=empty, 1=black, 2=white
    private int currentPlayer = 1;
    private String winner;
    private boolean gameOver;
    private int score;
    private long lastMoveAt;
    private int moveCount;

    public GomokuState(String gameId) {
        this.gameId = gameId;
        this.board = new int[15][15];
        this.lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "gomoku"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return winner; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("board") public int[][] getBoard() { return board; }
    @JsonProperty("currentPlayer") public int getCurrentPlayer() { return currentPlayer; }
    @JsonProperty("moveCount") public int getMoveCount() { return moveCount; }
    public void setGameOver(boolean v) { this.gameOver = v; }

    /** 落子，返回 true 如果成功 */
    public boolean place(int row, int col, int player) {
        if (row < 0 || row >= 15 || col < 0 || col >= 15) return false;
        if (board[row][col] != 0 || gameOver || player != currentPlayer) return false;
        board[row][col] = player;
        moveCount++;
        lastMoveAt = System.currentTimeMillis();

        if (checkWin(row, col, player)) {
            winner = player == 1 ? "black" : "white";
            gameOver = true;
            score = player == 1 ? 1 : 0;
        } else if (moveCount >= 225) {
            gameOver = true;
            winner = null; // 平局
        } else {
            currentPlayer = player == 1 ? 2 : 1;
        }
        return true;
    }

    private boolean checkWin(int row, int col, int player) {
        int[][] dirs = {{1,0},{0,1},{1,1},{1,-1}};
        for (int[] d : dirs) {
            int count = 1;
            for (int sign = -1; sign <= 1; sign += 2) {
                for (int step = 1; step <= 4; step++) {
                    int r = row + sign * step * d[0];
                    int c = col + sign * step * d[1];
                    if (r >= 0 && r < 15 && c >= 0 && c < 15 && board[r][c] == player) count++;
                    else break;
                }
            }
            if (count >= 5) return true;
        }
        return false;
    }
}
