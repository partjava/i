package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class SudokuState implements GameState {
    private final String gameId;
    private final int[][] puzzle;  // 题目（固定值）
    private final int[][] board;   // 当前填数
    private final boolean[][] fixed;
    private int score;
    private boolean gameOver, won;
    private long lastMoveAt;

    public SudokuState(String gameId, String difficulty) {
        this.gameId = gameId;
        this.board = new int[9][9];
        this.puzzle = new int[9][9];
        this.fixed = new boolean[9][9];
        this.lastMoveAt = System.currentTimeMillis();
        generate(difficulty);
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "sudoku"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("board") public int[][] getBoard() { return board; }
    @JsonProperty("puzzle") public int[][] getPuzzle() { return puzzle; }
    @JsonProperty("fixed") public boolean[][] getFixed() { return fixed; }

    /** 填入数字 */
    public boolean place(int row, int col, int num) {
        if (row < 0 || row >= 9 || col < 0 || col >= 9 || fixed[row][col]) return false;
        if (num < 0 || num > 9) return false;
        if (num == 0) { board[row][col] = 0; return true; } // 擦除
        if (!isValid(row, col, num)) return false;
        board[row][col] = num;
        lastMoveAt = System.currentTimeMillis();
        checkWin();
        return true;
    }

    private boolean isValid(int row, int col, int num) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num) return false;
            if (board[i][col] == num) return false;
        }
        int br = row / 3 * 3, bc = col / 3 * 3;
        for (int r = br; r < br + 3; r++)
            for (int c = bc; c < bc + 3; c++)
                if (board[r][c] == num) return false;
        return true;
    }

    private void checkWin() {
        for (int r = 0; r < 9; r++)
            for (int c = 0; c < 9; c++)
                if (board[r][c] == 0) return;
        won = true;
        gameOver = true;
        score = Math.max(100, 1000 - (int)(System.currentTimeMillis() / 1000));
    }

    private void generate(String difficulty) {
        solve(board);
        // 复制到 puzzle
        for (int r = 0; r < 9; r++) System.arraycopy(board[r], 0, puzzle[r], 0, 9);
        // 挖空
        int blanks = switch (difficulty != null ? difficulty : "medium") {
            case "easy" -> 30;
            case "hard" -> 50;
            default -> 40; // medium
        };
        Random rng = new Random();
        List<int[]> cells = new ArrayList<>();
        for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) cells.add(new int[]{r, c});
        Collections.shuffle(cells, rng);
        for (int i = 0; i < blanks && i < cells.size(); i++) {
            int[] cell = cells.get(i);
            puzzle[cell[0]][cell[1]] = 0;
            board[cell[0]][cell[1]] = 0;
        }
        // 标记固定格子
        for (int r = 0; r < 9; r++)
            for (int c = 0; c < 9; c++)
                fixed[r][c] = puzzle[r][c] != 0;
    }

    private boolean solve(int[][] b) {
        Random rng = new Random();
        int[] empty = findEmpty(b);
        if (empty == null) return true;
        int r = empty[0], c = empty[1];
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
        Collections.shuffle(nums, rng);
        for (int num : nums) {
            if (isValidPlacement(b, r, c, num)) {
                b[r][c] = num;
                if (solve(b)) return true;
                b[r][c] = 0;
            }
        }
        return false;
    }

    private int[] findEmpty(int[][] b) {
        for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) if (b[r][c] == 0) return new int[]{r, c};
        return null;
    }

    private boolean isValidPlacement(int[][] b, int row, int col, int num) {
        for (int i = 0; i < 9; i++) {
            if (b[row][i] == num) return false;
            if (b[i][col] == num) return false;
        }
        int br = row / 3 * 3, bc = col / 3 * 3;
        for (int r = br; r < br + 3; r++)
            for (int c = bc; c < bc + 3; c++)
                if (b[r][c] == num) return false;
        return true;
    }
}
