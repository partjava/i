package com.partjava.game.engine.realtime;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.BreakoutState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class BreakoutEngine implements GameEngine<BreakoutState> {

    @Override
    public BreakoutState createGame(String gameId, Map<String, Object> config) {
        return new BreakoutState(gameId);
    }

    @Override
    public BreakoutState makeMove(String gameId, BreakoutState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        switch (action) {
            case "move": {
                Object x = payload != null ? payload.get("x") : null;
                if (x instanceof Number) state.movePaddle(((Number) x).intValue());
                break;
            }
            case "launch": state.launch(); break;
        }
        return state;
    }

    @Override
    public BreakoutState tick(String gameId, BreakoutState state) {
        state.tick();
        return state;
    }

    @Override public boolean isGameOver(BreakoutState state) { return state.isGameOver(); }
    @Override public int getScore(BreakoutState state) { return state.getScore(); }
    @Override public String getGameType() { return "breakout"; }
    @Override public boolean isRealtime() { return true; }
}
