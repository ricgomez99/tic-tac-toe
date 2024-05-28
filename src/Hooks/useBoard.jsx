import { useState, useEffect } from 'react'
import { TURNS, WINNER_COMBINATIONS, isBoardFull, makeMove } from '../utils.js'
import { MinMax } from '../lib/minimax.js'
import { resetStorage, setStorage } from '../lib/localStorage/index.js'

const useBoard = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  })
  const [winner, setWinner] = useState(null) // null: No winner, false: Draw

  useEffect(() => {
    // If it's the CPU's turn, make a move
    if (turn === TURNS.x) {
      const bestMove = getBestMove(board)
      const newBoard = makeMove(board, bestMove, TURNS.x)
      setBoard(newBoard)
      setTurn(TURNS.o)
    }
  }, [])

  const updateBoard = (index) => {
    // If the position already has a value
    // We won't overwrite it OR if there's a winner the game will stop
    if (board[index] || winner) return

    // Update the Board
    const newBoard = [...board]
    newBoard[index] = turn // x / o
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    // Adding localStorage
    setStorage(newBoard, newTurn)

    if (newTurn === TURNS.x) {
      // Only make the CPU move if it's the CPU's turn
      const bestMove = getBestMove(newBoard)
      newBoard[bestMove] = TURNS.x
      setBoard(newBoard)

      // Update the turn after the CPU makes a move
      setTurn(TURNS.o)
    }

    // Checks for a winner
    const newWinner = winnerCheck(newBoard)

    if (newWinner) {
      setWinner(newWinner)
      return
    }

    isBoardFull(newBoard) ? setWinner(false) : setWinner(null)
  }

  const winnerCheck = (boardToCheck) => {
    for (const combo of WINNER_COMBINATIONS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // Checks if position [0] is true (x u o)
        boardToCheck[a] === boardToCheck[b] && // Checks if at [0] & [3] there's x -> x / o -> 0
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] // Should return x / o
      }
    }
    // No winner
    return null
  }

  const iaLogic = new MinMax(winnerCheck, isBoardFull, makeMove, TURNS)

  const getBestMove = (currentBoard) => {
    let bestMove = -1
    let bestScore = -Infinity

    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        const newBoard = makeMove(currentBoard, i, TURNS.x)
        const score = iaLogic.minimax(newBoard, 0, false)

        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }
    return bestMove
  }

  const resetState = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.o)
    setWinner(null)

    resetStorage('board', 'turn')
  }

  return { board, turn, winner, updateBoard, resetState }
}

export default useBoard
