module.exports = {
  generate,
}

function generate(height, width, mines) {
  const board = []

  for (let h = height; h--;) {
    const row = []

    for (let w = width; w--;) {
      row.push(false)
    }

    board.push(row)
  }

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
