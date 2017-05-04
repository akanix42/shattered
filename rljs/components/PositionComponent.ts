// import { IPoint } from '../gameObjects/IPoint';
import Component from "./Component";
import IPoint from 'rljs/interfaces/IPoint';

export default class PositionComponent extends Component {
  position: IPoint;
  levelId: number;
}
