import { entityManager } from '../CurrentGame';
// import { IPoint } from "./IPoint";
// import { IConstructor } from "./IConstructor";
import { IComponent } from "../components/Component";
import Entity from 'rljs/gameObjects/Entity';
import IPoint from 'rljs/interfaces/IPoint';
import SpaceComponent, { Space } from 'rljs/components/SpaceComponent';
export default class Tile {
  static create(levelId: number, position: IPoint, architecture: Entity) {
    const tile = new Tile;
    tile.levelId = levelId;
    tile.position = position;
    tile.architecture = architecture;
    return tile;
  }

  entities: number[] = [];
  position: IPoint;
  private levelId: number;

  architecture: Entity;
  ground: Entity[] = [];
  occupant: Entity;
  missile: Entity;

  private constructor() {

  }

  addEntity(entity: Entity) {
    const spaceComponent = entity.getKnownComponent(SpaceComponent);
    const space = spaceComponent.space;
    switch (space) {
      case Space.Architecture:
        this.architecture = entity;
        break;
      case Space.Ground:
        if (!this.ground.indexOf(entity)) {
          this.ground.push(entity);
        }
        break;
      case Space.Occupant:
        this.occupant = entity;
        break;
      case Space.Missile:
        this.missile = entity;
        break;
    }
  }

  queryEntities<T>(componentType: IComponent<T>) {
    return this.entities
      .map(entityId => entityManager.getComponent(entityId, componentType))
      .filter(component => component !== undefined);

    // create component with reuse:
    // Component.for(entityId).create<IComponent<T>>();
    // ComponentCache.get(entityId, componentType) || new componentType()
    // Tile.CollidablesComponent.collidables: number[] = this.queryEntities(CollidableComponent).map(component=>component.entityId)
  }
}
