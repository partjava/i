package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.TicTacToeState;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TicTacToeEngine implements GameEngine<TicTacToeState> {

    @Override
    public TicTacToeState createGame(String gameId, Map<String, Object> config) {
        return new TicTacToeState(gameId);
    }

    @Override
    public TicTacToeState makeMove(String gameId, TicTacToeState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("place".equals(action) && payload != null) {
            Object rowObj = payload.get("row");
            Object colObj = payload.get("col");
            if (rowObj instanceof Number && colObj instanceof Number) {
                state.place(((Number) rowObj).intValue(), ((Number) colObj).intValue());
            }
        }
        return state;
    }

    @Override
    public boolean isGameOver(TicTacToeState state) {
        return state.isGameOver();
    }

    @Override
    public int getScore(TicTacToeState state) {
        return state.getScore();
    }

    @Override
    public String getGameType() {
        return "tictactoe";
    }
}
