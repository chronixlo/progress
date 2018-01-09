import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import Skill from '../Skill';
import Bar from './Bar';

const statNames = ['str', 'att', 'hp'];

@inject('store')
@observer
class Player extends Component {
  render() {
    const {store} = this.props;
    const {enemy} = this.props.store;

    return (
      <div className="pane">
        <div className="row space-between">
          <span className="name">Enemy</span>
          <div className="total-level">{enemy.total}</div>
        </div>

        <Bar className="health-bar" current={enemy.health} max={enemy.maxHealth} />
        
        <div className="skills row space-between">
          {
            statNames.map(name => {
              let stat = store.enemy.stats[name];

              return (
                <Skill
                  key={stat.id}
                  data={stat}
                  statOnly={true}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Player;