package com.partjava.game.service.impl;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.GameState;
import com.partjava.game.service.GameService;
import com.partjava.game.store.GameSessionStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameServiceImpl implements GameService {

    private final Map<String, GameEngine<?>> engines = new ConcurrentHashMap<>();
    private final GameSessionStore store;

    public GameServiceImpl(GameSessionStore store, List<GameEngine<?>> engineList) {
        this.store = store;
        for (GameEngine<?> engine : engineList) {
            engines.put(engine.getGameType().toLowerCase(), engine);
        }
    }

    private GameEngine<?> getEngine(String gameType) {
        GameEngine<?> engine = engines.get(gameType.toLowerCase());
        if (engine == null) {
            throw new IllegalArgumentException("未知游戏类型: " + gameType);
        }
        return engine;
    }

    @Override
    public GameState createGame(String gameType, Map<String, Object> config) {
        GameEngine<?> engine = getEngine(gameType);
        String gameId = java.util.UUID.randomUUID().toString().substring(0, 8);
        GameState state = engine.createGame(gameId, config);
        store.save(gameId, state);
        return state;
    }

    @Override
    @SuppressWarnings("unchecked")
    public GameState makeMove(String gameType, String gameId, String action, Map<String, Object> payload) {
        GameEngine<GameState> engine = (GameEngine<GameState>) getEngine(gameType);
        GameState state = store.get(gameId);
        if (state == null) {
            throw new IllegalArgumentException("游戏不存在或已结束: " + gameId);
        }
        GameState newState = engine.makeMove(gameId, state, action, payload);
        store.save(gameId, newState);
        return newState;
    }

    @Override
    public GameState getState(String gameType, String gameId) {
        GameState state = store.get(gameId);
        if (state == null) {
            throw new IllegalArgumentException("游戏不存在: " + gameId);
        }
        return state;
    }

    @Override
    public void stopGame(String gameType, String gameId) {
        store.remove(gameId);
    }

    @Override
    @SuppressWarnings("unchecked")
    public GameState tick(String gameType, String gameId) {
        GameEngine<GameState> engine = (GameEngine<GameState>) getEngine(gameType);
        GameState state = store.get(gameId);
        if (state == null || state.isGameOver()) {
            return null;
        }
        GameState newState = engine.tick(gameId, state);
        store.save(gameId, newState);
        return newState;
    }
}
