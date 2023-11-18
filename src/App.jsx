import Square from "../src/components/Square";
import { useState } from "react";

// Symbols
const TURNS = {
  x: "x",
  o: "o",
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);

  const updateBoard = (index) => {
    // If the position already has a value
    // We won't overwrite it
    if (board[index]) return;
    // Update the Board
    const newBoard = [...board];
    newBoard[index] = turn; // x u o
    setBoard(newBoard);

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
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
