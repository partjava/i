package com.partjava.game.engine;

import com.partjava.game.model.GameState;
import java.util.Map;

/**
 * 游戏引擎接口 — 所有游戏必须实现此接口
 */
public interface GameEngine<S extends GameState> {

    /** 创建新游戏，返回初始状态 */
    S createGame(String gameId, Map<String, Object> config);

    /** 执行一步操作，返回更新后的状态 */
    S makeMove(String gameId, S state, String action, Map<String, Object> payload);

    /** 判断游戏是否结束 */
    boolean isGameOver(S state);

    /** 计算当前分数 */
    int getScore(S state);

    /** 游戏类型标识（如 "2048", "snake"） */
    String getGameType();

    /** 是否为实时游戏（需要 SSE 推送） */
    default boolean isRealtime() { return false; }

    /** 实时游戏：模拟一步（AI/重力/物理），返回新状态 */
    default S tick(String gameId, S state) {
        return state;
    }
}
