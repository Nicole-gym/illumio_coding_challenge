import 'materialize-css/dist/css/materialize.min.css';
import './Card.css';

import React from 'react';
import PropTypes from 'prop-types';

// Card Component
// props:
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
// Type checking for props
Card.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  hidden: PropTypes.bool,
};

// Specifies the default values for propTypes
Card.defaultProps = {
  color: 'white',
  hidden: true,
  onClick: ()=>{},
};

export default Card;
