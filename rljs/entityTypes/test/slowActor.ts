import { IEntityTypeDescription } from 'rljs/entityTypes/IEntityTypeDescription';
import BehaviorComponent from 'rljs/components/BehaviorComponent';
import { behaviorNames } from "rljs/systems/behaviors";

const slowActor: IEntityTypeDescription = {
  components: [
    () => new BehaviorComponent(behaviorNames.testSlow)
  ]
};
export default slowActor;
