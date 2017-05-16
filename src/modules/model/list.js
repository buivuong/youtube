import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'
import {StaticList, StaticContent, StaticItem} from 'comp/portlet/static'

import Modal from 'comp/modal/modal'
import {Confirm} from 'comp/modal/confirm'

import productListModel from 'models/productList'
import modelListModel from 'models/modelList'
import modelFormModel from 'models/modelForm'

class List extends Component{
	constructor(props){
		super(props)
		this.state = {
			static: null,
			isConfirm: false
		}
	}
	componentWillMount(){
		modelListModel.init()
	}
	componentDidMount(){
		modelListModel.setLoader(true)
		.then(() => {
			const product = productListModel.getDetail()
			modelListModel.loadList(product.id, true)
			.then((response) => {
				modelListModel.setLoader(false).then(()=>{})
			})
		})
	}
	_loadFeature(){
		System.import(`../../modules/productFeature`)
		.then(module => {
			const RealModule = module.default
			this.setState({static: RealModule})
		})
	}
	_loadFile(){
		System.import(`../../modules/productFile`)
		.then(module => {
			const RealModule = module.default
			this.setState({static: RealModule})
		})
	}
	_loadImage(){
		System.import(`../../modules/productImage`)
		.then(module => {
			const RealModule = module.default
			this.setState({static: RealModule})
		})
	}
	_loadTag(){
		System.import(`../../modules/productTag`)
		.then(module => {
			const RealModule = module.default
			this.setState({static: RealModule})
		})
	}
	_bindChangeStatic(mode){
		switch(mode){
			case 'all':
				this.setState({static: null})
				break
			case 'feature':
				this._loadFeature()
				break
			case 'tag':
				this._loadTag()
				break
			case 'file':
				this._loadFile()
				break
			case 'image':
				this._loadImage()
				break
			case 'tag':
				this._loadTag()
				break
		}
	}
	_bindSelectDetail(item){
		modelListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	_bindModalRemove(item){
		modelListModel.setDetail(item).then(()=>{
			this.setState({isConfirm: true})
		})
	}
	_bindUpdate(item){
		modelListModel.setDetail(item).then(()=>{
			modelFormModel.setValues(item).then(()=>{
				this.props.onUpdate(item)
			})
		})
	}
	_bindAcceptRemove(){
		const detail = modelListModel.getDetail()
		modelListModel.delete(detail)
		.then(() => {
			this.setState({isConfirm: false}, () => {
				const parentDetail = productListModel.getDetail()
				modelListModel.loadList(parentDetail.id, true)
			})
		})
	}
	render(){
		const list = modelListModel.getList()
		const loader = modelListModel.getLoader()
		const detail = modelListModel.getDetail()
		return (
			<div className="box">
				<Modal isOpen={this.state.isConfirm}>
					<Confirm onNo={() => this.setState({isConfirm: false})}
						onYes={this._bindAcceptRemove.bind(this)}/>
				</Modal>
				<StaticContent>
					{this.state.static ? <this.state.static/> : null}
				</StaticContent>
				<StaticList>
					<StaticItem onClick={this._bindChangeStatic.bind(this, 'all')}>Tất cả</StaticItem>
					<StaticItem onClick={this._bindChangeStatic.bind(this, 'tag')}>Thẻ</StaticItem>
					<StaticItem onClick={this._bindChangeStatic.bind(this, 'feature')}>Đặc tính</StaticItem>
					<StaticItem onClick={this._bindChangeStatic.bind(this, 'file')}>File</StaticItem>
					<StaticItem onClick={this._bindChangeStatic.bind(this, 'image')}>Ảnh</StaticItem>
				</StaticList>
				{loader ? <Loader/> : null}
				{
					list.length === 0
					? <div>Không có dữ liệu</div>
					:
					<Table>
						<TableRow>
							<TableHeader>Mẫu</TableHeader>
							<TableHeader>Sắp xếp</TableHeader>
							<TableHeader>Thao tác</TableHeader>
						</TableRow>
						{
							list.map((item, key) => {
								const active = (item.id === detail.id) ? true : false
								const status = item.status
								return (
									<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
										id={item.id}>
										<TableCell>{item.model}</TableCell>
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