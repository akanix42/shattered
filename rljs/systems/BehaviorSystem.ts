import TimeScheduler, { TimeSpent } from './TimeScheduler';
import Signal from '../gameObjects/Signal';
import IStringMap from 'rljs/interfaces/IStringMap';
import { entityManager } from 'rljs/CurrentGame';
import BehaviorComponent from 'rljs/components/BehaviorComponent';
import behaviors from './behaviors';
import Entity from 'rljs/gameObjects/Entity';

export interface IBehavior {
  (entity: Entity): number
}
export default class BehaviorSystem {
  static behaviors: IStringMap<IBehavior> = {};
  static onAct = Signal.create(function (entityId: number) { });

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
}
