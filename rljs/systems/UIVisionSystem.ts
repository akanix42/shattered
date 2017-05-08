import VisionSystem from 'rljs/systems/VisionSystem';
import Tile from 'rljs/gameObjects/Tile';
import FovComponent from 'rljs/components/FovComponent';
import Signal from '../gameObjects/Signal';

export default class UIVisionSystem {
  static instance: UIVisionSystem;
  static onVisionUpdated = Signal.create(function (newTiles: Tile[], removedTiles: Tile[], stillVisibleTiles: Tile[]) { });
  static onTileUpdated = Signal.create(function (tile: Tile) { });
  
  updateVision(fovComponent: FovComponent) {
    const newTiles = [];
    const stillVisibleTiles = [];
    const removedTiles = [];
    const { fov, previousFov } = fovComponent;
    for (let i = 0; i < fov.length; i++) {
      const tile = fov[i];
      // collect all of the newly encountered tiles
      if (previousFov.indexOf(tile) === -1) {
        newTiles.push(tile);
      } else {
        // and also the still visible tiles, so we can 
        // separate them from the no longer visible tiles
        stillVisibleTiles.push(tile);
        // start watching visible tiles so the UI is notified
        // to re-render them instead of waiting for the fov to change
        tile.entityAddedToTileEmitter.subscribe(this);
        tile.entityRemovedFromTileEmitter.subscribe(this);
      }
    }
    for (let i = 0; i < previousFov.length; i++) {
      if (stillVisibleTiles.indexOf(tile) === -1) {
        // collect all no longer visible tiles so the UI
        // is aware of them
        removedTiles.push(tile);
        // stop watching tiles that are no longer visible
        tile.entityAddedToTileEmitter.unsubscribe(this);
        tile.entityRemovedFromTileEmitter.unsubscribe(this);
      }
    }
    
    UIVisionSystem.onVisionUpdated.dispatch(newTiles, removedTiles, stillVisibleTiles);
  }
  
  onEntityAddedToTile(tile: Tile) {
    UIVisionSystem.onTileUpdated.dispatch(tile);
  }
  
  onEntityRemovedFromTile(tile: Tile) {
    UIVisionSystem.onTileUpdated.dispatch(tile);
  }
}

