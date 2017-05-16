import React, {Component} from 'react'

import PortletCSS from 'comp/portlet/portlet.css'

export class Portlet extends Component{
	render(){
		return (
			<div className={`${PortletCSS.portlet}`}>
				{this.props.children}
			</div>
		)
	}
}

export class PortletTitle extends Component{
	render(){
		return (
			<div className={`${PortletCSS.title}`}>
				{this.props.children}
			</div>
		)
	}
}

export class PortletBody extends Component{
	render(){
		return (
			<div className={`${PortletCSS.body}`}>
				{this.props.children}
			</div>
		)
	}
}

export class PortletHeading extends Component{
	render(){
		return (
			<div className={`${PortletCSS.heading}`}>
				{this.props.children}
			</div>
		)
	}
}

export class PortletActions extends Component{
	render(){
		return (
			<div className={`${PortletCSS.actions}`}>
				{this.props.children}
			</div>
		)
	}
}