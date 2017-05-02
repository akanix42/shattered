"use strict";
import ROT from 'rot-js';

class ScreenStack {
  stack = [];
  container = null;

  constructor() {
    window.screenStack = this;

  }

  bindInputEvents() {
    bindInputEvent.call(this, 'keydown');
    bindInputEvent.call(this, 'keyup');
    bindInputEvent.call(this, 'keypress');

    function bindInputEvent(event) {
      var ui = document.getElementById('game');
      if (!ui) return;

      window.addEventListener(event, (e) => {
        if (e.target.tagName==='INPUT')
          return;
        if (e.keyCode === ROT.VK_F5)
          return;
        e.preventDefault();
        if (this.currentScreen)
          this.currentScreen.handleInput(event, e);
      });
    }
  }

  get currentScreen() {
    var stack = this.stack;
    return stack[stack.length - 1];
  }

  push(screen) {
    this.stack.push(screen);
    screen.render();
  }

  pop(callingScreen) {
    const screen = this.stack.pop();
    if (callingScreen && callingScreen != screen)
      screen.hide();
    this.currentScreen.render();
  }

  remove(screen) {
    const index = this.stack.indexOf(screen);
    if (index === -1) return;

    this.stack.splice(index, 1);
  }

  clear() {
    this.stack = [];
  }

}

export default new ScreenStack();
