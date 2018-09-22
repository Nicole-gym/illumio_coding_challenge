import 'materialize-css/dist/css/materialize.min.css';
import './Score.css';


import React from 'react';
import PropTypes from 'prop-types';

// Score Component
// props:
class Score extends React.Component {
  render() {
    return (
      <div>
          <p>HighestScore : {this.props.highestScore}</p>
          <p>Score1 : {this.props.score1}</p>
          <p>Score2 : {this.props.score2}</p>
      </div>
    )
  }
}

// Type checking for props
Score.propTypes = {
  highestScore: PropTypes.number,
  score1: PropTypes.number,
  score2: PropTypes.number,
};

// Specifies the default values for propTypes
Score.defaultProps = {
  highestScore: 0,
  score1: 0,
  score2: 0,
};

export default Score;
