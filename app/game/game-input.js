import global from 'shattered-game/global';

class GameInput {
  _storedInput = [];
  _gotInput = null;

  constructor() {
    global.input = this;
  }

  add(input) {
    this._storedInput.push(input);
    if (this._gotInput)
      this._gotInput();
  }

  retrieve() {
    if (this._storedInput.length)
      return this._storedInput.shift();
    else
      return new Promise((resolve)=> {
        _gotInput = resolve;
      });
  }
}

export default new GameInput();
