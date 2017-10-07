const iBot = require('./SampleBot')
const Matrix = require('./service/matrix')
const PRIV = Symbol()


class Solver {
  constructor(game) {
    const {height, width, mines} = game.getBoardInfo()

    this[PRIV] = {
      board: Matrix.create(height, width),
      game,
      stats: {
        found: 0,
        height,
        mines,
        moves: 0,
        width,
      },
    }
  }

  act() {
    const {
      board,
      game,
      stats,
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
      stats,
    } = this[PRIV]

    stats.moves++

    let [y, x] = getRandCell(stats.height, stats.width)

    if (stats.moves === 1) {
      return [y, x]
    }

    do {
      [y, x] = getRandCell(stats.height, stats.width)
    } while (board[y][x])

    return [y, x]
  }
}


module.exports = class Bot extends iBot {
  solve(game) {
    const solver = new Solver(game)

    while (solver.act()) {}
  }
}

function randInt0(to = 1) {
  return Math.floor(Math.random() * to)
}
function getRandCell(height, width) {
  return [height, width].map(randInt0)
}
