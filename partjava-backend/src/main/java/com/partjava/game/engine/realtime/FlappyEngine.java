package com.partjava.game.engine.realtime;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.FlappyState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class FlappyEngine implements GameEngine<FlappyState> {

    @Override
    public FlappyState createGame(String gameId, Map<String, Object> config) {
        return new FlappyState(gameId);
    }

    @Override
    public FlappyState makeMove(String gameId, FlappyState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("jump".equals(action)) state.jump();
        return state;
    }

    @Override
    public FlappyState tick(String gameId, FlappyState state) {
        state.tick();
        return state;
    }

    @Override public boolean isGameOver(FlappyState state) { return state.isGameOver(); }
    @Override public int getScore(FlappyState state) { return state.getScore(); }
    @Override public String getGameType() { return "flappy"; }
    @Override public boolean isRealtime() { return true; }
}
