import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class ModelSpec extends Component{
	constructor(props){
		super(props)
		this.state = {
			ModelSpecList: null,
			ModelSpecCreate: null,
			ModelSpecUpdate: null,
			mode: 'list',
		}
	}
	componentDidMount(){
		this._loadModelSpecList()
	}
	_loadModelSpecList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({ModelSpecList: RealModule})
		})
	}
	_loadModelSpecCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({ModelSpecCreate: RealModule})
		})
	}
	_loadModelSpecUpdate(){
		System.import(`./update`)
		.then(module => {
			const RealModule = module.default
			this.setState({ModelSpecUpdate: RealModule})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			if(mode === 'create')
				this._loadModelSpecCreate()
			else
				this._loadModelSpecUpdate()
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
				html = this.state.ModelSpecList ? <this.state.ModelSpecList router={this.props.router} onSelectRow={this.props.onSelectRow} onUpdate={this._bindChangeMode.bind(this, 'update')}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.ModelSpecCreate ? <this.state.ModelSpecCreate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
				break
			case 'update':
				html = this.state.ModelSpecUpdate ? <this.state.ModelSpecUpdate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
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

export default ModelSpec