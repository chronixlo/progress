import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { cn } from '../util';

const Attribute = (props) => {
  return (
    <div className={cn(
      "attribute",
      props.comparison < 0 && 'worse',
      props.comparison > 0 && 'better',
    )}>
      <div className="attribute-icon">
        <img className="attribute-icon-img" src={props.name + '.svg'} alt={props.name} />
      </div>
      <span className="attribute-value">{props.level}</span>
    </div>
  );
};

export default Attribute;