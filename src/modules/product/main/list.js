import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'
import {StaticList, StaticContent, StaticItem} from 'comp/portlet/static'

import productCategoryTypeModel from 'models/productCategoryTypeList'
import productListModel from 'models/productList'
import productFormModel from 'models/productForm'

class List extends Component{
	constructor(props){
		super(props)
		this.state = {
			static: null
		}
	}
	componentWillMount(){
		productListModel.init()
	}
	componentDidMount(){
		productListModel.setLoader(true)
		.then(() => {
			const categoryType = productCategoryTypeModel.getDetail()
			productListModel.loadList(categoryType.id, true)
			.then((response) => {
				productListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		productListModel.clear()
	}
	_loadMediaImage(){
		System.import(`../../../modules/mediaImage`)
		.then(module => {
			const RealModule = module.default
			this.setState({static: RealModule})
		})
	}
	_loadFeature(){
		System.import(`../../../modules/feature`)
		.then(module => {
			const RealModule = module.default
			this.setState({static: RealModule})
		})
	}
	_loadSpec(){
		System.import(`../../../modules/spec`)
		.then(module => {
			const RealModule = module.default
			this.setState({static: RealModule})
		})
	}
	_loadTag(){
		System.import(`../../../modules/tag`)
		.then(module => {
			const RealModule = module.default
			this.setState({static: RealModule})
		})
	}
	_bindSelectDetail(item){
		productListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	_bindChangeStatic(mode){
		switch(mode){
			case 'all':
				this.setState({static: null})
				break
			case 'image':
				this._loadMediaImage()
				break
			case 'feature':
				this._loadFeature()
				break
			case 'spec':
				this._loadSpec()
				break
			case 'tag':
				this._loadTag()
				break
		}
	}
	_bindModalRemove(item){
		productListModel.setDetail(item).then(()=>{
			this.setState({isConfirm: true})
		})
	}
	_bindUpdate(item){
		productListModel.setDetail(item).then(()=>{
			productFormModel.setValues(item).then(()=>{
				this.props.onUpdate(item)
			})
		})
	}
	_bindAcceptRemove(){
		const detail = productListModel.getDetail()
		productListModel.delete(detail)
		.then(() => {
			this.setState({isConfirm: false}, () => {
				const parentDetail = productCategoryTypeListModel.getDetail()
				productListModel.loadList(parentDetail.id, true)
			})
		})
	}
	render(){
		const list = productListModel.getList()
		const loader = productListModel.getLoader()
		const detail = productListModel.getDetail()
		return (
			<div className="box">
			<StaticContent>
				{this.state.static ? <this.state.static/> : null}
			</StaticContent>
			<StaticList>
				<StaticItem onClick={this._bindChangeStatic.bind(this, 'all')}>Tất cả</StaticItem>
				<StaticItem onClick={this._bindChangeStatic.bind(this, 'image')}>Hình ảnh</StaticItem>
				<StaticItem onClick={this._bindChangeStatic.bind(this, 'feature')}>Đặc tính</StaticItem>
				<StaticItem onClick={this._bindChangeStatic.bind(this, 'spec')}>Tính năng</StaticItem>
				<StaticItem onClick={this._bindChangeStatic.bind(this, 'tag')}>Thẻ</StaticItem>
			</StaticList>
			{loader ? <Loader/> : null}
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>Tên (En)</TableHeader>
						<TableHeader>Tên (Vi)</TableHeader>
						<TableHeader>Sắp xếp</TableHeader>
						<TableHeader></TableHeader>
					</TableRow>
					{
						list.map((item, key) => {
							const active = (item.id === detail.id) ? true : false
							const status = item.status
							return (
								<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
									id={item.id}>
									<TableCell>{item.name_en}</TableCell>
									<TableCell>{item.name_vi}</TableCell>
									<TableCell>{item.ordered}</TableCell>
									<TableCell>
										<a onClick={this._bindModalRemove.bind(this, item)}>Xóa</a>
										<a onClick={this._bindUpdate.bind(this, item)}>Sửa</a>
									</TableCell>
								</TableRow>
							)
						})
					}
				</Table>
			}
			</div>
		)
	}
}

export default List