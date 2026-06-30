package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.Game2048State;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class Game2048Engine implements GameEngine<Game2048State> {

    @Override
    public Game2048State createGame(String gameId, Map<String, Object> config) {
        return new Game2048State(gameId);
    }

    @Override
    public Game2048State makeMove(String gameId, Game2048State state, String action, Map<String, Object> payload) {
        state.slide(action);
        return state;
    }

    @Override
    public boolean isGameOver(Game2048State state) { return state.isGameOver(); }

    @Override
    public int getScore(Game2048State state) { return state.getScore(); }

    @Override
    public String getGameType() { return "2048"; }
}
