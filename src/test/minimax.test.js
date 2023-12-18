import { describe, it, expect, vi } from "vitest";
import { MinMax } from "../lib/minimax";
import { TURNS as turn, makeMove, isBoardFull } from "../utils.js";

describe("MinMax", () => {
  it("should be of type function", () => {
    expect(typeof MinMax).toBe("function");
  });

  it("should be able to create an instance of MinMax", () => {
    const minimax = new MinMax();
    expect(minimax).toBeDefined();
  });

  it("should have the properties winnerCheck, isBoardFull, makeMove, and turn", () => {
    const winnerCheck = vi.fn();
    const minimax = new MinMax(winnerCheck, isBoardFull, makeMove, turn);
    expect(typeof minimax.winnerCheck).toBe("function");
    expect(typeof minimax.isBoardFull).toBe("function");
    expect(typeof minimax.makeMove).toBe("function");
    expect(typeof minimax.turn).toBe("object");
  });

  it("getMaxEval method should return a number", () => {
    const winnerCheck = vi.fn();
    const board = Array(9).fill(null);
    const minimax = new MinMax(winnerCheck, isBoardFull, makeMove, turn);
    let depth = 0;

    expect(typeof minimax.getMaxEval(board, depth + 1)).toBe("number");
  });
});
