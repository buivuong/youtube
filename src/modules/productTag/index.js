import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class ProductTag extends Component{
	constructor(props){
		super(props)
		this.state = {
			ProductTagList: null,
			ProductTagCreate: null,
			mode: 'list'
		}
	}
	componentDidMount(){
		this._loadProductTagList()
	}
	_loadProductTagList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({ProductTagList: RealModule})
		})
	}
	_loadProductTagCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({ProductTagCreate: RealModule})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			this._loadProductTagCreate()
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
		}
		return html
	}
	_renderBody(){
		let html = null
		switch(this.state.mode){
			case 'list':
				html = this.state.ProductTagList ? <this.state.ProductTagList router={this.props.router} onSelectRow={this.props.onSelectRow}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.ProductTagCreate ? <this.state.ProductTagCreate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
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

export default ProductTag