import BehaviorSystem, { BehaviorResult } from "rljs/systems/BehaviorSystem";
import Entity from "rljs/gameObjects/Entity";
import currentGame from "rljs/CurrentGame";
import PositionComponent from "rljs/components/PositionComponent";
import { RNG } from "rot-js";
import MovementSystem from "rljs/systems/MovementSystem";
import { TimeSpent } from 'rljs/systems/TimeScheduler';
import aimlessWanderBehavior from 'rljs/systems/behaviors/aimlessWander';

let i = 0;
export default function testSlowBehavior(entity: Entity) {
  console.log('slow behavior', i++)
  setTimeout(function() {
    let timeSpent = aimlessWanderBehavior(entity);
    currentGame.systems.behaviorSystem.continue(timeSpent);
  }, 1000);
  return TimeSpent.WaitForSignal;
}

// BehaviorSystem.behaviors.aimlessWander = aimlessWanderBehavior;
// BehaviorSystem.behaviors.set('aimlessWander', aimlessWanderBehavior);
