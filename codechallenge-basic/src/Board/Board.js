import 'materialize-css/dist/css/materialize.min.css';
import './Board.css';

import React from 'react';
import Card from '../Card/Card';
import State from '../State/State';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      board : []
    };
    this.numofclick = 0;
    this.preindex = 0;
    this.prekey = 0;
    this.matchnum = 0;
    this.stateofgame = 'Please click and match all the pairs of the cards with the same number';

    this.shuffle = this.shuffle.bind(this);
  }

  handleCardClick(index,key) {
    console.log("hidden"+index+";"+key);
    console.log(this.matchnum);
    console.log("numofclick"+this.numofclick);
    console.log(this.stateofgame);
    // hidden == false ? true : false;
    let tempBoard = this.state.board;
    if (tempBoard[index][key].locked === false) {
      tempBoard[index][key].hidden = tempBoard[index][key].hidden === false ? true : false;
      if (this.numofclick === 0) {
        this.numofclick++;
        this.prekey = key;
        this.preindex = index;
        tempBoard[index][key].locked = true;
      }
      else {
        if (tempBoard[index][key].value === tempBoard[this.preindex][this.prekey].value) {
          tempBoard[index][key].color = 'blue';
          tempBoard[this.preindex][this.prekey].color = 'blue';
          tempBoard[index][key].locked = true;
          tempBoard[this.preindex][this.prekey].locked = true;
          this.numofclick = 0;
          this.matchnum ++;
        } else {
          tempBoard[index][key].hidden = true;
          tempBoard[this.preindex][this.prekey].hidden = true;
          tempBoard[this.preindex][this.prekey].locked = false;
          this.numofclick = 0;
        }
      }
    }


    if (this.matchnum === 18) {
      this.stateofgame = 'Win';
    }
    this.setState({
      board:tempBoard,
    });


  }

  shuffle(){
    let list1=[];
    let list2=[];
    for (let i = 0; i < 6 * 3; i++) {
      list1[i] = i + 1;
      list2[i] = i + 1;
    }
    list1= list1.sort(function(){ return 0.5 - Math.random() })
    list2= list2.sort(function(){ return 0.5 - Math.random() })
    console.log("list1:", list1)
    console.log("list2:", list2)
    let tempBoard = [];
    let swift = 0;
    for (let i = 0; i < 6; i++) {
      tempBoard[i] = [];
      for (let j = 0; j < 6; j++) {
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
    console.log("tempboard:", tempBoard);
    this.setState({
      board:tempBoard,
    });

  }


  render() {
    console.log("render" ,this.state.board);
    return (
      <div className='container'>
      <State value1 = {this.stateofgame}></State>
      <button onClick={this.shuffle.bind(this)}>Start</button>
      <table className = 'tablediv'>
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
