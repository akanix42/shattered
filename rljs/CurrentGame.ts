import Level from './gameObjects/Level';
import { IComponent } from './components/Component';
import Entity from './gameObjects/Entity';
import TimeScheduler from 'rljs/systems/TimeScheduler';
import BehaviorSystem from 'rljs/systems/BehaviorSystem';
import MovementSystem from 'rljs/systems/MovementSystem';
import Signal from 'rljs/gameObjects/Signal';
import Tile from 'rljs/gameObjects/Tile';


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
interface ISystems {
  timeScheduler: TimeScheduler,
  behaviorSystem: BehaviorSystem,
  movementSystem: MovementSystem,
}

class CurrentGame {
  entityManager: EntityManager;
  levelManager: Map<number, Level>;
  systems: ISystems;
  onFOVUpdate = Signal.create(function (tiles: Tile[]) { });

  constructor() {
    this.entityManager = new EntityManager();
    this.levelManager = new Map();
    this.systems = {} as ISystems;
  }

  reset() {
    this.entityManager.clear();
    this.levelManager.clear();
    BehaviorSystem.reset();
    MovementSystem.reset();
  }
}
export default new CurrentGame();

