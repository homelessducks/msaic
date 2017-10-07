const Matrix = require('./service/matrix')

module.exports = {
  generate,
}

function generate(height, width, mines) {
  const board = Matrix.create(height, width, false)

  for (let m = mines; m--;) {
    let x, y

    do {
      x = rand(width)
      y = rand(height)
    } while (board[y][x])

    board[y][x] = true
  }

  return board
}

function rand(max) {
  return Math.floor(Math.random() * max)
}
