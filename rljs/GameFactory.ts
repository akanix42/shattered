'use strict';
// import ROT from 'shattered-lib/lib/rot-js';
// import ComponentGenerator from './ComponentGenerator';
// import EntityGenerator from './EntityGenerator';
// import LevelGenerator from './LevelGenerator';
// import Engine from 'shattered-lib/rot/TimeEngine';
// import idGenerator from 'shattered-lib/generators/idGenerator';
// import global from './global';
// import jsonc, { serializable } from 'jsonc';
// import lzstring from 'lz-string';

// class Game {
//   seed = null;
//   levels = null;
//   engine = null;
//   componentGenerator = null;
//
//   start() {
//     // this.engine.unlock();
//   }
//
//   save() {
//     const data = jsonc.stringify({ game: this });
//     localStorage.setItem('game', data);
//     localStorage.setItem('game-lz', lzstring.compress(data));
//   }
// }
//
// class GameGenerator {
//   LevelGenerator = LevelGenerator;
//
//   generate(options = {}) {
//     idGenerator.reset();
//
//     const game = new Game();
//     // global.game = game;
//     game.options = options;
//     game.seed = ROT.RNG.seed;
//     game.componentGenerator = new ComponentGenerator(game);
//     game.entityGenerator = new EntityGenerator(game);
//     game.engine = new Engine();
//     game.levels = this._generateLevels(game);
//     return game;
//   }
//
//   load() {
//     const data = localStorage.getItem('game');
//     const game = jsonc.parse(data).game;
//     return game;
//   }
//
//   _generateLevels(game) {
//     const levels = {};
//     const levelGenerator = new this.LevelGenerator(game);
//     for (var i = 0; i < game.options.numberOfLevels || 0; i++) {
//       const level = levelGenerator.generateRandom();
//       level.id = 1;
//       levels[level.id] = level;
//     }
//     return levels;
//   }
//
// }
//
// export default GameGenerator;
//
// class Game {
//
// }

import * as CurrentGame from './CurrentGame';
import generateEmptyLevel from './levelGenerators/emptyLevel';
import TimeScheduler from 'rljs/systems/TimeScheduler';
import generateEntity from 'rljs/generators/generateEntity';
import slowActor from 'rljs/entityTypes/test/slowActor';
import BehaviorSystem from 'rljs/systems/BehaviorSystem';
export default class GameFactory {
  static create() {
    CurrentGame.reset();
    const level = generateEmptyLevel();
    CurrentGame.levelManager.set(level.id, level);
    CurrentGame.systems.behaviorSystem = new BehaviorSystem();
    const scheduler = CurrentGame.systems.timeScheduler = new TimeScheduler();
    const testEntity = generateEntity(slowActor);
    return CurrentGame;
  }
}
