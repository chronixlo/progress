import React, { Component } from 'react';
import Bar from './components/Bar';
import Stat from './components/Stat';

class Skill extends Component {
  render() {
    const skill = this.props.data;

    return (
      <div
        className="skill flex col text-center"
      >
        <Stat data={skill} />
      </div>
    );
  }
}

export default Skill;