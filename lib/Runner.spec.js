const Runner = require('./Runner');
const { generate } = require('./ChallengeGenerator');
const Bot = mockBot();

describe('Runner', () => {
  it('should fail without boards or bot', () => {
    const runner = new Runner();

    should.throws(() => runner.getStats());
  });

  it('should return summary stats', () => {
    const runner = new Runner();
    const data = [generate(5, 5, 3), generate(9, 9, 4)];

    runner
      .setBoards(data)
      .setBot(Bot)
      .getStats()
      .should.have.properties({ games: 2, win: 0, fail: 0 });
  });
});

function mockBot() {
  return { solve: () => null };
}
