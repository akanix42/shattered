import Component from "rljs/components/Component";

interface IComponentData {
  name: string
  character: string
  color: string
}
export default class UIComponent extends Component {
  constructor(readonly name: string, readonly character: string, readonly color: string) {
    super();

  }
}
