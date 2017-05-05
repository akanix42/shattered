import Signal from '../gameObjects/Signal';

import currentGame from "rljs/CurrentGame";
import PositionComponent from "rljs/components/PositionComponent";
import CollidableComponent from "rljs/components/CollidableComponent";
import PositionSystem from "rljs/systems/PositionSystem";
import IPoint from 'rljs/interfaces/IPoint';
import Entity from 'rljs/gameObjects/Entity';
import Tile from 'rljs/gameObjects/Tile';
import StatsComponent from 'rljs/components/StatsComponent';

/* ONLY negative numbers! 0+ are used for denoting time spent */
export enum MovementResult {
  Canceled = -1,
  InvalidTile = -2,
}

export default class MovementSystem {
  static onPrepareMove = Signal.create(function (entityId: number, position: IPoint): number { return 0; });
  static onMove = Signal.create(function (entityId: number, position: IPoint): number { return 0; });
  static onPositioned = Signal.create(function (entityId: number, newPosition: IPoint, oldPosition: IPoint) { });

  static instance: MovementSystem;

  static reset() {
    MovementSystem.instance = new MovementSystem;
  }

  constructor() {
    // MovementSystem.onMove.watch(this.move);
  }

  public attemptMove(entity: Entity, position: IPoint) {
    const positionComponent = entity.getComponent(PositionComponent);
    if (!positionComponent) {
      return MovementResult.Canceled;
    }

    const level = currentGame.levelManager.get(positionComponent.levelId);
    if (!level) return MovementResult.Canceled;

    const targetTile = level.getTile(position);
    if (!targetTile) return MovementResult.InvalidTile;

    if (this.willCollideWithAnotherEntity(targetTile)) {
      return MovementResult.Canceled;
    }

    this.setPosition(entity, positionComponent, targetTile);
    return this.calculateMoveTime(entity, targetTile);
  }

  private willCollideWithAnotherEntity(targetTile: Tile): boolean {
    // Check for collision with entities at the target tile
    const entities = targetTile.queryEntities(CollidableComponent);
    return !!entities.length;
  }

  private setPosition(entity: Entity, positionComponent: PositionComponent, targetTile: Tile) {
    const oldPosition = positionComponent.position;
    positionComponent.position = targetTile.position;
    targetTile.addEntity(entity);
    MovementSystem.onPositioned.dispatch(entity.id, targetTile.position, oldPosition);
  }

  private calculateMoveTime(entity: Entity, targetTile: Tile) {
    const statsComponent = entity.getKnownComponent(StatsComponent);
    const stats = statsComponent.stats;
    return stats.movementSpeed.value;
  }

}
