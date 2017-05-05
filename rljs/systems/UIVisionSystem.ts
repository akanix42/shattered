import VisionSystem from 'rljs/systems/VisionSystem';
import Tile from 'rljs/gameObjects/Tile';
import FovComponent from 'rljs/components/FovComponent';

export default class UIVisionSystem {
  static instance: UIVisionSystem;

  updateVision(fovComponent: FovComponent) {
    //
    // const newTiles = [];
    // const previousFovSet = new Set(this._previousFov);
    // this.fov.forEach(tile => {
    //   if (!previousFovSet.has(tile)) {
    //     tile._handlers.add(this._onEntityAddedHandler);
    //     tile._handlers.add(this._onEntityRemovedHandler);
    //     newTiles.push(tile);
    //   }
    //   else {
    //     /**
    //      * This tile is still in the fov, remove it so we will only have unused tiles left
    //      */
    //     previousFovSet.delete(tile);
    //   }
    // });
    //
    // previousFovSet.forEach(tile=> {
    //   tile._handlers.remove(this._onEntityAddedHandler);
    //   tile._handlers.remove(this._onEntityRemovedHandler);
    // });
    //
    // postal.publish({
    //   topic: 'ui.vision.reset',
    //   data: {
    //     fov: newTiles,
    //     removedTiles: [...previousFovSet]
    //   }
    // });
  }
}

