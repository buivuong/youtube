import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import Modal from 'comp/modal/modal'
import {Confirm} from 'comp/modal/confirm'

import productCategoryTypeListModel from 'models/productCategoryTypeList'
import productCategoryListModel from 'models/productCategoryList'
import productCategoryTypeFormModel from 'models/productCategoryTypeForm'

import Tree from 'app/tree'

class CategoryTypeList extends Component{
	constructor(props){
		super(props)
		this.state = {
			isConfirm: false
		}
	}
	componentWillMount(){
		productCategoryTypeListModel.init()
	}
	componentDidMount(){
		productCategoryTypeListModel.setLoader(true)
		.then(() => {
			const category = productCategoryListModel.getDetail()
			productCategoryTypeListModel.loadList(category.id, true)
			.then((response) => {
				productCategoryTypeListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		productCategoryTypeListModel.clear()
	}
	_bindSelectDetail(item){
		productCategoryTypeListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	_bindModalRemove(item){
		productCategoryTypeListModel.setDetail(item).then(()=>{
			this.setState({isConfirm: true})
		})
	}
	_bindUpdate(item){
		productCategoryTypeListModel.setDetail(item).then(()=>{
			productCategoryTypeFormModel.setValues(item).then(()=>{
				this.props.onUpdate(item)
			})
		})
	}
	_bindAcceptRemove(){
		const detail = productCategoryTypeListModel.getDetail()
		productCategoryTypeListModel.delete(detail)
		.then(() => {
			this.setState({isConfirm: false}, () => {
				const parentDetail = productCategoryListModel.getDetail()
				productCategoryTypeListModel.loadList(parentDetail.id, true)
			})
		})
	}
	render(){
		const list = productCategoryTypeListModel.getList()
		const loader = productCategoryTypeListModel.getLoader()
		return (
			<div className="box">
				<Modal isOpen={this.state.isConfirm}>
					<Confirm onNo={() => this.setState({isConfirm: false})}
						onYes={this._bindAcceptRemove.bind(this)}/>
				</Modal>
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
						<TableHeader>Thao tác</TableHeader>
					</TableRow>
					{
						list.map((item, key) => {
							return (
								<TableRow key={key}
									id={item.id}>
									<TableCell>
										<a onClick={this._bindSelectDetail.bind(this, item)}>{item.title_en}</a>
									</TableCell>
									<TableCell>{item.title_vi}</TableCell>
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

export default CategoryTypeList