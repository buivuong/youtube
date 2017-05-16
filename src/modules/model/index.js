import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class Model extends Component{
	constructor(props){
		super(props)
		this.state = {
			ModelList: null,
			ModelCreate: null,
			ModelUpdate: null,
			mode: 'list'
		}
	}
	componentDidMount(){
		this._loadModelList()
	}
	_loadModelList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({ModelList: RealModule})
		})
	}
	_loadModelCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({ModelCreate: RealModule})
		})
	}
	_loadModelUpdate(){
		System.import(`./update`)
		.then(module => {
			const RealModule = module.default
			this.setState({ModelCreate: RealModule})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			if(mode === 'create')
				this._loadModelCreate()
			else
				this._loadModelUpdate()
		})
	}
	_renderTitle(){
		let html = null
		switch(this.state.mode){
			case 'list':
				html = <PortletTitle>
							<PortletHeading>Phân loại</PortletHeading>
							<PortletActions>
								{/*<a>Tải lại</a>*/}
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
				html = this.state.ModelList ? <this.state.ModelList router={this.props.router} onSelectRow={this.props.onSelectRow} onUpdate={this._bindChangeMode.bind(this, 'update')}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.ModelCreate ? <this.state.ModelCreate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
				break
			case 'update':
				html = this.state.ModelUpdate ? <this.state.ModelUpdate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
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

export default Model