describe('SimpleBot', () => {
  const SimpleBot = require('./SimpleBot')
  const Game = require('./GameBoard')
  const bot = new SimpleBot()

  it('solve by interacting with game', () => {
    const game = new Game([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
    ])

    bot.solve(game)

    game.getStatus().should.not.equal('new')
  })

  it('solve by win or fail game', () => {
    const game = new Game([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ])

    bot.solve(game)

    game.getStatus()
      .should.match(/fail|win/)
  })

  it('solve with random first move', () => {
    let tries_count = 100
    const board = [[0, 1]]
    const stats = {
      win: 0,
      fail: 0,
    }

    for (let i = tries_count; i--;) {
      const game = new Game(board)
      bot.solve(game)
      stats[game.getStatus()]++
    }

    ;(stats.win + stats.fail).should.equal(tries_count)
    ;(stats.win / tries_count).should.be.greaterThan(.2)
  })

  it('solve with random moves', () => {
    let tries_count = 100
    const stats = {
      win: 0,
      fail: 0,
    }

    for (let i = tries_count; i--;) {
      const game = new Game([
        [0, 0],
        [0, 1],
      ])
      bot.solve(game)
      stats[game.getStatus()]++
    }

    ;(stats.win + stats.fail).should.equal(tries_count)
    ;(stats.win / tries_count).should.be.greaterThan(.1)
  })
})
