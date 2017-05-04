import React from 'react';
import styles from './screenContainer.scss';
import fonts from '../fonts';
import screenStack from './screens/screenStack';
import mainMenu from './screens/mainMenuScreen';
// import { postal } from 'shattered-game/global';
import uiEvents from './uiEvents';

export default class ScreenContainer extends React.Component {
  constructor(props) {
    super(props);

    this.lastTurnAt = 0;
    this.avgTps = 0;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div id="game" className={styles.container} ref={this._initScreenStack}></div>
    );
  }

  _initScreenStack(node) {
    screenStack.container = node;
  }

  componentDidMount() {
    init.call(this);

    async function init() {
      await fonts;

      screenStack.bindInputEvents();
      mainMenu.show();
      // postal.subscribe({
      //   topic: 'ui.turn.update',
      //   callback: (data)=> {
      //     const turnAt = performance.now();
      //     if (data.turn === 1)
      //       this.lastTurnAt = null;
      //     this.setState({ turn: data.turn });
      //
      //     let turnsPerSecond;
      //     if (this.lastTurnAt !== null) {
      //       const diff = turnAt - this.lastTurnAt;
      //       const tps = 1000 / diff;
      //       this.avgTps += (tps - this.avgTps) / (data.turn - 1);
      //       turnsPerSecond = this.avgTps.toFixed(2);
      //     }
      //     this.lastTurnAt = turnAt;
      //     this.props.updateTPS({ turn: data.turn, turnsPerSecond });
      //     mainMenu.game.engine.lock();
      //     window.requestAnimationFrame(function() {
      //       mainMenu.game.engine.unlock();
      //     });
      //   }
      // });
    }
  }
}

