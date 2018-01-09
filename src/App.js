import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import Skill from './Skill';
import Enemy from './components/Enemy';
import Player from './components/Player';
import Stage from './components/Stage';
import Inventory from './components/Inventory';

@inject('store')
@observer
class App extends Component {
  constructor(props) {
    super(props);
    
    this.statNames = ['str', 'att', 'hp'];
  }

  render() {
    return (
      <div className="app">
        <div className="ui-left">
          <Stage />

          <br />

          <div>
            <Enemy />
            
            <br />

            <Player />
          </div>
        </div>

        <div className="ui-right">
          <Inventory />
        </div>
      </div>
    );
  }
}

export default App;
