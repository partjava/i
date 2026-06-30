package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.HanoiState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class HanoiEngine implements GameEngine<HanoiState> {

    @Override
    public HanoiState createGame(String gameId, Map<String, Object> config) {
        int disks = config != null && config.containsKey("disks") ? ((Number) config.get("disks")).intValue() : 5;
        return new HanoiState(gameId, disks);
    }

    @Override
    public HanoiState makeMove(String gameId, HanoiState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("move".equals(action) && payload != null) {
            Object from = payload.get("from"), to = payload.get("to");
            if (from instanceof Number && to instanceof Number) {
                state.move(((Number) from).intValue(), ((Number) to).intValue());
            }
        }
        return state;
    }

    @Override public boolean isGameOver(HanoiState state) { return state.isGameOver(); }
    @Override public int getScore(HanoiState state) { return state.getScore(); }
    @Override public String getGameType() { return "hanoi"; }
}
