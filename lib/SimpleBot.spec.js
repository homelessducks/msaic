describe('SimpleBot', () => {
  const SimpleBot = require('./SimpleBot')
  const Game = require('./GameBoard')
  const bot = new SimpleBot()
  const small_board = [
    [false, false, false],
    [false, false, false],
    [false, false, true],
  ]

  it('solve by interacting with game', () => {
    const game = new Game(small_board)

    bot.solve(game)

    game.getStatus().should.not.equal('new')
  })

  it('solve by win or fail game', () => {
    const game = new Game([
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ])

    bot.solve(game)

    game.getStatus()
      .should.match(/fail|win/)
  })

  it('solve with random first move', () => {
    let tries_count = 100
    const result = {
      win: 0,
      fail: 0,
    }

    for (let i = tries_count; i--;) {
      const game = new Game([[0, 1]])
      bot.solve(game)
      result[game.getStatus()]++
    }

    (result.win + result.fail).should.equal(tries_count)
    result.win.should.not.equal(0)
    result.fail.should.not.equal(0)
  })

  it('solve with random moves', () => {
    let tries_count = 100
    const result = {
      win: 0,
      fail: 0,
    }

    for (let i = tries_count; i--;) {
      const game = new Game([
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
      ])
      bot.solve(game)
      result[game.getStatus()]++
    }

    (result.win + result.fail).should.equal(tries_count)
    result.win.should.not.equal(0)
    result.fail.should.not.equal(0)
  })
})
