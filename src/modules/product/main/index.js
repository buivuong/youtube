import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class Product extends Component{
	constructor(props){
		super(props)
		this.state = {
			ProductList: null,
			ProductCreate: null,
			mode: 'list'
		}
	}
	componentDidMount(){
		this._loadProductList()
	}
	_loadProductList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({ProductList: RealModule})
		})
	}
	_loadProductCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({ProductCreate: RealModule})
		})
	}
	_loadProductUpdate(){
		System.import(`./update`)
		.then(module => {
			const RealModule = module.default
			this.setState({ProductUpdate: RealModule})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			if(mode === 'create')
				this._loadProductCreate()
			else
				this._loadProductUpdate()
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
				html = this.state.ProductList ? <this.state.ProductList router={this.props.router} onSelectRow={this.props.onSelectRow}
					onUpdate={this._bindChangeMode.bind(this, 'update')}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.ProductCreate ? <this.state.ProductCreate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
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

export default Product