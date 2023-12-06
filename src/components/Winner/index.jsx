import Message from "../Message";
import Square from "../Square";
import Button from "../Button";

export default function Winner({ winner, reset }) {
  return (
    <section className="winner">
      <Message winner={winner}>{winner && <Square>{winner}</Square>}</Message>
      <footer>
        <Button reset={reset} />
      </footer>
    </section>
  );
}
