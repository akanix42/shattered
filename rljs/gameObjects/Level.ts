import Tile from "./Tile";
import getNextId from 'rljs/idGenerator';
import IPoint from 'rljs/interfaces/IPoint';

export default class Level {
  static create(size: IPoint) {
    const map = initializeMap(size);
    const level = new Level(map, size);
    level.id = getNextId();
    // level.map = map;

    return level;
  }

  id = 0;
  width: number;
  height: number;

  private constructor(public map: Tile[][], size: IPoint) {
    this.width = size.x;
    this.height = size.y;
  }

  getTile(point: IPoint) {
    const column = this.map[point.x];
    if (!column)
      return;
    return column[point.y];
  }

}


function initializeMap(size: IPoint) {
  const map: Tile[][] = [];
  for (let x = 0; x < size.x; x++) {
    map[x] = new Array<Tile>(size.y);
  }
  return map;
}
