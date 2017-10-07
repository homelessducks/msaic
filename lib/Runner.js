const GameBoard = require('./GameBoard');
const PRIV = Symbol();

class Runner {
  constructor() {
    this[PRIV] = {};
  }

  setBoards(boards) {
    this[PRIV].boards = boards.map(board => new GameBoard(board));

    return this;
  }

  setBot(bot) {
    this[PRIV].bot = bot;

    return this;
  }

  getStats() {
    if (!this[PRIV].bot || !this[PRIV].boards) {
      throw new Error('You should provide Bot and Boards');
    }

    this.solveBoards();

    const stats = { games: this[PRIV].boards.length };

    return Object.assign(stats, this.getBoardsStatus());
  }

  solveBoards() {
    this[PRIV].boards.forEach(board => this[PRIV].bot.solve(board));
  }

  getBoardsStatus() {
    const stats = {
      win: 0,
      fail: 0,
    };

    this[PRIV].boards
      .map(board => board.getStatus())
      .forEach(status => {
        if (Object.keys(stats).includes(status)) {
          stats[status] += 1;
        }
      });

    return stats;
  }
}

module.exports = Runner;