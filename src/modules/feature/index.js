import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class Feature extends Component{
	constructor(props){
		super(props)
		this.state = {
			FeatureList: null,
			FeatureCreate: null,
			FeatureUpdate: null,
			mode: 'list'
		}
	}
	componentDidMount(){
		this._loadFeatureList()
	}
	_loadFeatureList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({FeatureList: RealModule})
		})
	}
	_loadFeatureCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({FeatureCreate: RealModule})
		})
	}
	_loadFeatureUpdate(){
		System.import(`./update`)
		.then(module => {
			const RealModule = module.default
			this.setState({FeatureUpdate: RealModule})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			if(mode === 'create')
				this._loadFeatureCreate()
			else
				this._loadFeatureUpdate()
		})
	}
	_renderTitle(){
		let html = null
		switch(this.state.mode){
			case 'list':
				html = <PortletTitle>
							<PortletHeading>Phân loại</PortletHeading>
							<PortletActions>
								<a>Tải lại</a>
								<a onClick={this._bindChangeMode.bind(this, 'create')}>Thêm</a>
							</PortletActions>
						</PortletTitle>
				break
			case 'create':
				html = <PortletTitle>
							<PortletHeading>Thêm mới</PortletHeading>
							<PortletActions>
								<a onClick={this._bindChangeMode.bind(this, 'list')}>Danh sách</a>
							</PortletActions>
						</PortletTitle>
				break
			case 'update':
				html = <PortletTitle>
							<PortletHeading>Sửa</PortletHeading>
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
				html = this.state.FeatureList ? <this.state.FeatureList router={this.props.router} onSelectRow={this.props.onSelectRow} onUpdate={this._bindChangeMode.bind(this, 'update')}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.FeatureCreate ? <this.state.FeatureCreate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
				break
			case 'update':
				html = this.state.FeatureUpdate ? <this.state.FeatureUpdate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
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

export default Feature