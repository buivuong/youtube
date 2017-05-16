import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class ProductFeature extends Component{
	constructor(props){
		super(props)
		this.state = {
			ProductFeatureList: null,
			ProductFeatureCreate: null,
			mode: 'list'
		}
	}
	componentDidMount(){
		this._loadProductFeatureList()
	}
	_loadProductFeatureList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({ProductFeatureList: RealModule})
		})
	}
	_loadProductFeatureCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({ProductFeatureCreate: RealModule})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			this._loadProductFeatureCreate()
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
				html = this.state.ProductFeatureList ? <this.state.ProductFeatureList router={this.props.router} onSelectRow={this.props.onSelectRow}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.ProductFeatureCreate ? <this.state.ProductFeatureCreate onSuccess={this._bindChangeMode.bind(this, 'list')}/> : <div>Loading Component</div>
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

export default ProductFeature