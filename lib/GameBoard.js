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
      walkNeigbors(board, y, x, (y, x) => this.reveal(y, x))
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

  for (let x = 0; x < board.length; x += 1) {
    const row = board[x];

    for (let y = 0; y < row.length; y += 1) {
      if (row[y]) mines += 1;
    }
  }

  return mines;
}
function makeBoardReveals(board) {
  return board.map(row => row.map(cell => false));
}
function getNeigborMines(board, y, x) {
  let count = 0;

  walkNeigbors(board, y, x, (y, x, hasMine) => hasMine && count++)

  return count
}
function walkNeigbors(board, y, x, walker) {
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
    board[y] !== undefined &&
    board[y][x] !== undefined &&
    walker(y, x, board[y][x])
  )
}
function testVictory(board, reveals) {
  return reveals.every((row, y) => row.every((cell, x) => (cell && !board[y][x]) || (!cell && board[y][x])));
}