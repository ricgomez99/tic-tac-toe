export default function Message({ winner, children }) {
  return (
    <>
      <div className="text">
        {winner === false ? "Tied Game!" : "The winner is:"}
      </div>
      <header>{children}</header>
    </>
  );
}
