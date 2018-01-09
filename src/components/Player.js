import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import Skill from '../Skill';
import Bar from './Bar';
import Item from './Item';

const statNames = ['str', 'att', 'hp'];
const ITEM_TYPES = ['helmet', 'armor', 'weapon'];

@inject('store')
@observer
class Player extends Component {
  render() {
    const {store} = this.props;
    const {player} = this.props.store;

    return (
      <div className="pane">
        <div className="row space-between">
          <span className="name">You</span>
          <div className="total-level">{player.total}</div>
        </div>

        <Bar className="health-bar" current={player.health} max={player.maxHealth} />

        <div className="skills row space-between">
          {
            statNames.map(name => {
              let stat = store.player.stats[name];

              return (
                <Skill
                  key={stat.id}
                  data={stat}
                />
              );
            })
          }
        </div>

          {
            ITEM_TYPES.map((name, idx) => {
              let item = store.player.gear[name] || {type: name, stats: false};

              return (
                <Item
                  key={idx}
                  data={item}
                />
              );
            })
          }
      </div>
    );
  }
}

export default Player;