package com.partjava.game.engine.realtime;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.SnakeState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class SnakeEngine implements GameEngine<SnakeState> {

    @Override
    public SnakeState createGame(String gameId, Map<String, Object> config) {
        return new SnakeState(gameId);
    }

    @Override
    public SnakeState makeMove(String gameId, SnakeState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        switch (action.toLowerCase()) {
            case "up": state.setDirection(0, -1); break;
            case "down": state.setDirection(0, 1); break;
            case "left": state.setDirection(-1, 0); break;
            case "right": state.setDirection(1, 0); break;
        }
        return state;
    }

    @Override
    public SnakeState tick(String gameId, SnakeState state) {
        state.tick();
        return state;
    }

    @Override public boolean isGameOver(SnakeState state) { return state.isGameOver(); }
    @Override public int getScore(SnakeState state) { return state.getScore(); }
    @Override public String getGameType() { return "snake"; }
    @Override public boolean isRealtime() { return true; }
}
