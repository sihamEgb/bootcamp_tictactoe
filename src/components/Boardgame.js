import React from 'react';
import Cell from './Cell';

import './boardgame.css';

class Boardgame extends React.Component{
	

	renderBoard(){
		return this.props.boardGame.map( (cell,index) => {
			// console.log(cell,index,this.props);
			return (<Cell
				key={index}
				id={index}
				onClick={this.props.onClick}
				cell = {cell}
			></Cell>);
		});
	}
	render(){
		return(
		<div className="board">
			{this.renderBoard()}
		</div>
	
			);
	}

}
 


export default Boardgame;

  

