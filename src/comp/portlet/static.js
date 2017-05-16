import React, {Component} from 'react'

import StaticCSS from 'comp/portlet/static.css'

export class StaticContent extends Component{
	render(){
		return (
			<div className={`${StaticCSS.content}`}>
				{this.props.children}
			</div>
		)
	}
}

export class StaticList extends Component{
	render(){
		return (
			<div className={`${StaticCSS.list}`}>
				{this.props.children}
			</div>
		)
	}
}

export class StaticItem extends Component{
	render(){
		return (
			<a className={`${StaticCSS.item}`} onClick={this.props.onClick}>
				{this.props.children}
			</a>
		)
	}
}