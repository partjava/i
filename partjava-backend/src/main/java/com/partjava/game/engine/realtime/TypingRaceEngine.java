package com.partjava.game.engine.realtime;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.TypingRaceState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class TypingRaceEngine implements GameEngine<TypingRaceState> {

    @Override
    public TypingRaceState createGame(String gameId, Map<String, Object> config) {
        return new TypingRaceState(gameId);
    }

    @Override
    public TypingRaceState makeMove(String gameId, TypingRaceState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("type".equals(action) && payload != null) {
            Object word = payload.get("word");
            if (word instanceof String) state.type((String) word);
        }
        return state;
    }

    @Override public TypingRaceState tick(String gameId, TypingRaceState state) { return state; }
    @Override public boolean isGameOver(TypingRaceState state) { return state.isGameOver(); }
    @Override public int getScore(TypingRaceState state) { return state.getScore(); }
    @Override public String getGameType() { return "typingrace"; }
    @Override public boolean isRealtime() { return false; } // event-driven, no tick needed
}
