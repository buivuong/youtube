import React, {Component} from 'react'

import GridCSS from 'comp/grid/grid.css'

export class Grid extends Component{
	render(){
		return (
			<div className={`${GridCSS.grid}`}>
				{this.props.children}
			</div>
		)
	}
}

export class Col extends Component{
	render(){
		let size = '';
		size = this.props.size?` ${GridCSS['col-'+this.props.size]}`:'';
		return <div className={`${size}`}>{this.props.children}</div>
	}
}