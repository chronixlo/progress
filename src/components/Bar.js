import React, { Component } from 'react';

class Bar extends Component {
  render() {
    let classes = this.props.className || '';

    classes += ' bar-container';
    classes += this.props.hideText ? ' bar-text-hidden' : '';

    return (
      <div className={classes}>
        <div className="bar-face" style={{width: this.props.current/this.props.max * 100 + '%'}}></div>
        <span className="bar-text">
          {this.props.current} / {this.props.max}
        </span>
      </div>
    );
  }
}

export default Bar;