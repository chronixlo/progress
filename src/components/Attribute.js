import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

const Attribute = (props) => {
  return (
    <div className="attribute">
      <div className="attribute-icon">
        <img className="attribute-icon-img" src={props.name + '.svg'} alt={props.name} />
      </div>
      <span className="attribute-value">{props.level}</span>
    </div>
  );
};

export default Attribute;