package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.RiddleState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class RiddleEngine implements GameEngine<RiddleState> {

    @Override
    public RiddleState createGame(String gameId, Map<String, Object> config) {
        return new RiddleState(gameId);
    }

    @Override
    public RiddleState makeMove(String gameId, RiddleState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("guess".equals(action) && payload != null) {
            Object answer = payload.get("answer");
            if (answer instanceof String) state.guess((String) answer);
        }
        return state;
    }

    @Override public boolean isGameOver(RiddleState state) { return state.isGameOver(); }
    @Override public int getScore(RiddleState state) { return state.getScore(); }
    @Override public String getGameType() { return "riddle"; }
}
