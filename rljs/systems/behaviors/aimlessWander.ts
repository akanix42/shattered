import BehaviorSystem from "rljs/systems/BehaviorSystem";
import Entity from "rljs/gameObjects/Entity";
import { entityManager } from "rljs/CurrentGame";
import PositionComponent from "rljs/components/PositionComponent";
import { RNG } from "rot-js";
import MovementSystem from "rljs/systems/MovementSystem";

export default function aimlessWanderBehavior(entity: Entity) {
  const positionComponent = entity.getComponent(PositionComponent);
  if (!positionComponent) return 0;
  const newPosition = { x: positionComponent.position + RNG.getUniformInt(-1, 1), y: positionComponent.position + RNG.getUniformInt(-1, 1) };
  MovementSystem.onMove.dispatch(entity.id, newPosition);

  return 0;
}


// BehaviorSystem.behaviors.aimlessWander = aimlessWanderBehavior;
// BehaviorSystem.behaviors.set('aimlessWander', aimlessWanderBehavior);
