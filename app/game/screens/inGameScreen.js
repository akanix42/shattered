// import {createDisplay} from '../display';
// import gameInput from '../game-input';
// import global from 'shattered-game/global';
// import gameCommands from '../game-commands';
// import ROT from 'rot-js';
// import Screen from './Screen';
// import inventoryScreen from './inventoryScreen';
// import {postal} from 'shattered-game/global';
//
// class InGameScreen extends Screen {
//   game = null;
//   _keyMap = getKeyMap.call(this);
//   _display = createDisplay();
//   _isInitialized = false;
//
//   init() {
//     if (this._isInitialized)
//       return;
//     postal.subscribe({
//       topic: 'ui.vision.update',
//       callback: (data)=> {
//         this.renderTile(data.tile);
//       }
//     });
//     postal.subscribe({
//       topic: 'ui.vision.reset',
//       callback: (data)=> {
//         this.renderFov(data.fov);
//       }
//     });
//     this._isInitialized = true;
//   }
//
//   load(game) {
//     this.game = game;
//     global.screen = this;
//   }
//
//   render(gameState = this.gameState) {
//     this._display.clear();
//   }
//
//   renderFov(fov) {
//     fov.forEach(this.renderTile.bind(this));
//   }
//
//   renderTile(tile) {
//     const transient = tile.transients.length === 0 ? null : tile.transients[tile.transients.length - 1];
//     const entityToRender = transient || tile.occupant || tile.architecture;
//     this._display.draw(tile.point.x, tile.point.y, entityToRender.template.character, entityToRender.template.color, 'black');
//   }
//
//   handleInput(inputType, inputData) {
//     var command = this._keyMap[inputType][inputData.keyCode];
//     if (!command) return;
//
//     if (typeof command === 'function')
//       command = command();
//     if (command)
//       gameInput.add(command);
//   }
// }
//
// export default new InGameScreen();
//
// function getKeyMap() {
//   const keyMap = {keydown: {}, keyup: {}, keypress: {}};
//   const keydown = keyMap.keydown,
//     keyup = keyMap.keyup;
//   //keyup[ROT.VK_RETURN] = win;
//   //keyup[ROT.VK_ESCAPE] = lose;
//   keydown[ROT.VK_LEFT] = gameCommands.GoLeft;
//   keydown[ROT.VK_RIGHT] = gameCommands.GoRight;
//   keydown[ROT.VK_UP] = gameCommands.GoUp;
//   keydown[ROT.VK_DOWN] = gameCommands.GoDown;
//   keydown[ROT.VK_NUMPAD4] = gameCommands.GoLeft;
//   keydown[ROT.VK_NUMPAD7] = gameCommands.GoUpLeft;
//   keydown[ROT.VK_NUMPAD8] = gameCommands.GoUp;
//   keydown[ROT.VK_NUMPAD9] = gameCommands.GoUpRight;
//   keydown[ROT.VK_NUMPAD6] = gameCommands.GoRight;
//   keydown[ROT.VK_NUMPAD3] = gameCommands.GoDownRight;
//   keydown[ROT.VK_NUMPAD2] = gameCommands.GoDown;
//   keydown[ROT.VK_NUMPAD1] = gameCommands.GoDownLeft;
//   keydown[ROT.VK_NUMPAD5] = gameCommands.WaitInPlace;
//   //keydown[ROT.VK_S] = gameCommands.SaveGame;
//   //keydown[ROT.VK_F1] = toggleRenderMode.bind(this);
//   //keydown[ROT.VK_COMMA] = handlePickupCommand.bind(this);
//   keydown[ROT.VK_I] = showInventoryCommand.bind(this);
//   keydown[ROT.VK_S] = saveGameCommand.bind(this);
//   keydown[ROT.VK_Q] = quitGameCommand.bind(this);
//   keydown[ROT.VK_Z] = () => displayInSideBar('SpellBook');
//   //keydown[ROT.VK_Z] = handleSpellCastCommand.bind(this);
//
//   return keyMap;
//
// }
//
// function displayInSideBar(componentName) {
//   postal.publish({topic:'ui.sideBar.display', data: componentName});
// }
//
// function showInventoryCommand() {
//   inventoryScreen.show();
// }
//
// function saveGameCommand() {
//   this.game.save();
//   this.game.engine.lock();
//   this.hide();
// }
//
// function quitGameCommand() {
//   this.game.engine.lock();
//   this.hide();
// }
