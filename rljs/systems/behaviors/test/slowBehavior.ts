import BehaviorSystem, { BehaviorResult } from "rljs/systems/BehaviorSystem";
import Entity from "rljs/gameObjects/Entity";
import { entityManager } from "rljs/CurrentGame";
import PositionComponent from "rljs/components/PositionComponent";
import { RNG } from "rot-js";
import MovementSystem from "rljs/systems/MovementSystem";
import { TimeSpent } from 'rljs/systems/TimeScheduler';
import {systems} from 'rljs/CurrentGame';
import aimlessWanderBehavior from 'rljs/systems/behaviors/aimlessWander';

let i = 0;
export default function testSlowBehavior(entity: Entity) {
  console.log('slow behavior', i++)
  setTimeout(function() {
    let timeSpent = aimlessWanderBehavior(entity);
    systems.behaviorSystem.continue(timeSpent);
  }, 1000);
  return TimeSpent.WaitForSignal;
}

// BehaviorSystem.behaviors.aimlessWander = aimlessWanderBehavior;
// BehaviorSystem.behaviors.set('aimlessWander', aimlessWanderBehavior);
