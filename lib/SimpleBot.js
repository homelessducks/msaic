const iBot = require('./SampleBot')
const PRIV = Symbol()


class Solver {
  constructor(game) {
    const {height, width, mines} = game.getBoardInfo()

    this[PRIV] = {
      board: makeMatrix(height, width),
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

    return findPos(board, i => !i)
  }
}


module.exports = class Bot extends iBot {
  solve(game) {
    const solver = new Solver(game)

    while (solver.act()) {}
  }
}

function makeMatrix(height, width, content) {
  const matrix = []

  for (let h = height; h--;) {
    const row = []

    for (let w = width; w--;) {
      row.push(content)
    }

    matrix.push(row)
  }

  return matrix
}

function findPos(matrix, test) {
  let x

  const y = matrix.findIndex(row => {
    x = row.findIndex(test)
    return x !== -1
  })

  if (y === -1) return
  return [y, x]
}
