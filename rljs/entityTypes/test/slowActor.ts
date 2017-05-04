import { IEntityTypeDescription } from 'rljs/entityTypes/IEntityTypeDescription';
import BehaviorComponent from 'rljs/components/BehaviorComponent';
import { behaviorNames } from "rljs/systems/behaviors";
import PositionComponent from 'rljs/components/PositionComponent';
import occupant from 'rljs/entityTypes/occupants/occupant';

const slowActor: IEntityTypeDescription = occupant({
  components: [
    () => new BehaviorComponent(behaviorNames.testSlow),
  ]
});
export default slowActor;
