import Level from './gameObjects/Level';
import { IComponent } from './components/Component';
import Entity from './gameObjects/Entity';
import TimeScheduler from 'rljs/systems/TimeScheduler';
import BehaviorSystem from 'rljs/systems/BehaviorSystem';
import MovementSystem from 'rljs/systems/MovementSystem';


class EntityManager {
  entities: Map<number, Entity> = new Map;

  add(entity: Entity) {
    this.entities.set(entity.id, entity);
  }

  get(entityId: number) {
    return this.entities.get(entityId);
  }

  getComponent<T>(entityId: number, componentType: IComponent<T>) {
    const entity = this.get(entityId);
    if (!entity) return;

    return entity.getComponent(componentType);
  }

  clear() {
    this.entities.clear();
  }
}

export const entityManager = new EntityManager();
export const levelManager: Map<number, Level> = new Map();
interface ISystems {
  timeScheduler: TimeScheduler,
  behaviorSystem: BehaviorSystem,
  movementSystem: MovementSystem,
}
export const systems = {} as ISystems; // timeScheduler: undefined
export function reset() {
  entityManager.clear();
  levelManager.clear();
  BehaviorSystem.reset();
  MovementSystem.reset();
}
export default {
  entityManager,
  levelManager,
  systems,
  reset,
}
