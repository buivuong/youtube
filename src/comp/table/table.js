import React, {Component} from 'react'

import TableCSS from 'comp/table/table.css'

export class Table extends Component{
	render(){
		return (
			<div className={`${TableCSS.wrapper}`}>
				<div className={`${TableCSS.table}`}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export class TableRow extends Component{
	_bindDragStart(event){
		event.dataTransfer.setData("text", event.target.id)
	}
	_bindDragOver(event){
		event.preventDefault()
	}
	_bindDrop(event){
		event.preventDefault()
		var data = event.dataTransfer.getData("text")
    	event.target.parentNode.parentNode.appendChild(document.getElementById(data))
	}
	render(){
		const active = this.props.active ? ` ${TableCSS.active}`:''
		const status = this.props.status ? ` ${TableCSS[this.props.status]}`:''
		return (
			<div className={`${TableCSS.row}${status}${active}`} onClick={this.props.onClick} draggable="true" id={this.props.id}
				onDrop={this._bindDrop.bind(this)}
				onDragOver={this._bindDragOver.bind(this)}
				onDragStart={this._bindDragStart.bind(this)}>
				{this.props.children}
			</div>
		)
	}
}

export class TableHeader extends Component{
	render(){
		return (
			<div className={`${TableCSS.header}`}>
				{this.props.children}
			</div>
		)
	}
}

export class TableCell extends Component{
	render(){
		return (
			<div className={`${TableCSS.cell}`}>
				{this.props.children}
			</div>
		)
	}
}