import React from 'react';
import Boardgame from './Boardgame';

import './boardgame.css';

class Game extends React.Component{
	constructor(props){
		super(props);
		this.signs = ['O','X'];

		this.state = {
			
			history: [
				{
					board : [null,null,null,null,null,null,null,null,null]
				}
			],
			stepIndex: 0,
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
			// shallow copy array
			const history = this.state.history.slice(0,this.state.stepIndex+1);
			// most updated board
			const current = history[history.length-1];
			const newBoard = current.board.slice();
			// console.log("history",newBoard);

			newBoard[cellId] = this.signs[this.state.currentPlayerIndex];
			this.setState({
				history: history.concat([
					{board:newBoard}
				]),
				currentPlayerIndex:(this.state.currentPlayerIndex+1)%2,	
				stepIndex: history.length,
				// board:newBoard,
			},() => {
				this.isGameFinished();
			});
			
			
		}

		
		getWinner = (board) => {
	// check row
	// const current = this.state.history[this.state.stepIndex];
	// const board = current.board;
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
	const current = this.state.history[this.state.stepIndex];
	const board = current.board;
	// debugger;
	for(let i=0;i<9;i++)
	{
		if(board[i] === null)
		{
			return false;
		}
	}
	return true;
}


isGameFinished = () => {
	console.log("is game finished called");
	if(this.areAllCellsTaken())
	{	
		// debugger;
		console.log("all are taken");
		this.setState({isGameFinished:true});
		return true;
	}
	const current = this.state.history[this.state.stepIndex];
	if(this.getWinner(current.board) !== null)
	{
		this.setState({isGameFinished:true});
		return true;
	}
	return false;
}

	openStep = (index) => {
		this.setState({
      stepIndex: index,
			currentPlayerIndex:(index+1)%2,	
		});
		

	}
	render(){
		
		
		const gameFinished = this.state.isGameFinished;
		// console.log(this.state.isGameFinished);
		const current = this.state.history[this.state.stepIndex];
		const winner = this.getWinner(current.board);
		const winnerName = gameFinished && winner? `the winner: ${winner}` : "no winner";
		const steps = this.state.history.map( (steps,index) => {
			return (<div
			key={index}
			onClick={(index) => this.openStep(index)}
			> step #{index}</div>);
		} );

		/**
		 * 
		 * 	// key={index}
			>
				{step}

		 */
		

		return(
		<div className="gameContainer">
			<div className="boardGame">
				<Boardgame
				boardGame = {current.board}
				onClick = {this.onCellClick}
				>

				</Boardgame>
			</div>
			<div className="gameStatus">
				<div>
				{gameFinished ? winnerName : `next player = ${this.signs[this.state.currentPlayerIndex]}`}
				</div>
			</div>
			<div className="Prev Step">
				{steps}
			</div>
		</div>

			);
	}

}
 


export default Game;

  

