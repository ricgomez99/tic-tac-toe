// Symbols
export const TURNS = {
  x: "Χ",
  o: "Ο",
};

export const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const isBoardFull = (board) => board.every((square) => square !== null);
export const makeMove = (board, index, player) => {
  const newBoard = board.slice();
  newBoard[index] = player;
  return newBoard;
};
