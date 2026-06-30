package com.partjava.game.controller;

import com.partjava.game.model.GameState;
import com.partjava.game.service.GameService;
import com.partjava.game.store.GameSessionStore;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;
    private final GameSessionStore store;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(4);

    public GameController(GameService gameService, GameSessionStore store) {
        this.gameService = gameService;
        this.store = store;
    }

    /** 创建新游戏 */
    @PostMapping("/{gameType}/new")
    public Map<String, Object> createGame(
            @PathVariable String gameType,
            @RequestBody(required = false) Map<String, Object> config) {
        if (config == null) config = new HashMap<>();
        GameState state = gameService.createGame(gameType, config);
        return toResponse(state);
    }

    /** 执行操作（回合制游戏） */
    @PostMapping("/{gameType}/{gameId}/move")
    public Map<String, Object> makeMove(
            @PathVariable String gameType,
            @PathVariable String gameId,
            @RequestBody Map<String, Object> body) {
        String action = (String) body.getOrDefault("action", "");
        @SuppressWarnings("unchecked")
        Map<String, Object> payload = (Map<String, Object>) body.getOrDefault("payload", new HashMap<>());
        GameState state = gameService.makeMove(gameType, gameId, action, payload);
        return toResponse(state);
    }

    /** 获取当前游戏状态 */
    @GetMapping("/{gameType}/{gameId}")
    public Map<String, Object> getState(
            @PathVariable String gameType,
            @PathVariable String gameId) {
        GameState state = gameService.getState(gameType, gameId);
        return toResponse(state);
    }

    /** 实时游戏：发送输入 */
    @PostMapping("/{gameType}/{gameId}/input")
    public Map<String, Object> sendInput(
            @PathVariable String gameType,
            @PathVariable String gameId,
            @RequestBody Map<String, Object> body) {
        String action = (String) body.getOrDefault("action", "");
        @SuppressWarnings("unchecked")
        Map<String, Object> payload = (Map<String, Object>) body.getOrDefault("payload", new HashMap<>());
        GameState state = gameService.makeMove(gameType, gameId, action, payload);
        return toResponse(state);
    }

    /** 实时游戏：SSE 状态流推送 */
    @GetMapping(value = "/{gameType}/{gameId}/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamGame(
            @PathVariable String gameType,
            @PathVariable String gameId) {
        SseEmitter emitter = new SseEmitter(300_000L); // 5 min timeout

        ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(() -> {
            try {
                GameState state = gameService.tick(gameType, gameId);
                if (state == null || state.isGameOver()) {
                    Map<String, Object> finalResp = new HashMap<>();
                    if (state != null) {
                        finalResp.putAll(toResponse(state));
                    }
                    finalResp.put("gameOver", true);
                    emitter.send(SseEmitter.event().data(finalResp));
                    emitter.complete();
                    return;
                }
                emitter.send(SseEmitter.event().data(toResponse(state)));
            } catch (IOException e) {
                // 客户端断开连接
                store.cancelLoop(gameId);
                emitter.completeWithError(e);
            } catch (Exception e) {
                try {
                    emitter.completeWithError(e);
                } catch (Exception ignored) {
                }
            }
        }, 0, 100, TimeUnit.MILLISECONDS); // ~10fps

        store.registerLoop(gameId, future);
        emitter.onCompletion(() -> store.cancelLoop(gameId));
        emitter.onTimeout(() -> store.cancelLoop(gameId));

        return emitter;
    }

    /** 停止游戏 */
    @PostMapping("/{gameType}/{gameId}/stop")
    public Map<String, Object> stopGame(
            @PathVariable String gameType,
            @PathVariable String gameId) {
        gameService.stopGame(gameType, gameId);
        return Map.of("success", true);
    }

    /** 将游戏状态转为前端可用的 Map */
    private Map<String, Object> toResponse(GameState state) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("gameId", state.getGameId());
        resp.put("gameType", state.getGameType());
        resp.put("gameOver", state.isGameOver());
        resp.put("score", state.getScore());
        resp.put("winner", state.getWinner());
        // 每个游戏通过子类 Jackson 序列化自动带上剩余字段
        resp.put("state", state);
        return resp;
    }
}
