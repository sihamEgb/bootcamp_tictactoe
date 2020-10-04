import React from 'react';
import Boardgame from './Boardgame';

import './boardgame.css';

class Game extends React.Component{
	constructor(props){
		super(props);
		this.signs = ['O','X'];

		this.state = {
			board : [null,null,null,null,null,null,null,null,null],
			// board : [0,1,2,3,4,5,6,7,8],
			currentPlayerIndex: 0,
			isGameFinished:false,
		
		};
	}

		onCellClick = (cellId) => {
			// console.log("cell clicked",cellId);
			// debugger;
			if(this.state.isGameFinished)
			{
				return;
			}
	
			const newBoard = this.state.board;
			newBoard[cellId] = this.signs[this.state.currentPlayerIndex];
			this.setState({
				board:newBoard,
				currentPlayerIndex:(this.state.currentPlayerIndex+1)%2,	
			});
			
			this.isGameFinished();
			
		}

		
		getWinner = () => {
	// check row
	const board = this.state.board;
	if (board[0] && (board[0] === board[1]) && (board[0] === board[2])) {
			return board[0];
	}
	if (board[3] && (board[3] === board[4]) && (board[4] === board[5])) {
			return board[3];
	}
	if (board[6] && (board[6] === board[7]) && (board[7] === board[8])) {
			return board[6];
	}
	
	// check column
	if (board[0] && (board[0] === board[3]) && (board[3] === board[6])) {
			return board[0];
	}
	if (board[1] && (board[1] === board[4]) && (board[4] === board[7])) {
			return board[1];
	}
	if (board[2] && (board[2] === board[5]) && (board[5] === board[8])) {
		console.log("column 3",board[2]);
			return board[2];
	}
	
	// check diagonal
	if (board[0] && (board[0] === board[4]) && (board[4] === board[8])) {
			return board[0];
	}
	if (board[2] && (board[2] === board[4]) && (board[4] === board[6])) {
			return board[2];
	}
	console.log("in get winner");
	return null;
}

areAllCellsTaken = () => {
	for(let i=0;i<9;i++)
	{
		if(this.state.board[i] === null)
		{
			return false;
		}
	}
	return true;
}


isGameFinished = () => {
	console.log("is game finished called");
	if(this.getWinner() !== null || this.areAllCellsTaken())
	{
		console.log("here",this.getWinner(),this.areAllCellsTaken());
		this.setState({isGameFinished:true});
	}
}

	
	render(){


		
		
		const gameFinished = this.state.isGameFinished;
		// console.log(this.state.isGameFinished);
		const winner = this.getWinner();
		const winnerName = gameFinished && winner? `the winner: ${winner}` : "no winner";
		return(
		<div className="gameContainer">
			<div className="boardGame">
				<Boardgame
				boardGame = {this.state.board}
				onClick = {this.onCellClick}
				>

				</Boardgame>
			</div>
			<div className="gameStatus">
				<div>
				next player = {this.signs[this.state.currentPlayerIndex]}
				</div>
				{gameFinished ? winnerName : ""}
				
			</div>
		</div>

			);
	}

}
 


export default Game;

  

