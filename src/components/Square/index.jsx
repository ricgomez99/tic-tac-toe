export default function Square({ children, index, updateBoard, isSelected }) {
  const squareClass = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={squareClass} key={index}>
      {children}
    </div>
  );
}

export const makeMove = (board, index, player) => {
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};
