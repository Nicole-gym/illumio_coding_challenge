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
          score1: 0,
          second1: 0
        },
        {
          name: "player2",
          score2: 0,
          second2: 0
        }
      ],
      board : [],
    };

    this.shuffle = this.shuffle.bind(this);


    this.numofclick = 0;  // how many card is clicked
    this.preindex = 0;   // the preclicked card's row number
    this.prekey = 0;     // the preclicked card's column number
    this.matchnum = 0;   //to count how many pairs are matched
    this.stateofgame = 'Please click and match all the pairs of the cards with the same number'; // to indicate the state of the game
    this.highestscore = 0;   // to remember the highestscore
    this.timercount = false;  //to count the time or not
    this.playernumber = 1;   //to indicate which player is playing
    this.flip = false;   // to flip the card back
  }


  //to count the timer of the two players
  tick() {
    if (this.timercount === true) {
      if (this.playernumber === 1) {
        this.setState((prevState) => ({
          player : [
            {
              name: "player1",
              score1: prevState.player[0].score1,
              second1: prevState.player[0].second1 + 1
            },
            {
              name: "player2",
              score2: prevState.player[1].score2,
              second2: prevState.player[1].second2
            }
          ]
        }));
      } else {
        this.setState((prevState) => ({
          player : [
            {
              name: "player1",
              score1: prevState.player[0].score1,
              second1: prevState.player[0].second1
            },
            {
              name: "player2",
              score2: prevState.player[1].score2,
              second2: prevState.player[1].second2 + 1
            }
          ]
        }));
      }
    }
  }


  // to flip back the card pair that do not match
  showandhid() {
    let tempBoard = this.state.board;
    if (this.flip === true) {
      if (this.numofclick === 0) {
        for (let i = 0; i < this.nameValue.value; i++) {
          for (let j = 0; j < this.nameValue.value; j++) {
            if (tempBoard[i][j].locked === false) {
              tempBoard[i][j].hidden = true;
            }
          }
        }
      }
    }
    this.flip = false;
    this.setState({
      board:tempBoard
    });
  }

  componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
      this.interval1 = setInterval(() => this.showandhid(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval1);
  }


  // the function to deal with the card match processing
  handleCardClick(index,key) {
    let tempBoard = this.state.board;
    let score1 = this.state.player[0].score1;
    let score2 = this.state.player[1].score2;
    if (tempBoard[index][key].locked === false) {    //if the card it not mathed, turn over
      tempBoard[index][key].hidden = tempBoard[index][key].hidden === false ? true : false;
      if (this.numofclick === 0) {                                                          // if only one card is fliped
        this.numofclick++;
        this.prekey = key;
        this.preindex = index;
        tempBoard[index][key].locked = true;
      }
      else {                                                                                  //if there are two card is fliped
        if (tempBoard[index][key].value === tempBoard[this.preindex][this.prekey].value) {
          if (this.playernumber === 1) {
            tempBoard[index][key].color = 'blue';
            tempBoard[this.preindex][this.prekey].color = 'blue';
          } else {
            tempBoard[index][key].color = 'green';
            tempBoard[this.preindex][this.prekey].color = 'green';
          }

          tempBoard[index][key].locked = true;
          tempBoard[this.preindex][this.prekey].locked = true;
          this.numofclick = 0;
          this.matchnum ++;
          if (this.playernumber === 1) {
            score1 += 5;
          } else {
            score2 += 5;
          }
          this.playernumber = this.playernumber === 1? 2:1;
        } else {
          if (this.playernumber === 1) {
            score1 --;
          } else {
            score2 --;
          }
          tempBoard[this.preindex][this.prekey].locked = false;
          this.numofclick = 0;
          this.flip = true;
        }

      }
    }

    if (this.matchnum === this.nameValue.value * this.nameValue.value / 2) {
      if (score1 === score2){
        this.stateofgame = 'Tie';
      } else if (score1 > score2) {
        this.stateofgame = 'Player1 Win';
      } else {
        this.stateofgame = 'Player2 Win';
      }
      this.timercount = false;
      if (score1 > this.highestscore) {
        this.highestscore = score1;
      }
      if (score2 > this.highestscore) {
        this.highestscore = score2;
      }

    }
    this.setState({
      board:tempBoard,
      player:[
        {
          name: "player1",
          score1: score1,
          second1: this.state.player[0].second1
        },
        {
          name: "player2",
          score2: score2,
          second2: this.state.player[1].second2
        }
      ]
    });


  }


// to shuffle the board, random display the board with two set of number
  shuffle(){
    this.timercount = true;
    this.numofclick = 0;
    this.preindex = 0;
    this.prekey = 0;
    this.matchnum = 0;
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
    this.stateofgame = 'Please click and match all the pairs of the cards with the same number';
    this.setState({
      board:tempBoard,
      secondsElapsed : 0,
      player:[
        {
          name: "player1",
          score1: 0,
          second1: 0
        },
        {
          name: "player2",
          score2: 0,
          second2: 0
        }
      ]
    });

  }




  render() {
    return (
      <div className='container'>
      <State value1 = {this.stateofgame}></State>    {/* the state of the game : the rules during playing, player1 win, player2 win, tie  */}
      <Score value1 = {this.state.player[0].score1} value3= {this.state.player[1].score2} value2 = {this.highestscore}></Score> {/*//tell the highest score, player1 score and player2 score*/}
      <button onClick={this.shuffle.bind(this)}>Start</button> {/* //to start or reset the game*/}
      <input type="number" name="lname" placeholder ='enter the even number' ref={el => this.nameValue = el} /> {/* //the size of the board*/}
      <div>Player1 Timer: {this.state.player[0].second1}s</div>  {/* //the time player1 spend*/}
      <div>Player2 Timer: {this.state.player[1].second2}s</div>  {/* // the time player2 spend*/}
      <table className = 'tablediv'>   {/* // render all the board*/}
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
