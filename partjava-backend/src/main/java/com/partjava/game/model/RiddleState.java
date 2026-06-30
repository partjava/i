package com.partjava.game.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

public class RiddleState implements GameState {
    private static final List<Riddle> RIDDLES = Arrays.asList(
        new Riddle("什么东西越洗越脏？", "水"),
        new Riddle("什么地方进去容易出来难？", "监狱"),
        new Riddle("什么东西越削越大？", "洞"),
        new Riddle("什么字人人都会念错？", "错"),
        new Riddle("什么东西早晨四条腿，中午两条腿，晚上三条腿？", "人"),
        new Riddle("什么东西你有，别人也有，但从来不用？", "名字"),
        new Riddle("什么东西打破了才能用？", "鸡蛋"),
        new Riddle("什么东西你越给它，它越少？", "水"),
        new Riddle("什么桥不会走人？", "彩虹"),
        new Riddle("什么球不能拍？", "眼球"),
        new Riddle("什么帽不能戴？", "螺丝帽"),
        new Riddle("什么书不能读？", "说明书"),
        new Riddle("什么船不靠岸？", "太空船"),
        new Riddle("什么门关不上？", "球门"),
        new Riddle("什么花不能摘？", "火花")
    );

    private final String gameId;
    private final List<Riddle> riddles;
    private int currentIndex;
    private int score;
    private String lastResult;
    private boolean gameOver, won;
    private long lastMoveAt;

    public RiddleState(String gameId) {
        this.gameId = gameId;
        this.riddles = new ArrayList<>(RIDDLES);
        Collections.shuffle(riddles, new Random());
        this.lastMoveAt = System.currentTimeMillis();
    }

    @Override public String getGameId() { return gameId; }
    @Override public String getGameType() { return "riddle"; }
    @Override public boolean isGameOver() { return gameOver; }
    @Override public int getScore() { return score; }
    @Override public String getWinner() { return won ? "player" : null; }
    @Override public long getLastMoveAt() { return lastMoveAt; }
    @JsonProperty("currentQuestion") public String getCurrentQuestion() {
        return currentIndex < riddles.size() ? riddles.get(currentIndex).question : null;
    }
    @JsonProperty("currentIndex") public int getCurrentIndex() { return currentIndex; }
    @JsonProperty("total") public int getTotal() { return riddles.size(); }
    @JsonProperty("lastResult") public String getLastResult() { return lastResult; }

    public boolean guess(String answer) {
        if (gameOver || answer == null || currentIndex >= riddles.size()) return false;
        lastMoveAt = System.currentTimeMillis();
        Riddle riddle = riddles.get(currentIndex);
        if (answer.trim().equalsIgnoreCase(riddle.answer)) {
            score += 10;
            lastResult = "correct";
        } else {
            lastResult = riddle.answer;
        }
        currentIndex++;
        if (currentIndex >= riddles.size()) { gameOver = true; won = true; }
        return true;
    }

    static class Riddle {
        final String question, answer;
        Riddle(String q, String a) { this.question = q; this.answer = a; }
    }
}
