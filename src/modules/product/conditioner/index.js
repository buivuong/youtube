import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class Conditioner extends Component{
	constructor(props){
		super(props)
		this.state = {
			ConditionerList: null,
			ConditionerCreate: null,
			mode: 'list'
		}
	}
	componentDidMount(){
		this._loadConditionerList()
	}
	_loadConditionerList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({ConditionerList: RealModule})
		})
	}
	_loadConditionerCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({ConditionerCreate: <RealModule onSuccess={this._bindChangeMode.bind(this, 'list')} router={this.props.router}/>})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			this._loadConditionerCreate()
		})
	}
	_renderTitle(){
		let html = null
		switch(this.state.mode){
			case 'list':
				html = <PortletTitle>
							<PortletHeading>Các loại điều hòa</PortletHeading>
							<PortletActions>
								{/*<a>Tải lại</a>
								<a onClick={this._bindChangeMode.bind(this, 'create')}>Thêm</a>*/}
							</PortletActions>
						</PortletTitle>
				break
			case 'create':
				html = <PortletTitle>
							<PortletHeading>Thêm mới điều hòa</PortletHeading>
							<PortletActions>
								<a onClick={this._bindChangeMode.bind(this, 'list')}>Danh sách</a>
							</PortletActions>
						</PortletTitle>
				break
		}
		return html
	}
	_renderBody(){
		let html = null
		switch(this.state.mode){
			case 'list':
				html = this.state.ConditionerList ? <this.state.ConditionerList tree={this.props.tree} router={this.props.router} onSelectRow={this.props.onSelectRow}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.ConditionerCreate ? this.state.ConditionerCreate : <div>Loading Component</div>
				break
		}
		return html
	}
	render(){
		return (
			<Portlet>
				{this._renderTitle()}
				<PortletBody>
					{this._renderBody()}
				</PortletBody>
			</Portlet>
		)
	}
}

export default Conditioner