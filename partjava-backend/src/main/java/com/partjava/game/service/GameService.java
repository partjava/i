package com.partjava.game.service;

import com.partjava.game.model.GameState;
import java.util.Map;

public interface GameService {

    /** 创建新游戏会话 */
    GameState createGame(String gameType, Map<String, Object> config);

    /** 执行操作 */
    GameState makeMove(String gameType, String gameId, String action, Map<String, Object> payload);

    /** 获取当前状态 */
    GameState getState(String gameType, String gameId);

    /** 停止/删除游戏 */
    void stopGame(String gameType, String gameId);

    /** 实时游戏 tick */
    GameState tick(String gameType, String gameId);
}
