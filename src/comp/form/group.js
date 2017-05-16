import React, {Component} from 'react'

import GroupCSS from 'comp/form/group.css'

export class Group extends Component{
	render(){
		const error = this.props.error ? ` ${GroupCSS.error}` : ''
		const required = this.props.required ? ` ${GroupCSS.required}`: ''
		return (
			<div className={`${GroupCSS.group}${error}`}>
				<label className={`${required}`}>{this.props.label} {this.props.error ? this.props.error : ''}</label>
				{this.props.children}
			</div>
		)
	}
}