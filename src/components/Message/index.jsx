export default function Message({ winner, children }) {
  return (
    <>
      <div className="text">{winner === false ? "Tie" : "Won:"}</div>
      <header>{children}</header>
    </>
  );
}
