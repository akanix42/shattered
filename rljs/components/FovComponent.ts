import Component from "rljs/components/Component";
import Tile from 'rljs/gameObjects/Tile';

export default class FovComponent extends Component {
  public fov: Tile[] = [];
  public previousFov: Tile[] = [];
}
