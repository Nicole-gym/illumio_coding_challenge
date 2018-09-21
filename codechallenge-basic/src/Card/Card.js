import 'materialize-css/dist/css/materialize.min.css';
import './Card.css';

import React from 'react';

class Card extends React.Component {
  render() {
    return (
      <div>
        <div className='card' onClick={this.props.onClick}>
        <div className={this.props.color}>
          <div className={this.props.hidden ? "hidden" : ""}>{this.props.value}</div>
        </div>
        </div>
      </div>
    )
  }
}

export default Card;
