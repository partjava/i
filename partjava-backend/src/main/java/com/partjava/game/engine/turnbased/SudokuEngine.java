package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.SudokuState;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class SudokuEngine implements GameEngine<SudokuState> {

    @Override
    public SudokuState createGame(String gameId, Map<String, Object> config) {
        String diff = config != null ? (String) config.getOrDefault("difficulty", "medium") : "medium";
        return new SudokuState(gameId, diff);
    }

    @Override
    public SudokuState makeMove(String gameId, SudokuState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("place".equals(action) && payload != null) {
            Object row = payload.get("row"), col = payload.get("col"), num = payload.get("num");
            if (row instanceof Number && col instanceof Number && num instanceof Number) {
                state.place(((Number) row).intValue(), ((Number) col).intValue(), ((Number) num).intValue());
            }
        }
        return state;
    }

    @Override public boolean isGameOver(SudokuState state) { return state.isGameOver(); }
    @Override public int getScore(SudokuState state) { return state.getScore(); }
    @Override public String getGameType() { return "sudoku"; }
}
