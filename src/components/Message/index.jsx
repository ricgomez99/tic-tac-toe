export default function Message({ winner, children }) {
  return (
    <>
      <div className="text">{!winner ? "Tie" : "Won:"}</div>
      <header>{children}</header>
    </>
  );
}
