import 'materialize-css/dist/css/materialize.min.css';
import './State.css';

import React from 'react';

class State extends React.Component {
  render() {
    return (
      <div>
          <p>{this.props.value1}</p>
      </div>
    )
  }
}

export default State;
