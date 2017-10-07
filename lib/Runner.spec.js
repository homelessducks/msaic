const should = require('should');
const Runner = require('./Runner');
const Bot = mockBot();

describe('Runner', () => {
  it('should fail without boards or bot', () => {
    const runner = new Runner();

    should.throws(() => runner.getStats());
  });

  it('should return summary stats', () => {
    const runner = new Runner();

    runner
      .setBoards([mockBoard(), mockBoard()])
      .setBot(Bot)
      .getStats()
      .should.have.properties({ games: 2, win: 2, fail: 0 });
  });
});

function mockBoard() {
  return {
    status: 'new',
    getStatus() {
      return this.status;
    }
  };
}

function mockBot() {
  return { solve: board => board.status = 'win' };
}