describe('SimpleBot', () => {
  const SimpleBot = require('./SimpleBot')
  const Game = require('./GameBoard')
  const bot = new SimpleBot()
  const small_board = [
    [false, false, false],
    [false, false, false],
    [false, false, true],
  ]

  it('solve interacts with game', () => {
    const game = new Game(small_board)

    bot.solve(game)

    game.getStatus().should.not.equal('new')
  })

  it('solve able to complete game', () => {
    const game = new Game([
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ])

    bot.solve(game)

    game.getStatus()
      .should.match(/fail|win/)
  })
})
