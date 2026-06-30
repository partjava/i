package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.PuzzleState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class PuzzleEngine implements GameEngine<PuzzleState> {

    @Override
    public PuzzleState createGame(String gameId, Map<String, Object> config) {
        return new PuzzleState(gameId);
    }

    @Override
    public PuzzleState makeMove(String gameId, PuzzleState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("slide".equals(action) && payload != null) {
            Object row = payload.get("row"), col = payload.get("col");
            if (row instanceof Number && col instanceof Number) {
                state.slide(((Number) row).intValue(), ((Number) col).intValue());
            }
        }
        return state;
    }

    @Override public boolean isGameOver(PuzzleState state) { return state.isGameOver(); }
    @Override public int getScore(PuzzleState state) { return state.getScore(); }
    @Override public String getGameType() { return "puzzle"; }
}
