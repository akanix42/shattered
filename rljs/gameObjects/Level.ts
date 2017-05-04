import Tile from "./Tile";
import getNextId from 'rljs/idGenerator';
import IPoint from 'rljs/interfaces/IPoint';
// import { IPoint } from "./IPoint";
export default class Level {
  static create(size: IPoint) {
    const map = initializeMap(size);
    const level = new Level(map);
    level.id = getNextId();
    // level.map = map;

    return level;
  }

  id = 0;

  private constructor(public map: Tile[][]) {

  }

  getTile(point: IPoint) {
    return this.map[point.x][point.y];
  }
}

function initializeMap(size: IPoint) {
  const map: Tile[][] = [];
  for (let x = 0; x < size.x; x++) {
    map[x] = new Array<Tile>(size.y);
  }
  return map;
}
