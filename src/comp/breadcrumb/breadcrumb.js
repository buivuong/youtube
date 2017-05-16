import React, {Component} from 'react'

import BreadcrumbCSS from 'comp/breadcrumb/breadcrumb.css'

export class Breadcrumb extends Component{
	render(){
		return (
			<ul className={`${BreadcrumbCSS.wrapper}`}>
				{this.props.children}
			</ul>
		)
	}
}

export class BreadcrumbItem extends Component{
	render(){
		return (
			<li className={`${BreadcrumbCSS.item}`}>
				<a onClick={this.props.onClick}>{this.props.label}</a>
			</li>
		)
	}
}