export const isBoardFull = (board) => board.every((square) => square);
export const makeMove = (board, index, player) => {
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};
