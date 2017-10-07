describe('service.matrix', () => {
  const Entity = require('./matrix')
  const matrix = [
    [false, 0, undefined],
    [1, true, NaN],
  ]

  it('findCell', () => Entity.findCell(matrix, i => i === true)
    .should.deepEqual([1, 1]))

  it('findCell not found', () => should(
    Entity.findCell(matrix, i => false))
    .be.Undefined())

  it('create', () => {
    const height = 8
    const width = 13
    const content = 'cell_content'

    const matrix = Entity.create(height, width, content)

    matrix.should.have.length(height)
    matrix.forEach(row => {
      row.should.have.length(width)
      row.forEach(cell => cell.should.equal(content))
    })
  })

  it('walkNeighbors', () => {
    const matrix = Entity.create(5, 5, 0)

    Entity.walkNeighbors(matrix, 0, 0, (y, x) => matrix[y][x] = 1)
    Entity.walkNeighbors(matrix, 2, 2, (y, x) => matrix[y][x] = 2)
    Entity.walkNeighbors(matrix, 5, 5, (y, x) => matrix[y][x] = 3)

    matrix.should.deepEqual([
      [0, 1, 0, 0, 0],
      [1, 2, 2, 2, 0],
      [0, 2, 0, 2, 0],
      [0, 2, 2, 2, 0],
      [0, 0, 0, 0, 3]])
  })
  it('walk', () => {
    const matrix = Entity.create(3, 3, 0)

    Entity.walk(matrix, (y, x) => matrix[y][x] = 1)

    matrix.should.deepEqual([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]])
  })
})
