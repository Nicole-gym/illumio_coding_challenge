import 'materialize-css/dist/css/materialize.min.css';
import './Board.css';

import React from 'react';
import Card from '../Card/Card';
import State from '../State/State';
import Score from '../Score/Score';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //store all the player name, score and time they spent
      player : [
        {
          name: "player1",
          score: 0,
          second: 0
        },
        {
          name: "player2",
          score: 0,
          second: 0
        }
      ],
      board : [],
    };
    this.shuffle = this.shuffle.bind(this);

    this.numOfClick = 0;  // how many card is clicked
    this.preIndex = 0;   // the preclicked card's row number
    this.preKey = 0;     // the preclicked card's column number
    this.matchNum = 0;   //to count how many pairs are matched
    this.stateOfGame = 'Please click and match all the pairs of the cards with the same number'; // to indicate the state of the game
    this.highestScore = 0;   // to remember the highestscore
    this.timerCount = false;  //to count the time or not
    this.playerNumber = 1;   //to indicate which player is playing
  }


  //to count the timer of the two players
  tick() {
    let tempPlayer = this.state.player;
    if (this.timerCount === true) {
      if (this.playerNumber === 1) {
        tempPlayer[0].second = tempPlayer[0].second + 1;
      } else {
        tempPlayer[1].second = tempPlayer[1].second + 1;
      }
      this.setState((prevState) => ({
        player: tempPlayer,
      }));
    }
  }

  componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  // the function to deal with the card match processing
  handleCardClick(index,key) {

    let tempBoard = this.state.board;

    let tempPlayer = this.state.player;
    let score1 = this.state.player[0].score;
    let score2 = this.state.player[1].score;
    if (tempBoard[index][key].locked === false) {    //if the card it not mathed, turn over
      tempBoard[index][key].hidden = tempBoard[index][key].hidden === false ? true : false;
      if (this.numOfClick === 0) {                                                          // if only one card is fliped
        this.numOfClick++;
        this.preKey = key;
        this.preIndex = index;
        tempBoard[index][key].locked = true;
      }
      else {                                                                                  //if there are two card is fliped
        if (tempBoard[index][key].value === tempBoard[this.preIndex][this.preKey].value) {
          if (this.playerNumber === 1) {
            tempBoard[index][key].color = 'blue';
            tempBoard[this.preIndex][this.preKey].color = 'blue';
          } else {
            tempBoard[index][key].color = 'green';
            tempBoard[this.preIndex][this.preKey].color = 'green';
          }

          tempBoard[index][key].locked = true;
          tempBoard[this.preIndex][this.preKey].locked = true;
          this.numOfClick = 0;
          this.matchNum ++;
          if (this.playerNumber === 1) {
            score1 += 5;
          } else {
            score2 += 5;
          }
          this.playerNumber = this.playerNumber === 1? 2:1;
        } else {
          if (this.playerNumber === 1) {
            score1 --;
          } else {
            score2 --;
          }
          tempBoard[this.preIndex][this.preKey].locked = false;
          this.numOfClick = 0;
          setTimeout(() => {
              tempBoard[this.preIndex][this.preKey].hidden = true;
              tempBoard[index][key].hidden = true;
            this.setState({
              board: tempBoard,
              player: tempPlayer
            });
          }, 500);
        }

      }
    }

    if (this.matchNum === this.nameValue.value * this.nameValue.value / 2) {
      if (score1 === score2){
        this.stateOfGame = 'Tie';
      } else if (score1 > score2) {
        this.stateOfGame = 'Player1 Win';
      } else {
        this.stateOfGame = 'Player2 Win';
      }
      this.timerCount = false;
      if (score1 > this.highestScore) {
        this.highestScore = score1;
      }
      if (score2 > this.highestScore) {
        this.highestScore = score2;
      }

    }
    tempPlayer[0].score = score1;
    tempPlayer[1].score = score2;
    this.setState({
      board: tempBoard,
      player: tempPlayer
    });
  }


// to shuffle the board, random display the board with two set of number
  shuffle(){
    if (this.nameValue.value % 2 !== 0) {
      alert('please enter the even number');
    } else {
    this.timerCount = true;
    this.numOfClick = 0;
    this.preIndex = 0;
    this.preKey = 0;
    this.matchNum = 0;
    this.score = 0;
    let list1=[];
    let list2=[];
    for (let i = 0; i < this.nameValue.value * this.nameValue.value / 2; i++) {
      list1[i] = i + 1;
      list2[i] = i + 1;
    }
    list1= list1.sort(function(){ return 0.5 - Math.random() })
    list2= list2.sort(function(){ return 0.5 - Math.random() })
    let tempBoard = [];
    let swift = 0;
    for (let i = 0; i < this.nameValue.value; i++) {
      tempBoard[i] = [];
      for (let j = 0; j < this.nameValue.value; j++) {
        if (swift%2 === 0) {
          tempBoard[i][j] = {'value': list1[Math.floor(swift / 2)], 'hidden': true, 'color': 'reddiv', 'locked' : false};
          swift ++;
        } else {
          tempBoard[i][j] = {'value': list2[Math.floor(swift / 2)], 'hidden': true, 'color': 'reddiv', 'locked' : false};
          swift ++;
        }
      }
    }
    this.stateOfGame = 'Please click and match all the pairs of the cards with the same number';
    this.setState({
      board:tempBoard,
      secondsElapsed : 0,
      player:[
        {
          name: "player1",
          score: 0,
          second: 0
        },
        {
          name: "player2",
          score: 0,
          second: 0
        }
      ]
    });
}
  }

  render() {
    return (
      <div className="container">
      <State stateOfGame = {this.stateOfGame}></State>{/* the state of the game : the rules during playing, player1 win, player2 win, tie  */}
      <Score score1 = {this.state.player[0].score} score2= {this.state.player[1].score} highestScore = {this.highestScore}></Score>{/*//tell the highest score, player1 score and player2 score*/}
      <button onClick={this.shuffle.bind(this)}>Start</button>{/* //to start or reset the game*/}
      <input type="number" name="lname" placeholder ='enter the even number' ref={el => this.nameValue = el} /> {/* //the size of the board*/}
      <div>Player1 Timer: {this.state.player[0].second}s</div>{/* //the time player1 spend*/}
      <div>Player2 Timer: {this.state.player[1].second}s</div>{/* // the time player2 spend*/}
      <table className="tablediv">{/* // render all the board*/}
          <tbody>
          {
            this.state.board.map( (items,index) => {
              return(
                <tr key={index}>
                {items.map((item,key) => {
                  return(
                   <td key={key}><Card onClick={this.handleCardClick.bind(this,index,key)} value={item.value} hidden={item.hidden} color={item.color}></Card></td>
                )})}
                </tr>
              )}
            )
          }
          </tbody>
      </table>
      </div>
    );
  }
}

export default Board;
