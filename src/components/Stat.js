import React, { Component } from 'react';

class Stat extends Component {
  render() {
    const stat = this.props.data;

    return (
      <div className="stat row text-right start-center">
        <img className="stat-icon" src={stat.name + '.svg'} alt={stat.name} />
        <span className="flex stat-value">{stat.level}</span> 
      </div>
    );
  }
}

export default Stat;