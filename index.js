#!/usr/bin/env node

const args = process.argv.slice(2);
const Runner = require('./lib/Runner');
const GameBoard = require('./lib/GameBoard');
const Bot = require('./lib/SimpleBot');
const { generate } = require('./lib/ChallengeGenerator');

const runner = new Runner();
const data = [generate(10, 10, 3), generate(9, 9, 4)];

if (args.length < 1) {
  return process.stdout.write('There is no filename param \n');
}

const res = runner.setBoards(data)
  .setBot(new Bot())
  .getStats();

console.log(res);