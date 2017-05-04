import Level from 'rljs/gameObjects/Level';
import Tile from "rljs/gameObjects/Tile";
import generateEntity from 'rljs/generators/generateEntity';
import architecture from 'rljs/entityTypes/architecture';

export default function generateLevel() {
  const level = Level.create({ x: 10, y: 10 });
  generateMap(level);
  return level;
}

function generateMap(level: Level) {
  const map = level.map;
  for (let x = 0; x < map.length; x++)
    for (let y = 0, column = map[x]; y < column.length; y++)
      column[y] = Tile.create(level.id, {x, y}, generateEntity(architecture.dirtFloor));
}
