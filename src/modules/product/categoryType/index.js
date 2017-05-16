import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class CategoryType extends Component{
	constructor(props){
		super(props)
		this.state = {
			CategoryTypeList: null,
			CategoryTypeCreate: null,
			CategoryTypeUpdate: null,
			mode: 'list'
		}
	}
	componentDidMount(){
		this._loadCategoryTypeList()
	}
	_loadCategoryTypeList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({CategoryTypeList: RealModule})
		})
	}
	_loadCategoryTypeCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({CategoryTypeCreate: RealModule})
		})
	}
	_loadCategoryTypeUpdate(){
		System.import(`./update`)
		.then(module => {
			const RealModule = module.default
			this.setState({CategoryTypeUpdate: RealModule})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			if(mode === 'create')
				this._loadCategoryTypeCreate()
			else if(mode === 'update')
				this._loadCategoryTypeUpdate()
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
								<a onClick={this._bindChangeMode.bind(this, 'update')}>Sửa</a>
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
				html = this.state.CategoryTypeList ? <this.state.CategoryTypeList router={this.props.router} onSelectRow={this.props.onSelectRow} onUpdate={this._bindChangeMode.bind(this, 'update')}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.CategoryTypeCreate ? <this.state.CategoryTypeCreate onSuccess={this._bindChangeMode.bind(this, 'list')} router={this.props.router}/> : <div>Loading Component</div>
				break
			case 'update':
				html = this.state.CategoryTypeUpdate ? <this.state.CategoryTypeUpdate onSuccess={this._bindChangeMode.bind(this, 'list')} router={this.props.router}/> : <div>Loading Component</div>
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

export default CategoryType