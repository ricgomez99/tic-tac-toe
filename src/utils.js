export const isBoardFull = (board) => board.every((square) => square !== null);
export const makeMove = (board, index, player) => {
  const newBoard = board.slice();
  newBoard[index] = player;
  return newBoard;
};
