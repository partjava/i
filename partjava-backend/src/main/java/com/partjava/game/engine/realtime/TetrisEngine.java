package com.partjava.game.engine.realtime;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.TetrisState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class TetrisEngine implements GameEngine<TetrisState> {

    @Override
    public TetrisState createGame(String gameId, Map<String, Object> config) {
        return new TetrisState(gameId);
    }

    @Override
    public TetrisState makeMove(String gameId, TetrisState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        switch (action.toLowerCase()) {
            case "left": state.moveLeft(); break;
            case "right": state.moveRight(); break;
            case "down": state.moveDown(); break;
            case "rotate": state.rotate(); break;
            case "drop": state.hardDrop(); break;
        }
        return state;
    }

    @Override
    public TetrisState tick(String gameId, TetrisState state) {
        state.tick();
        return state;
    }

    @Override public boolean isGameOver(TetrisState state) { return state.isGameOver(); }
    @Override public int getScore(TetrisState state) { return state.getScore(); }
    @Override public String getGameType() { return "tetris"; }
    @Override public boolean isRealtime() { return true; }
}
