import screenStack from './screenStack';

export default class Screen {
  screenStack = screenStack;

  show() {
    this.screenStack.container.appendChild(this._display.getContainer());
    this.screenStack.push(this);
    $(this._display.getContainer()).show();
  }

  hide() {
    this.screenStack.pop(this);
    $(this._display.getContainer()).hide();
  }

  render() {
  }

  handleInput() {

  }
}
