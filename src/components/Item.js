import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import Attribute from './Attribute';

const statNames = ['str', 'att', 'hp'];
const RARITIES = ['', 'common', 'epic', 'legendary'];

@inject('store')
@observer
class Item extends Component {
  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.data);
    }
  };

  render() {
    const item = this.props.data;
    
    let classes = "col item no-flex";

    classes += ' item-' + RARITIES[item.rarity];

    return (
      item &&
      <div
        onClick={this.onClick}
        className={classes}
      >
        <div className="row start-center attribute item-type">
          <div className="attribute-icon">
            <img className="attribute-icon-img" src={item.type + '.svg'} alt={item.type} />
          </div>

          <span className="flex item-name">{item.name || '-'}</span>

          <span className="attribute-value">{item.level}</span>
        </div>

        <div className="row attributes">
          {
            statNames.map((name, idx) => {
              let comparison = false;
              
              if (this.props.showComparison) {
                comparison = ((item.stats[name] || 0) - (this.props.store.player.gear[item.type] ? this.props.store.player.gear[item.type].stats[name] : 0) || 0);
              }

              return (
                (item.stats[name] || comparison) ?
                <div key={idx} className="col">
                  <Attribute
                    name={name}
                    level={'+' + (item.stats[name] || 0)}
                  />
                  {
                    this.props.showComparison &&
                    <Attribute
                      name={name}
                      level={comparison}
                      comparison={comparison}
                    />
                  }
                </div> :
                null
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Item;