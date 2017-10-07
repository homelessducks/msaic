module.exports = {
  create,
  findCell,
  walk,
  walkNeighbors,
}


function findCell(matrix, test) {
  let x

  const y = matrix.findIndex(row => {
    x = row.findIndex(test)
    return x !== -1
  })

  if (y === -1) return
  return [y, x]
}
function create(height, width, content) {
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
function walkNeighbors(matrix, y, x, walker) {
  const cells = [
    [y - 1, x - 1],
    [y - 1, x - 0],
    [y - 1, x + 1],
    [y - 0, x - 1],
    [y - 0, x + 1],
    [y + 1, x - 1],
    [y + 1, x - 0],
    [y + 1, x + 1],
  ];

  cells.forEach(([y, x]) =>
    matrix[y] !== undefined &&
    matrix[y][x] !== undefined &&
    walker(y, x, matrix[y][x]),
  )
}
function walk(matrix, walker) {
  matrix.forEach((row, y) => {
    if (!Array.isArray(row)) return

    row.forEach((cell, x) => {
      walker(y, x, cell)
    })
  })
}
