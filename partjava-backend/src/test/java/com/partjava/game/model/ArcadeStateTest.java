package com.partjava.game.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ArcadeStateTest {
    @Test void snakeMayMoveIntoVacatedTail() throws Exception {
        SnakeState s = new SnakeState("test");
        var foodX = SnakeState.class.getDeclaredField("foodX"); foodX.setAccessible(true); foodX.setInt(s, 0);
        var foodY = SnakeState.class.getDeclaredField("foodY"); foodY.setAccessible(true); foodY.setInt(s, 0);
        s.getSnake().clear();
        s.getSnake().add(new int[]{5,5});
        s.getSnake().add(new int[]{5,6});
        s.getSnake().add(new int[]{4,6});
        s.getSnake().add(new int[]{4,5});
        s.setDirection(-1,0); // left is reverse initially; arrange heading upward first
        s.setDirection(0,-1);
        s.tick(); s.tick();
        // Build a loop with the head moving right into the old tail.
        s.getSnake().clear();
        s.getSnake().add(new int[]{5,5});
        s.getSnake().add(new int[]{5,6});
        s.getSnake().add(new int[]{6,6});
        s.getSnake().add(new int[]{6,5});
        s.setDirection(1,0);
        s.tick(); s.tick();
        assertFalse(s.isGameOver());
        assertArrayEquals(new int[]{6,5}, s.getSnake().get(0));
    }
    @Test void snakeBuffersTwoQuickTurnsInOrder() {
        SnakeState s = new SnakeState("test");
        s.setDirection(0,-1);
        s.setDirection(-1,0);
        s.tick(); s.tick();
        assertArrayEquals(new int[]{5,9}, s.getSnake().get(0));
        s.tick(); s.tick();
        assertArrayEquals(new int[]{4,9}, s.getSnake().get(0));
    }
    @Test void hardDropLocksImmediatelyAndSpawnsNextPiece() {
        TetrisState s = new TetrisState("test");
        Object old = s.getCurrent();
        s.hardDrop();
        assertNotSame(old, s.getCurrent());
        assertTrue(java.util.Arrays.stream(s.getBoard()).flatMapToInt(java.util.Arrays::stream).anyMatch(v -> v != 0));
    }
}
