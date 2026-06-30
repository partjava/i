package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.MemoryState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class MemoryEngine implements GameEngine<MemoryState> {

    @Override
    public MemoryState createGame(String gameId, Map<String, Object> config) {
        return new MemoryState(gameId);
    }

    @Override
    public MemoryState makeMove(String gameId, MemoryState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if (payload == null) return state;
        switch (action) {
            case "flip": {
                Object idx = payload.get("index");
                if (idx instanceof Number) state.flip(((Number) idx).intValue());
                break;
            }
            case "resetFlip": {
                Object idx = payload.get("index");
                if (idx instanceof Number) state.resetFlip(((Number) idx).intValue());
                break;
            }
        }
        return state;
    }

    @Override public boolean isGameOver(MemoryState state) { return state.isGameOver(); }
    @Override public int getScore(MemoryState state) { return state.getScore(); }
    @Override public String getGameType() { return "memory"; }
}
