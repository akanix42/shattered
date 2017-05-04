import Signal from '../gameObjects/Signal';

import { entityManager, levelManager } from "rljs/CurrentGame";
import PositionComponent from "rljs/components/PositionComponent";
import CollidableComponent from "rljs/components/CollidableComponent";
import PositionSystem from "rljs/systems/PositionSystem";
import IPoint from 'rljs/interfaces/IPoint';

export default class MovementSystem {
  static onPrepareMove = Signal.create(function (entityId: number, position: IPoint): number { return 0; });
  static onMove = Signal.create(function (entityId: number, position: IPoint): number { return 0; });

  constructor() {
    MovementSystem.onMove.watch(this.move);
  }

  private move = (entityId: number, position: IPoint) => {
    // Cancel the move if it will cause a collision
    if (this.willCollideWithAnotherEntity(entityId, position)) {
      return 0;
    }

    // perform the move
    PositionSystem.onPosition.dispatch(entityId, position);
    return 0;
  }

  private willCollideWithAnotherEntity(entityId: number, position: IPoint) {
    const entity = entityManager.get(entityId);
    if (!entity) return;

    // Retrieve position component
    const positionComponent = entity.getComponent(PositionComponent);
    if (!positionComponent) return;

    // Retrieve level
    const level = levelManager.get(positionComponent.levelId);
    if (!level) return;

    // Check for collision with entities at the target title
    const entities = level.getTile(position).queryEntities(CollidableComponent);
    if (entities.length)
      return true;
  }

}
