describe('ChallengeGenerator', () => {
  const Entity = require('./ChallengeGenerator')

  ;[
    [3, 3, 1],
    [10, 10, 99],
    [5, 5, 7],
  ].forEach(([height, width, mines]) => {
    it(`generate h${height} w${width} m${mines}`, () => {
      const board = Entity.generate(height, width, mines)
      let minecount = 0

      board.should.be.Array().with.length(height)
      board.forEach(row => {
        row.should.be.Array().with.length(width)
        row.forEach(cell => {
          cell.should.be.Boolean()
          if (cell) minecount++
        })
      })

      minecount.should.equal(mines)
    })
  })
})
