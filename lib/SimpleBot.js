const iBot = require('./SampleBot')
const Matrix = require('./service/matrix')
const PRIV = Symbol()


class Solver {
  constructor(game) {
    const {height, width, mines} = game.getBoardInfo()

    this[PRIV] = {
      board: Matrix.create(height, width),
      game,
      mines,
      mines_found: 0,
    }
  }

  act() {
    const {
      board,
      game,
    } = this[PRIV]

    if (['win', 'fail'].includes(game.getStatus())) return false

    const [y, x] = this.getNextMove() || []

    if (y === undefined) throw new Error("That shouldn't happen")

    game.reveal(y, x)
    board[y][x] = true

    return true
  }

  getNextMove() {
    const {
      board,
    } = this[PRIV]

    return Matrix.findCell(board, i => !i)
  }
}


module.exports = class Bot extends iBot {
  solve(game) {
    const solver = new Solver(game)

    while (solver.act()) {}
  }
}
