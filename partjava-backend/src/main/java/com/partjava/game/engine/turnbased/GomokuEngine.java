package com.partjava.game.engine.turnbased;

import com.partjava.game.engine.GameEngine;
import com.partjava.game.model.GomokuState;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class GomokuEngine implements GameEngine<GomokuState> {

    @Override
    public GomokuState createGame(String gameId, Map<String, Object> config) {
        GomokuState state = new GomokuState(gameId);
        // 如果配置了 vsAI=true 且 AI 先手，AI 走中间
        if (config != null && Boolean.TRUE.equals(config.get("vsAI"))
                && config.containsKey("aiFirst") && Boolean.TRUE.equals(config.get("aiFirst"))) {
            state.place(7, 7, 1); // AI 执黑先走天元
        }
        return state;
    }

    @Override
    public GomokuState makeMove(String gameId, GomokuState state, String action, Map<String, Object> payload) {
        if (state.isGameOver()) return state;

        if ("place".equals(action) && payload != null) {
            Object row = payload.get("row");
            Object col = payload.get("col");
            if (row instanceof Number && col instanceof Number) {
                state.place(((Number) row).intValue(), ((Number) col).intValue(), state.getCurrentPlayer());
            }
        }

        // 如果是 AI 模式，AI 自动走一步
        if (payload != null && Boolean.TRUE.equals(payload.get("vsAI")) && !state.isGameOver()) {
            aiMove(state);
        }
        return state;
    }

    /** 简单启发式 AI — 扫描每个空位打分，选最高分 */
    private void aiMove(GomokuState state) {
        int ai = state.getCurrentPlayer();
        int human = ai == 1 ? 2 : 1;
        int bestScore = -1, bestRow = -1, bestCol = -1;

        for (int r = 0; r < 15; r++) {
            for (int c = 0; c < 15; c++) {
                if (state.getBoard()[r][c] != 0) continue;
                int score = evaluate(state, r, c, ai) * 2 + evaluate(state, r, c, human);
                if (score > bestScore) {
                    bestScore = score;
                    bestRow = r;
                    bestCol = c;
                }
            }
        }
        if (bestRow >= 0) state.place(bestRow, bestCol, ai);
    }

    /** 评估在 (r,c) 落子对某方有多少价值 */
    private int evaluate(GomokuState state, int r, int c, int player) {
        int total = 0;
        int[][] dirs = {{1,0},{0,1},{1,1},{1,-1}};
        for (int[] d : dirs) {
            int count = 1; // 假设下了这步
            // 正方向
            for (int step = 1; step <= 4; step++) {
                int nr = r + step * d[0], nc = c + step * d[1];
                if (nr < 0 || nr >= 15 || nc < 0 || nc >= 15) break;
                if (state.getBoard()[nr][nc] == player) count++;
                else if (state.getBoard()[nr][nc] == 0) break; // 空位停止计数但不算分
                else break; // 对方棋子
            }
            // 负方向
            for (int step = 1; step <= 4; step++) {
                int nr = r - step * d[0], nc = c - step * d[1];
                if (nr < 0 || nr >= 15 || nc < 0 || nc >= 15) break;
                if (state.getBoard()[nr][nc] == player) count++;
                else if (state.getBoard()[nr][nc] == 0) break;
                else break;
            }
            if (count >= 5) total += 10000;
            else if (count == 4) total += 1000;
            else if (count == 3) total += 100;
            else if (count == 2) total += 10;
        }
        return total;
    }

    @Override
    public boolean isGameOver(GomokuState state) { return state.isGameOver(); }
    @Override
    public int getScore(GomokuState state) { return state.getScore(); }
    @Override
    public String getGameType() { return "gomoku"; }
}
