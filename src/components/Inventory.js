import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import Item from './Item';
import { cn } from '../util';

const ITEM_TYPES = ['helmet', 'armor', 'weapon'];

@inject('store')
@observer
class Inventory extends Component {
  render() {
    const { store } = this.props;
    return (
      <div className="pane col">
        <div className="row space-between">
          <span className="name">Inventory</span>
          <div>
            <div onClick={this.props.store.player.clearInventory}>Clear all</div>
            <div onClick={this.props.store.player.clearObsolete}>Clear low levels</div>
          </div>
        </div>
        

        <div className="row filter-icons no-flex">
          {
            ITEM_TYPES.map((name, idx) => {
              return (
                <div
                  key={idx} 
                  className={cn(
                    'filter-icon',
                    store.player.selected === name && 'selected'
                  )}
                  onClick={() => store.player.selectFilter(name)}
                >
                  <img className="stat-icon" src={name + '.svg'} alt={name} />
                </div>
              );
            })
          }
        </div>

        <div className="col flex scroll">
          {
            this.props.store.player.bestItems.map((item, idx) => {
              return (
                <Item
                  key={item.id}
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