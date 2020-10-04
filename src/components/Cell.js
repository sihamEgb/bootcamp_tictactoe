import React from 'react';

import './boardgame.css';

class Cell extends React.Component{
	

	onCellClick = (e) => {
		// console.log("cell clicked",this.props.id);
		if(this.props.cell === null)
		{
			this.props.onClick(this.props.id);
		}
	}
	

	render(){
		return(
			<div 
				onClick = {this.onCellClick}
				className="cell">
					{this.props.cell}
			</div>
	
			);
	}

}
 


export default Cell;

  

