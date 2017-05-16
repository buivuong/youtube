import React, {Component} from 'react'

import {Portlet, PortletTitle, PortletBody, PortletActions, PortletHeading} from 'comp/portlet/portlet'

class Category extends Component{
	constructor(props){
		super(props)
		this.state = {
			CategoryList: null,
			CategoryCreate: null,
			mode: 'list'
		}
	}
	componentDidMount(){
		this._loadCategoryList()
	}
	_loadCategoryList(){
		System.import(`./list`)
		.then(module => {
			const RealModule = module.default
			this.setState({CategoryList: RealModule})
		})
	}
	_loadCategoryCreate(){
		System.import(`./create`)
		.then(module => {
			const RealModule = module.default
			this.setState({CategoryCreate: <RealModule onSuccess={this._bindChangeMode.bind(this, 'list')} router={this.props.router}/>})
		})
	}
	_bindChangeMode(mode){
		this.setState({mode}, () => {
			this._loadCategoryCreate()
		})
	}
	_renderTitle(){
		let html = null
		switch(this.state.mode){
			case 'list':
				html = <PortletTitle>
							<PortletHeading>Phân loại</PortletHeading>
							<PortletActions>
								{/*<a>Tải lại</a>
								<a onClick={this._bindChangeMode.bind(this, 'create')}>Thêm</a>*/}
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
				html = this.state.CategoryList ? <this.state.CategoryList router={this.props.router} onSelectRow={this.props.onSelectRow}/> : <div>Loading Component</div>
				break
			case 'create':
				html = this.state.CategoryCreate ? this.state.CategoryCreate : <div>Loading Component</div>
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

export default Category