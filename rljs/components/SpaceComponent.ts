import Component from "rljs/components/Component";

export enum Space {
  Architecture = 0,
  Occupant = 1,
  Ground = 2,
  Missile = 3,
}
export default class SpaceComponent extends Component {
  constructor(public space: Space){
    super();
  }
}
