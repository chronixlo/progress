import React, { Component } from 'react';
import { cn } from '../util';

class Bar extends Component {
  render() {
    return (
      <div className={cn(
        this.props.className, 
        'bar-container', 
        this.props.hideText && 'bar-text-hidden'
      )}>
        <div className="bar-face" style={{width: this.props.current/this.props.max * 100 + '%'}}></div>
        <span className="bar-text">
          {this.props.current} / {this.props.max}
        </span>
      </div>
    );
  }
}

export default Bar;