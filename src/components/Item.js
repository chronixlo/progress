import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import Attribute from './Attribute';

const statNames = ['str', 'att', 'hp'];

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
    
    return (
      <div
        onClick={this.onClick}
        className="col item"
        style={{marginTop: 12}}
      >
        <div className="row start-center">
          <div className="attribute item-type">
            <div className="attribute-icon">
              <img className="attribute-icon-img" src={item.type + '.svg'} alt={item.type} />
            </div>
            <span className="attribute-value">{item.level}</span>
          </div>

          <span className="flex item-name">{item.name || '-'}</span>
        </div>

        <div className="row">
          {
            statNames.map((name, idx) => {
              return (
                item.stats[name] ?
                <Attribute
                  key={idx}
                  name={name}
                  level={'+' + item.stats[name]}
                /> :
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