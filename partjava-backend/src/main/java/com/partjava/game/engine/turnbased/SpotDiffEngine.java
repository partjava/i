package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.SpotDiffState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class SpotDiffEngine implements GameEngine<SpotDiffState> {

    @Override
    public SpotDiffState createGame(String gameId, Map<String, Object> config) {
        return new SpotDiffState(gameId);
    }

    @Override
    public SpotDiffState makeMove(String gameId, SpotDiffState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("check".equals(action) && payload != null) {
            Object r = payload.get("row"), c = payload.get("col");
            if (r instanceof Number && c instanceof Number)
                state.check(((Number) r).intValue(), ((Number) c).intValue());
        }
        return state;
    }

    @Override public boolean isGameOver(SpotDiffState state) { return state.isGameOver(); }
    @Override public int getScore(SpotDiffState state) { return state.getScore(); }
    @Override public String getGameType() { return "spotdiff"; }
}
