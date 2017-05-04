import { createDisplay } from '../display';
// import gameInput from '../game-input';
// import global from 'shattered-game/global';
// import gameCommands from '../game-commands';
// import ROT from 'rot-js';
import Screen from './Screen';
// import inventoryScreen from './inventoryScreen';
// import {postal} from 'shattered-game/global';
//
import CurrentGame from 'rljs/CurrentGame';
import UIComponent from 'rljs/components/UIComponent';
import Tile from 'rljs/gameObjects/Tile';
import Entity from 'rljs/gameObjects/Entity';
import { IComponent } from 'rljs/components/Component';
class InGameScreen extends Screen {
  game = CurrentGame;
  // _keyMap = getKeyMap.call(this);
  _display = createDisplay();
  _isInitialized = false;

  init() {
    if (this._isInitialized)
      return;

    // postal.subscribe({
    //   topic: 'ui.vision.update',
    //   callback: (data)=> {
    //     this.renderTile(data.tile);
    //   }
    // });
    // postal.subscribe({
    //   topic: 'ui.vision.reset',
    //   callback: (data)=> {
    //     this.renderFov(data.fov);
    //   }
    // });
    this._isInitialized = true;
  }

  load(game: any) {
    this.game = game;
    this.render();

    // global.screen = this;
  }

  render() {
    this._display.clear();
    if (this.game === undefined)
      return;
    const level = this.game.levelManager.get(1);
    if (!level) {
      return;
    }
    const map = level.map;
    for (let x = 0; x < map.length; x++) {
      const column = map[x];
      for (let y = 0; y < column.length; y++) {
        const tile = column[y];
        this.renderTile(tile);
      }
    }
  }

  renderFov(fov: any) {
    fov.forEach(this.renderTile.bind(this));
  }

  renderTile(tile: Tile) {
    const uiComponent = findComponent([tile.missile, tile.occupant, tile.ground, tile.architecture], UIComponent);
    if (!uiComponent) {
      return;
    }

    this._display.draw(tile.position.x, tile.position.y, uiComponent.character, uiComponent.color, 'black');

    // const transient = tile.transients.length === 0 ? null : tile.transients[tile.transients.length - 1];
    // const entityToRender = transient || tile.occupant || tile.architecture;
    // this._display.draw(tile.point.x, tile.point.y, entityToRender.template.character, entityToRender.template.color, 'black');
  }

  handleInput(inputType: any, inputData: any) {
    // var command = this._keyMap[inputType][inputData.keyCode];
    // if (!command) return;
    //
    // if (typeof command === 'function')
    //   command = command();
    // if (command)
    //   gameInput.add(command);
  }
}
type EntityOrEntitySet = Entity | Entity[] | undefined | null;
function findComponent<T>(entities: EntityOrEntitySet[], componentType: IComponent<T>): T | undefined {
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (!entity) {
      continue;
    }
    let component;
    if (entity instanceof Array) {
      component = findComponent(entity, componentType);
    } else {
      component = entity.getComponent(componentType);
    }
    if (component) {
      return component;
    }
  }
}
export default new InGameScreen();
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
