import React from 'react';
import GameContainer from './game/Game';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GameContainer/>
      </div>
    );
  }
}
