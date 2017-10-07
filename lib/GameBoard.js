const Matrix = require('./service/matrix')
const BOARD_STATUS_ENUM = {
  new: 'new',
  active: 'active',
  win: 'win',
  fail: 'fail',
};

const PRIV = Symbol();

class GameBoard {
  // todo: throw error when creating unplayable game
  constructor(board) {
    this[PRIV] = {
      board,
      status: 'new',
      reveals: makeBoardReveals(board),
    };
  }

  getBoardInfo() {
    const {
      board,
    } = this[PRIV];

    return {
      mines: countMines(board),
      height: board.length,
      width: board[0].length,
    }
  }

  getStatus() {
    return this[PRIV].status;
  }

  reveal(y, x) {
    const {
      board,
      reveals,
      status,
    } = this[PRIV];
    const mines = getNeigborMines(board, y, x);

    if (reveals[y][x] || ['fail', 'win'].includes(status)) return mines;
    reveals[y][x] = true;

    if (board[y][x]) {
      this[PRIV].status = BOARD_STATUS_ENUM.fail;
    } else {
      this[PRIV].status = BOARD_STATUS_ENUM.active;
    }

    if (!mines) {
      Matrix.walkNeighbors(board, y, x, (y, x) => this.reveal(y, x))
    }

    if (testVictory(board, reveals)) {
      this[PRIV].status = BOARD_STATUS_ENUM.win;
    }

    return mines;
  }
}


module.exports = GameBoard;


function countMines(board) {
  let mines = 0;

  Matrix.walk(board, (y, x, val) => {
    if (val) mines++;
  })

  return mines;
}
function makeBoardReveals(board) {
  return board.map(row => row.map(cell => false));
}
function getNeigborMines(board, y, x) {
  let count = 0;

  Matrix.walkNeighbors(board, y, x, (y, x, hasMine) => hasMine && count++);

  return count;
}
function testVictory(board, reveals) {
  return reveals.every((row, y) => row.every((cell, x) => (cell && !board[y][x]) || (!cell && board[y][x])));
}
