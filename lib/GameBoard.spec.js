const GameBoard = require('./GameBoard');

describe('Game Board', () => {
  const small_board = [
    [false, false, false],
    [false, false, false],
    [false, false, true],
  ];

  it('getBoardInfo', () => {
    mockSmallBoard()
    .getBoardInfo()
    .should.deepEqual({
      height: 3,
      width: 3,
      mines: 1,
    })
  });

  it('getStatus new', () => {
    mockSmallBoard()
    .getStatus()
    .should.be.equal('new')
  });

  it('getStatus active', () => {
    const Board = mockSmallBoard();

    Board.reveal(1, 1);

    Board
    .getStatus()
    .should.be.equal('active')
  });

  it('getStatus fail', () => {
    const Board = mockSmallBoard();

    Board.reveal(2, 2);

    Board
    .getStatus()
    .should.be.equal('fail')
  });

  it('getStatus win', () => {
    const Board = mockSmallBoard();

    Board.reveal(0, 0);

    Board
    .getStatus()
    .should.be.equal('win')
  });

  function mockSmallBoard() {
    return new GameBoard(small_board);
  }
});
