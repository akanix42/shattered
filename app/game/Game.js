import React from 'react';
import styles from './Game.scss';
import ScreenContainer from './ScreenContainer';
import uiEvents from './uiEvents';
// import { postal } from 'shattered-game/global';
// import SideBar from './sideBar/SideBar';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      turnsPerSecond: 0,
      width: 40,
      height: 40,
      numberOfLevels: 1,
      numberOfCreatures: null,
    };
  }

  getNumberOfCreatures() {
    return this.state.numberOfCreatures === null
      ? this.state.width * this.state.height / 2 / this.state.numberOfLevels
      : this.state.numberOfCreatures / this.state.numberOfLevels;
  }

  updateMainMenuOptions() {
    uiEvents.updateMainMenuOptions.dispatch({
      options: {
        numberOfCreatures: parseInt(this.getNumberOfCreatures()),
        width: parseInt(this.state.width),
        height: parseInt(this.state.height),
      },
      numberOfLevels: parseInt(this.state.numberOfLevels)
    });
    // postal.publish({
    //   topic: 'ui.mainMenu',
    //   data: {
    //     options: {
    //       numberOfCreatures: parseInt(this.getNumberOfCreatures()),
    //       width: parseInt(this.state.width),
    //       height: parseInt(this.state.height),
    //     },
    //     numberOfLevels: parseInt(this.state.numberOfLevels),
    //   }
    // });
  }

  render() {
    return (
      <div>
        <div className={styles.turnNumber}>
          Turn: {this.state.turn} | TPS: {this.state.turnsPerSecond}
        </div>
        <div>
          <label>number of levels<input type="text" value={this.state.numberOfLevels}
                                        onChange={this._setValue('numberOfLevels')}/></label>
          <label>width<input type="text" value={this.state.width} onChange={this._setWidthOrHeight('width')}/></label>
          <label>height<input type="text" value={this.state.height}
                              onChange={this._setWidthOrHeight('height')}/></label>
          <label>number of creatures<input type="text" value={this.getNumberOfCreatures()}
                                           onChange={this._setValue('numberOfCreatures')}/></label>
        </div>
        <div className={styles.layout}>
          <ScreenContainer updateTPS={this.updateTPS.bind(this)}/>
          {/*<SideBar/>*/}
        </div>
        {this.updateMainMenuOptions()}
      </div>
    );
  }

  _setWidthOrHeight(key) {
    const setValue = this._setValue(key);
    return event => {
      this.setState({ numberOfCreatures: null });
      setValue(event);
    }
  }

  _setValue(key) {
    return event=>this.setState({ [key]: event.target.value });
  }

  updateTPS(data) {
    this.setState(data);
  }
}
