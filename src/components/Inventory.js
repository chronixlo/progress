import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import Item from './Item';

@inject('store')
@observer
class Inventory extends Component {
  render() {
    return (
      <div className="pane">
        <button onClick={this.props.store.player.clearInventory}>Clear</button>
        <div className="skills col">
          {
            this.props.store.player.bestItems.map((item, idx) => {
              return (
                <Item
                  key={idx}
                  onClick={this.props.store.player.equipItem}
                  data={item}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Inventory;