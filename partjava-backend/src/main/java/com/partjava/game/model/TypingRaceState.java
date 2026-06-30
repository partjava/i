package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class TypingRaceState implements GameState {
    private final String gameId;
    private static final String[] WORDS = {"abstract", "boolean", "break", "byte", "case", "catch", "class", "continue",
        "default", "do", "double", "else", "extends", "final", "finally", "float", "for", "if", "implements",
        "import", "instanceof", "int", "interface", "long", "native", "new", "package", "private", "protected",
        "public", "return", "short", "static", "strictfp", "super", "switch", "synchronized", "this", "throw",
        "throws", "transient", "try", "void", "volatile", "while"};
    private final List<String> words;
    private int currentIndex;
    private int correct;
    private int wrong;
    private int score;
    private boolean gameOver;
    private long startTime;
    private long lastMoveAt;

    public TypingRaceState(String gameId) {
        this.gameId = gameId;
        this.words = new ArrayList<>(Arrays.asList(WORDS));
        Collections.shuffle(words, new Random());
        this.startTime = System.currentTimeMillis();
        this.lastMoveAt = startTime;
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "typingrace"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("currentWord") public String getCurrentWord() {
        return currentIndex < words.size() ? words.get(currentIndex) : null;
    }
    @JsonProperty("currentIndex") public int getCurrentIndex() { return currentIndex; }
    @JsonProperty("total") public int getTotal() { return words.size(); }
    @JsonProperty("correct") public int getCorrect() { return correct; }
    @JsonProperty("wrong") public int getWrong() { return wrong; }
    @JsonProperty("elapsed") public long getElapsed() { return System.currentTimeMillis() - startTime; }

    public boolean type(String word) {
        if (gameOver || currentIndex >= words.size()) return false;
        lastMoveAt = System.currentTimeMillis();
        if (word.trim().equalsIgnoreCase(words.get(currentIndex))) {
            correct++; score += 10;
        } else {
            wrong++;
        }
        currentIndex++;
        if (currentIndex >= words.size()) gameOver = true;
        return true;
    }
}
