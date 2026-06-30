package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.MinesweeperState;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class MinesweeperEngine implements GameEngine<MinesweeperState> {

    @Override
    public MinesweeperState createGame(String gameId, Map<String, Object> config) {
        int rows = config != null && config.containsKey("rows") ? ((Number) config.get("rows")).intValue() : 9;
        int cols = config != null && config.containsKey("cols") ? ((Number) config.get("cols")).intValue() : 9;
        int mines = config != null && config.containsKey("mines") ? ((Number) config.get("mines")).intValue() : 10;
        return new MinesweeperState(gameId, rows, cols, mines);
    }

    @Override
    public MinesweeperState makeMove(String gameId, MinesweeperState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if (payload == null) return state;

        switch (action) {
            case "reveal": {
                Object row = payload.get("row");
                Object col = payload.get("col");
                if (row instanceof Number && col instanceof Number) {
                    state.reveal(((Number) row).intValue(), ((Number) col).intValue());
                }
                break;
            }
            case "flag": {
                Object row = payload.get("row");
                Object col = payload.get("col");
                if (row instanceof Number && col instanceof Number) {
                    state.toggleFlag(((Number) row).intValue(), ((Number) col).intValue());
                }
                break;
            }
        }
        return state;
    }

    @Override
    public boolean isGameOver(MinesweeperState state) { return state.isGameOver(); }
    @Override
    public int getScore(MinesweeperState state) { return state.getScore(); }
    @Override
    public String getGameType() { return "minesweeper"; }
}
