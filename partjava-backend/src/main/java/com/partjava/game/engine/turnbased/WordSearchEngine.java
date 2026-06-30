package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.WordSearchState;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class WordSearchEngine implements GameEngine<WordSearchState> {

    @Override
    public WordSearchState createGame(String gameId, Map<String, Object> config) {
        return new WordSearchState(gameId);
    }

    @Override
    public WordSearchState makeMove(String gameId, WordSearchState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;
        if ("select".equals(action) && payload != null) {
            Object r1 = payload.get("r1"), c1 = payload.get("c1"), r2 = payload.get("r2"), c2 = payload.get("c2");
            if (r1 instanceof Number && c1 instanceof Number && r2 instanceof Number && c2 instanceof Number)
                state.select(((Number) r1).intValue(), ((Number) c1).intValue(), ((Number) r2).intValue(), ((Number) c2).intValue());
        }
        return state;
    }

    @Override public boolean isGameOver(WordSearchState state) { return state.isGameOver(); }
    @Override public int getScore(WordSearchState state) { return state.getScore(); }
    @Override public String getGameType() { return "wordsearch"; }
}
