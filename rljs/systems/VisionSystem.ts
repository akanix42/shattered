import Signal from '../gameObjects/Signal';

import currentGame from "rljs/CurrentGame";
import PositionComponent from "rljs/components/PositionComponent";
import CollidableComponent from "rljs/components/CollidableComponent";
import IPoint from 'rljs/interfaces/IPoint';
import Entity from 'rljs/gameObjects/Entity';
import Tile from 'rljs/gameObjects/Tile';
import StatsComponent from 'rljs/components/StatsComponent';
import MovementSystem from 'rljs/systems/MovementSystem';
import FovComponent from 'rljs/components/FovComponent';
import { FOV } from 'rot-js';
import Level from 'rljs/gameObjects/Level';
import BlockVisibleLightComponent from 'rljs/components/BlockVisibleLightComponent';
import UIVisionComponent from 'rljs/components/UIVisionComponent';
import UIVisionSystem from 'rljs/systems/UIVisionSystem';

export default class VisionSystem {
  // static onPrepareMove = Signal.create(function (entityId: number, position: IPoint): number { return 0; });

  static instance: VisionSystem;

  static reset() {
    VisionSystem.instance = new VisionSystem;
  }

  private shadowCaster = new FOV.PreciseShadowcasting(this.checkIfLightPasses.bind(this));

  constructor() {
    // MovementSystem.onMove.watch(this.move);
    MovementSystem.onPositioned.watch(this.updateFov.bind(this))
  }

  private updateFov(entity: Entity, newPosition: IPoint, oldPosition: IPoint) {
    const fovComponent = entity.getComponent(FovComponent);
    if (!fovComponent) {
      return;
    }

    const stats = entity.getKnownComponent(StatsComponent).stats;
    const visionRange = stats.visionRange.current;

    if (visionRange === 0) {
      if (fovComponent.fov.length === 0 && fovComponent.previousFov.length === 0) {
        return;
      }
      fovComponent.previousFov = fovComponent.fov;
      fovComponent.fov = [];
      return;
    }

    const cachedFov = entity.tile.fovCache.get(visionRange);
    if (cachedFov) {
      fovComponent.previousFov = fovComponent.fov;
      return fovComponent.fov = cachedFov;
    }

    const { fov, tileFovCache } = this.calculateFov(entity.tile.position, visionRange, entity.tile.level);
    fovComponent.previousFov = fovComponent.fov;
    fovComponent.fov = fov;
    entity.tile.fovCache.set(visionRange, tileFovCache);

    if (entity.getComponent(UIVisionComponent)) {
      UIVisionSystem.instance.updateVision(fovComponent);
    }
  }

  private calculateFov(position: IPoint, visionRange: number, level: Level) {
    const fov: Tile[] = [];
    const tileFovCache: Tile[][] = [];
    const fovAtRadius: Tile[][] = [];
    // const map = this.entity.tile.map;
    // var clearSightDistance = visionRange * 0.667;

    if (visionRange === 0)
      return { fov, tileFovCache };

    const map = level.map;
    this.shadowCaster.compute(position.x, position.y, visionRange,
      function recordVisibleTile(x, y, distance, visibility) {
        if (visibility === 0 || x < 0 || y < 0 || x >= level.width || y >= level.height)
          return;
        const ring = fovAtRadius[distance] || (fovAtRadius[distance] = []);
        const tile = map[x][y];
        ring.push(tile);
        // if (distance > clearSightDistance)
        //   visibility = (visionRange - distance) / (visionRange - clearSightDistance);
        fov.push(tile);
      });

    let previousFov: Tile[] = [];
    for (let i = 0; i < fovAtRadius.length; i++)
      previousFov = tileFovCache[i] = fovAtRadius[i].concat(previousFov);
    return { fov, tileFovCache };
  }

  private checkIfLightPasses(level: Level, x: number, y: number) {
    if (x < 0 || y < 0 || x >= level.width || y >= level.height)
      return false;

    const tile = level.map[x][y];
    const isBlockingLight = tile.queryEntities(BlockVisibleLightComponent).length > 0;
    return !isBlockingLight;
  }
}
