import 'materialize-css/dist/css/materialize.min.css';
import './State.css';

import React from 'react';
import PropTypes from 'prop-types';


// State Component
// props:
class State extends React.Component {
  render() {
    return (
      <div>
          <p>{this.props.stateOfGame}</p>
      </div>
    )
  }
}


// Type checking for props
State.propTypes = {
  stateOfGame: PropTypes.string
};

// Specifies the default values for propTypes
State.defaultProps = {
  stateOfGame: 'Please click and match all the pairs of the cards with the same number'
};

export default State;
