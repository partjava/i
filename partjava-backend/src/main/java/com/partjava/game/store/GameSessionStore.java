package com.partjava.game.store;

import com.partjava.game.model.GameState;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

/**
 * 游戏会话存储 — 内存管理所有活跃游戏的状态和定时任务
 */
@Component
public class GameSessionStore {

    private final ConcurrentHashMap<String, GameState> sessions = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, ScheduledFuture<?>> loops = new ConcurrentHashMap<>();

    public void save(String gameId, GameState state) {
        sessions.put(gameId, state);
    }

    public GameState get(String gameId) {
        return sessions.get(gameId);
    }

    public void remove(String gameId) {
        sessions.remove(gameId);
        cancelLoop(gameId);
    }

    public boolean exists(String gameId) {
        return sessions.containsKey(gameId);
    }

    public void registerLoop(String gameId, ScheduledFuture<?> future) {
        loops.put(gameId, future);
    }

    public void cancelLoop(String gameId) {
        ScheduledFuture<?> f = loops.remove(gameId);
        if (f != null && !f.isDone()) {
            f.cancel(false);
        }
    }

    public int activeCount() {
        return sessions.size();
    }
}
