//var MoveCommand = require('game/commands/move-command');
//var SaveGameCommand = require('game/commands/save-game-command');
// import events from 'shattered-game/events';
import MovementSystem from 'rljs/systems/MovementSystem';

var i = 1;
const gameCommands = {
  GoLeft: moveCommand({x: -1}),
  GoRight: moveCommand({x: 1}),
  GoUp: moveCommand({y: -1}),
  GoDown: moveCommand({y: 1}),
  GoUpLeft: moveCommand({x: -1, y: -1}),
  GoUpRight: moveCommand({x: 1, y: -1}),
  GoDownRight: moveCommand({x: 1, y: 1}),
  GoDownLeft: moveCommand({x: -1, y: 1}),
  WaitInPlace: moveCommand({x: 0, y: 0}),
  //SaveGame: new SaveGameCommand()
};

export default gameCommands;

function moveCommand(direction) {
  return {event: MovementSystem.onMove, direction};
}
