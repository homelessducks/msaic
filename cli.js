const {generate} = require('./lib/ChallengeGenerator')


setInterval(() => print(makeRandomBoard()), 1000)


function print(board) {

  board.forEach(row => {
    row.forEach(cell =>
      process.stdout.write(cell ? '@' : '*'))
    process.stdout.write('\n')
  })
}
function rand(max, min = 0) {
  return ~~(Math.random() * max) + min
}

function makeRandomBoard() {
  const h = rand(25, 4)
  const w = rand(25, 4)
  const mines_per_cell = Math.random() / 10 + .01
  const m = ~~(h * w * mines_per_cell) + 1

  console.log(h, w, m, mines_per_cell)
  return generate(h, w, m)
}
