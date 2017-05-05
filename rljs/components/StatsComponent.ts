import Component from "rljs/components/Component";

export interface IStats {
  movementSpeed: Stat,
  visionRange: Stat,
}

class Stat {
  value: number = 0;

  get current() {
    return this.value;
  }
}

function getDefaultStats(): IStats {
  return {
    movementSpeed: new Stat,
    visionRange: new Stat,
  }
}
export default class StatsComponent extends Component {
  static createDefault() {
    return new StatsComponent()
  }
  // behavior: string
  constructor(public stats: IStats = getDefaultStats()) {
    super();
  }
}
