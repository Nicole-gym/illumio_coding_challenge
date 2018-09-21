import 'materialize-css/dist/css/materialize.min.css';
import './Score.css';

import React from 'react';

class Score extends React.Component {
  render() {
    return (
      <div>
          <p>HighestScore : {this.props.value2}</p>
          <p>Score1 : {this.props.value1}</p>
          <p>Score2 : {this.props.value3}</p>
      </div>
    )
  }
}

export default Score;
