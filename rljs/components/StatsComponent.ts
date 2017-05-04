import Component from "rljs/components/Component";

export interface IStats {
  movementSpeed: Stat
}

class Stat {
  value: number
}

function getDefaultStats(): IStats {
  return {
    movementSpeed: new Stat
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
