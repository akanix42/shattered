import TimeScheduler, { TimeSpent } from './TimeScheduler';
import Signal from '../gameObjects/Signal';
import IStringMap from 'rljs/interfaces/IStringMap';
import { entityManager, systems } from 'rljs/CurrentGame';
import BehaviorComponent from 'rljs/components/BehaviorComponent';
import behaviors from './behaviors';
import Entity from 'rljs/gameObjects/Entity';

export enum BehaviorResult {
  Skipped = -2,
  WaitForSignal = TimeSpent.WaitForSignal as number,
}
export interface IBehavior {
  (entity: Entity): number
}
export default class BehaviorSystem {
  static behaviors: IStringMap<IBehavior> = {};
  static onAct = Signal.create(function (entityId: number) { });

  static instance: BehaviorSystem;

  static reset() {
    BehaviorSystem.instance = new BehaviorSystem();
  }

  static act(entityId: number) {
    return BehaviorSystem.instance.act(entityId);
  }

  constructor() {
    TimeScheduler.onAct.watch((entityId): number => {
      const entity = entityManager.get(entityId);
      if (entity === undefined) {
        return TimeSpent.RemoveEntry;
      }

      const behaviorComponent = entity.getComponent(BehaviorComponent);
      if (behaviorComponent === undefined) {
        return TimeSpent.RemoveEntry;
      }

      return behaviors[behaviorComponent.behavior](entity);
    })
  }

  act(entityId: number): number {
    const entity = entityManager.get(entityId);
    if (entity === undefined) {
      return TimeSpent.RemoveEntry;
    }

    const behaviorComponent = entity.getComponent(BehaviorComponent);
    if (behaviorComponent === undefined) {
      return TimeSpent.RemoveEntry;
    }

    const result = behaviors[behaviorComponent.behavior](entity);
    if (result === BehaviorResult.Skipped) {
      return TimeSpent.Default;
    }

    return result;
  }

  continue(result: number) {
    if (result === BehaviorResult.Skipped) {
      return TimeSpent.Default;
    }
    systems.timeScheduler.continue(result);
  }
}

// let behaviorSystem = new BehaviorSystem();
// export default behaviorSystem;
//
// export function reset() {
//   return behaviorSystem = new BehaviorSystem();
// }
