package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.PipeConnectState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class PipeConnectEngine implements GameEngine<PipeConnectState> {

    @Override
    public PipeConnectState createGame(String gameId, Map<String, Object> config) {
        return new PipeConnectState(gameId);
    }

    @Override
    public PipeConnectState makeMove(String gameId, PipeConnectState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("rotate".equals(action) && payload != null) {
            Object r = payload.get("row"), c = payload.get("col");
            if (r instanceof Number && c instanceof Number)
                state.rotate(((Number) r).intValue(), ((Number) c).intValue());
        }
        return state;
    }

    @Override public boolean isGameOver(PipeConnectState state) { return state.isGameOver(); }
    @Override public int getScore(PipeConnectState state) { return state.getScore(); }
    @Override public String getGameType() { return "pipeconnect"; }
}
