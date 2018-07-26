import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
class Stage extends Component {
  render() {
    return (
      <div className="pane text-center">
        <span className="name">Stage</span>
        
        <div className="row space-between">
          <div
            className="button"
            onClick={() => this.props.store.setStage(-1)}
          >
            &lt;
          </div>
          
          {this.props.store.stage} / {this.props.store.highestStage}

          <div
            className="button"
            onClick={() => this.props.store.setStage(+1)}
          >
            &gt;
          </div>
        </div>
        
        <div>enemies killed {this.props.store.killed}</div>
        
        <input type="checkbox" name="autoadvance" checked={this.props.store.autoAdvance} onChange={this.props.store.toggleAutoAdvance} />Autoadvance
      </div>
    );
  }
}

export default Stage;