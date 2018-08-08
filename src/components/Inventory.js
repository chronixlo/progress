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
        <div className="row space-between no-flex">
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
                    store.player._inventory.selected === name && 'selected'
                  )}
                  onClick={() => store.player._inventory.selectFilter(name)}
                >
                  <img className="stat-icon" src={name + '.svg'} alt={name} />
                </div>
              );
            })
          }
        </div>
        
        <div className="row space-between">
          {
            store.player._inventory.sortTypes.map((item, idx) =>
              <span key={idx} className="selected" onClick={e => store.player._inventory.setSort(item)}>{item.name}</span>
            )
          }
        </div>

        <div className="inventory col flex scroll">
          {
            this.props.store.player._inventory.bestItems.map((item, idx) => {
              return (
                <Item
                  key={item.id}
                  onClick={this.props.store.player.equipItem}
                  data={item}
                  showComparison
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