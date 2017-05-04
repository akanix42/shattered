import BehaviorSystem, { BehaviorResult } from "rljs/systems/BehaviorSystem";
import Entity from "rljs/gameObjects/Entity";
import { entityManager } from "rljs/CurrentGame";
import PositionComponent from "rljs/components/PositionComponent";
import { RNG } from "rot-js";
import MovementSystem, { MovementResult } from "rljs/systems/MovementSystem";
import { TimeSpent } from 'rljs/systems/TimeScheduler';
import IPoint from 'rljs/interfaces/IPoint';

const allDirections: IPoint[] = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

export default function aimlessWanderBehavior(entity: Entity) {
  const positionComponent = entity.getComponent(PositionComponent);
  if (!positionComponent) return 0;

  const availableDirections = allDirections.slice();
  // MovementSystem.onMove.dispatch(entity.id, newPosition);

  let result: MovementResult;
  do {
    let newPosition = pickNewPosition(positionComponent.position, availableDirections);
    result = MovementSystem.instance.attemptMove(entity, newPosition);
    if (result === MovementResult.InvalidTile)
      console.log('tile invalid, retrying');
  } while (result === MovementResult.InvalidTile && availableDirections.length);

  if (result === MovementResult.Canceled) {
    return BehaviorResult.Skipped;
  }
  return 0;
}

function pickNewPosition(position: IPoint, availableDirections: IPoint[]) {
  const nextDirectionIndex = RNG.getUniformInt(0, availableDirections.length - 1);
  const nextDirection = availableDirections.splice(nextDirectionIndex, 1)[0];
  const newPosition = {
    x: position.x + nextDirection.x,
    y: position.y + nextDirection.y,
  };
  return newPosition;
}

// BehaviorSystem.behaviors.aimlessWander = aimlessWanderBehavior;
// BehaviorSystem.behaviors.set('aimlessWander', aimlessWanderBehavior);
