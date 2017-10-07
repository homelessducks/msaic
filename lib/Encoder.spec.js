const ChallengeGenerator = require('./ChallengeGenerator');
const Encoder = require('./Encoder');


describe('Encoder', () => {
  it('encode', () => {
    const Game = mockGame();
    const encoder = mockEncoder();

    encoder.encode(Game, 'test')
      .should.be.String();

  });

  it('decode', () => {
    const encoder = mockEncoder();

    const data = [];

    for (let i = 0; i < 10; i += 1) {
      data.push(mockGame());
    }

    encoder.encode(data, 'test');

    encoder.decode('test.json')
      .should.be.Array();
  });

  it('encode without arguments', () => {
    const encoder = mockEncoder();

    encoder.encode()
      .should.Error();
  });

  it('decode without arguments', () => {
    const encoder = mockEncoder();


    encoder.decode()
      .should.Error();
  });

  it('decode nonexistent file', () => {
    const encoder = mockEncoder();


    encoder.decode(Math.random())
    .should.Error();
  });


  function mockEncoder() {
    const fileName = 'test';
    const format = 'json';

    return new Encoder(fileName, format);
  }

  function mockGame() {
    const height = 6;
    const width = 6;
    const mines = 2;

    return ChallengeGenerator.generate(height, width, mines)
  }
});