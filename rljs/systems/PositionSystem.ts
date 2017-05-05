import Signal from '../gameObjects/Signal';
import PositionComponent from '../components/PositionComponent';
import currentGame from "rljs/CurrentGame";
import IPoint from 'rljs/interfaces/IPoint';

export default class PositionSystem {
  static onPosition = Signal.create(function (entityId: number, newPosition: IPoint) { });
  static onPositioned = Signal.create(function (entityId: number, newPosition: IPoint, oldPosition: IPoint) { });

  constructor() {
    PositionSystem.onPosition.watch(this.onPosition);
  }

  private onPosition(entityId: number, newPosition: IPoint) {
    const entity = currentGame.entityManager.get(entityId);
    if (!entity) return;

    const positionComponent = entity.getComponent(PositionComponent);
    if (!positionComponent) return;

    const oldPosition = positionComponent.position;
    positionComponent.position = newPosition;

    PositionSystem.onPositioned.dispatch(entityId, newPosition, oldPosition);
  }

}
