package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class WordSearchState implements GameState {
    private final String gameId;
    private final int size = 12;
    private final char[][] grid;
    private final List<String> words;
    private final boolean[][] found;
    private int foundCount;
    private boolean gameOver, won;
    private long lastMoveAt;
    private static final String[] WORD_LIST = {"JAVA", "PYTHON", "SPRING", "REACT", "RUST", "GO", "SWIFT", "KOTLIN", "TYPESCRIPT"};

    public WordSearchState(String gameId) {
        this.gameId = gameId;
        this.grid = new char[size][size];
        this.found = new boolean[size][size];
        // 初始化网格
        for (int r = 0; r < size; r++) for (int c = 0; c < size; c++) grid[r][c] = (char)('A' + new Random().nextInt(26));
        // 放置单词
        Random rng = new Random();
        this.words = new ArrayList<>();
        List<String> available = new ArrayList<>(Arrays.asList(WORD_LIST));
        Collections.shuffle(available, rng);
        int placed = 0;
        for (String word : available) {
            if (placed >= 6) break;
            for (int attempt = 0; attempt < 50; attempt++) {
                int r = rng.nextInt(size), c = rng.nextInt(size);
                int dr = rng.nextInt(3) - 1, dc = rng.nextInt(3) - 1;
                if (dr == 0 && dc == 0) continue;
                int endR = r + dr * (word.length() - 1), endC = c + dc * (word.length() - 1);
                if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;
                boolean ok = true;
                for (int i = 0; i < word.length(); i++) {
                    int nr = r + dr * i, nc = c + dc * i;
                    if (grid[nr][nc] != word.charAt(i) && Character.isLetter(grid[nr][nc])) { ok = false; break; }
                }
                if (!ok) continue;
                for (int i = 0; i < word.length(); i++) grid[r + dr * i][c + dc * i] = word.charAt(i);
                words.add(word);
                placed++;
                break;
            }
        }
        lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "wordsearch"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return foundCount; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("size") public int getSize() { return size; }
    @JsonProperty("grid") public char[][] getGrid() { return grid; }
    @JsonProperty("words") public List<String> getWords() { return words; }
    @JsonProperty("found") public boolean[][] getFound() { return found; }
    @JsonProperty("foundCount") public int getFoundCount() { return foundCount; }

    public boolean select(int r1, int c1, int r2, int c2) {
        if (gameOver) return false;
        lastMoveAt = System.currentTimeMillis();
        int dr = Integer.signum(r2 - r1), dc = Integer.signum(c2 - c1);
        if (dr == 0 && dc == 0) return false;
        int len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < len; i++) sb.append(grid[r1 + dr * i][c1 + dc * i]);
        String selected = sb.toString();
        for (String word : words) {
            if (word.equalsIgnoreCase(selected) && !isWordFound(word)) {
                for (int i = 0; i < len; i++) found[r1 + dr * i][c1 + dc * i] = true;
                foundCount++;
                if (foundCount >= words.size()) { won = true; gameOver = true; }
                return true;
            }
        }
        return false;
    }

    private boolean isWordFound(String word) { return false; } // simplified
}
