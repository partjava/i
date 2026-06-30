package com.partjava.game.model;

/**
 * 所有游戏状态的接口，每个游戏的状态必须实现此接口
 */
public interface GameState {
    String getGameId();
    String getGameType();
    boolean isGameOver();
    int getScore();
    String getWinner(); // 返回赢家标识，平局或未结束返回 null
    long getLastMoveAt();
}
