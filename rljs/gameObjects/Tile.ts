import currentGame from "rljs/CurrentGame";
// import { IPoint } from "./IPoint";
// import { IConstructor } from "./IConstructor";
import { IComponent } from "../components/Component";
import Entity from 'rljs/gameObjects/Entity';
import IPoint from 'rljs/interfaces/IPoint';
import SpaceComponent, { Space } from 'rljs/components/SpaceComponent';
import Signal from 'rljs/gameObjects/Signal';
import Level from 'rljs/gameObjects/Level';


class FovCache {
  visionRange: number = 0;
  fovAtRadius: Tile[][] = [];

  get(visionRange: number) {
    if (this.visionRange >= visionRange) {
      return this.fovAtRadius[Math.min(this.fovAtRadius.length - 1, visionRange)];
    }
  }

  set(visionRange: number, fovAtRadius: Tile[][]) {
    this.visionRange = visionRange;
    this.fovAtRadius = fovAtRadius;
  }
}

export default class Tile {
  static onEntityAdded = Signal.create(function (entity: Entity, tile: Tile) { });
  static onEntityRemoved = Signal.create(function (entity: Entity, tile: Tile) { });

  static create(level: Level, position: IPoint, architecture: Entity) {
    const tile = new Tile;
    tile.level = level;
    tile.position = position;
    tile.architecture = architecture;
    return tile;
  }

  entities: number[] = [];
  position: IPoint;

  architecture: Entity;
  ground: Entity[] = [];
  occupant: Entity;
  missile: Entity;

  fovCache: FovCache = new FovCache;
  level: Level;

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
    entity.tile = this;
  }

  queryEntities<T>(componentType: IComponent<T>) {
    return this.entities
      .map(entityId => currentGame.entityManager.getComponent(entityId, componentType))
      .filter(component => component !== undefined);

    // create component with reuse:
    // Component.for(entityId).create<IComponent<T>>();
    // ComponentCache.get(entityId, componentType) || new componentType()
    // Tile.CollidablesComponent.collidables: number[] = this.queryEntities(CollidableComponent).map(component=>component.entityId)
  }
}
