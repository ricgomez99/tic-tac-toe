import Square from "../src/components/Square";
import { useState, useEffect } from "react";
import Message from "./components/Message";
import { isBoardFull, makeMove } from "./utils.js";
import Button from "./components/Button/index.jsx";

// Symbols
const TURNS = {
  x: "x",
  o: "o",
};

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null); // null: No winner, false: Draw

  useEffect(() => {
    // If it's the CPU's turn, make a move
    if (turn === TURNS.x) {
      const bestMove = getBestMove(board);
      const newBoard = makeMove(board, bestMove, TURNS.x);
      setBoard(newBoard);
      setTurn(TURNS.o);
    }
  }, []);

  const updateBoard = (index) => {
    // If the position already has a value
    // We won't overwrite it OR if there's a winner the game will stop
    if (board[index] || winner) return;

    // Update the Board
    const newBoard = [...board];
    newBoard[index] = turn; // x / o
    setBoard(newBoard);

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    if (newTurn === TURNS.x) {
      // Only make the CPU move if it's the CPU's turn
      const bestMove = getBestMove(newBoard);
      newBoard[bestMove] = TURNS.x;
      setBoard(newBoard);

      // Update the turn after the CPU makes a move
      setTurn(TURNS.o);
    }

    // Checks for a winner
    const newWinner = winnerCheck(newBoard);

    if (!!newWinner) {
      setWinner(newWinner);
      return;
    }

    isBoardFull(newBoard) ? setWinner(false) : setWinner(null);
  };

  const getMaxEval = (boartToEvalueate, depth) => {
    const len = boartToEvalueate.length;
    let maxEval = -Infinity;
    for (let i = 0; i < len; i++) {
      if (!boartToEvalueate[i]) {
        const newBoard = makeMove(boartToEvalueate, i, TURNS.o);
        const evaluator = minimax(newBoard, depth, false);
        maxEval = Math.max(maxEval, evaluator);
      }
    }
    return maxEval;
  };

  const getMinEval = (boartToEvalueate, depth) => {
    const len = boartToEvalueate.length;
    let minEval = Infinity;
    for (let i = 0; i < len; i++) {
      if (!boartToEvalueate[i]) {
        const newBoard = makeMove(boartToEvalueate, i, TURNS.x);
        const evaluator = minimax(newBoard, depth, true);
        minEval = Math.min(minEval, evaluator);
      }
    }
    return minEval;
  };

  const minimax = (currentBoard, depth, maxPlayer) => {
    const winner = winnerCheck(currentBoard);
    const newDepth = depth + 1;
    if (winner) {
      return winner === TURNS.x ? -1 : 1;
    }

    if (isBoardFull(currentBoard)) {
      return 0;
    }

    if (maxPlayer) {
      return getMaxEval(currentBoard, newDepth);
    } else {
      return getMinEval(currentBoard, newDepth);
    }
  };

  const getBestMove = (currentBoard) => {
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        const newBoard = makeMove(currentBoard, i, TURNS.x);
        const score = minimax(newBoard, 0, false);

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const winnerCheck = (boardToCheck) => {
    for (const combo of WINNER_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && // Checks if position [0] is true (x u o)
        boardToCheck[a] === boardToCheck[b] && // Checks if at [0] & [3] there's x -> x / o -> 0
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]; // Should return x / o
      }
    }
    // No winner
    return null;
  };

  const resetState = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.o);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>TIC-TAC-TOE</h1>
      <section className="game">
        {board &&
          board.map((square, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              <span className="cell__content">{square}</span>
            </Square>
          ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <Message winner={winner}>
            {winner && <Square>{winner}</Square>}
          </Message>
          <footer>
            <Button reset={resetState} />
          </footer>
        </section>
      )}
    </main>
  );
}

export default App;
