import Square from "../src/components/Square";
import { useState } from "react";

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

  const updateBoard = (index) => {
    // If the position already has a value
    // We won't overwrite it OR if there's a winner
    if (board[index] || winner) return;
    // Update the Board
    const newBoard = [...board];
    newBoard[index] = turn; // x / o
    setBoard(newBoard);

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    // Checks for a winner
    const newWinner = winnerCheck(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
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

  return (
    <main className="board">
      <h1>TIC-TAC-TOE</h1>
      <section className="game">
        {board &&
          board.map((_, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              <span className="cell__content">{board[index]}</span>
            </Square>
          ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
    </main>
  );
}

export default App;
