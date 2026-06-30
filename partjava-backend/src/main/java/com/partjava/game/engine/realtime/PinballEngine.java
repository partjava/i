package com.partjava.game.engine.realtime;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.PinballState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class PinballEngine implements GameEngine<PinballState> {

    @Override
    public PinballState createGame(String gameId, Map<String, Object> config) {
        return new PinballState(gameId);
    }

    @Override
    public PinballState makeMove(String gameId, PinballState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("move".equals(action) && payload != null) {
            Object lx = payload.get("lx"), rx = payload.get("rx");
            if (lx instanceof Number && rx instanceof Number)
                state.movePaddle(((Number) lx).intValue(), ((Number) rx).intValue());
        }
        return state;
    }

    @Override
    public PinballState tick(String gameId, PinballState state) { state.tick(); return state; }
    @Override public boolean isGameOver(PinballState state) { return state.isGameOver(); }
    @Override public int getScore(PinballState state) { return state.getScore(); }
    @Override public String getGameType() { return "pinball"; }
    @Override public boolean isRealtime() { return true; }
}
