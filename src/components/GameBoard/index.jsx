import { TURNS } from '../../utils.js'
import Square from '../Square/index.jsx'
import Winner from '../Winner/index.jsx'
import useBoard from '../../Hooks/useBoard.jsx'

export default function GameBoard() {
  const { board, resetState, turn, updateBoard, winner } = useBoard()
  return (
    <>
      <h1>TIC-TAC-TOE</h1>
      <section className="game">
        {board &&
          board.map((square, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              <span className="cell__content">{square}</span>
            </Square>
          ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      {winner !== null && <Winner winner={winner} reset={resetState} />}
    </>
  )
}
