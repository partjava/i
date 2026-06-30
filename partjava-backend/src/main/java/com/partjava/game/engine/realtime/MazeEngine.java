package com.partjava.game.engine.realtime;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.MazeState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class MazeEngine implements GameEngine<MazeState> {

    @Override
    public MazeState createGame(String gameId, Map<String, Object> config) {
        return new MazeState(gameId);
    }

    @Override
    public MazeState makeMove(String gameId, MazeState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        switch (action) {
            case "up": state.move(-1, 0); break;
            case "down": state.move(1, 0); break;
            case "left": state.move(0, -1); break;
            case "right": state.move(0, 1); break;
        }
        return state;
    }

    @Override public MazeState tick(String gameId, MazeState state) { return state; }
    @Override public boolean isGameOver(MazeState state) { return state.isGameOver(); }
    @Override public int getScore(MazeState state) { return state.getScore(); }
    @Override public String getGameType() { return "maze"; }
    @Override public boolean isRealtime() { return false; }
}
