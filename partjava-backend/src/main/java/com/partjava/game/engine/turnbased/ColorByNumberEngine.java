package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.ColorByNumberState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class ColorByNumberEngine implements GameEngine<ColorByNumberState> {

    @Override
    public ColorByNumberState createGame(String gameId, Map<String, Object> config) {
        return new ColorByNumberState(gameId);
    }

    @Override
    public ColorByNumberState makeMove(String gameId, ColorByNumberState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("paint".equals(action) && payload != null) {
            Object r = payload.get("row"), c = payload.get("col"), color = payload.get("color");
            if (r instanceof Number && c instanceof Number && color instanceof Number)
                state.paint(((Number) r).intValue(), ((Number) c).intValue(), ((Number) color).intValue());
        }
        return state;
    }

    @Override public boolean isGameOver(ColorByNumberState state) { return state.isGameOver(); }
    @Override public int getScore(ColorByNumberState state) { return state.getScore(); }
    @Override public String getGameType() { return "colorbynumber"; }
}
