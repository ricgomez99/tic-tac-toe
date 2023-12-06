export default function Square({ children, index, updateBoard, isSelected }) {
  const squareClass = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <button onClick={handleClick} className={squareClass} key={index}>
      {children}
    </button>
  );
}
