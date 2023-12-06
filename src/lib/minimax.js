export class MinMax {
  constructor(winnerCheck, isBoardFull, makeMove, turn) {
    this.winnerCheck = winnerCheck;
    this.isBoardFull = isBoardFull;
    this.makeMove = makeMove;
    this.turn = turn;
  }

  getMaxEval(board, depth) {
    const len = board.length;
    let maxEval = -Infinity;
    for (let i = 0; i < len; i++) {
      if (!board[i]) {
        const newBoard = this.makeMove(board, i, this.turn.o);
        const evaluator = this.minimax(newBoard, depth, false);
        maxEval = Math.max(maxEval, evaluator);
      }
    }

    return maxEval;
  }

  getMinEval(board, depth) {
    const len = board.length;
    let minEval = Infinity;
    for (let i = 0; i < len; i++) {
      if (!board[i]) {
        const newBoard = this.makeMove(board, i, this.turn.x);
        const evaluator = this.minimax(newBoard, depth, true);
        minEval = Math.min(minEval, evaluator);
      }
    }
    return minEval;
  }

  minimax(board, depth, maxPlayer) {
    const winner = this.winnerCheck(board);
    const newDepth = depth + 1;
    if (winner) {
      return winner === this.turn.x ? -1 : 1;
    }

    if (this.isBoardFull(board)) {
      return 0;
    }

    if (maxPlayer) {
      return this.getMaxEval(board, newDepth);
    } else {
      return this.getMinEval(board, newDepth);
    }
  }
}
