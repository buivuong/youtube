import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import specListModel from 'models/specList'
import specFormModel from 'models/specForm'

class List extends Component{
	componentWillMount(){
		specListModel.init()
	}
	componentDidMount(){
		specListModel.setLoader(true)
		.then(() => {
			specListModel.loadList()
			.then((response) => {
				specListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		specListModel.clear()
	}
	_bindSelectDetail(item){
		specListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	_bindModalRemove(item){
		specListModel.setDetail(item).then(()=>{
			this.setState({isConfirm: true})
		})
	}
	_bindUpdate(item){
		specFormModel.init()
		specListModel.setDetail(item).then(()=>{
			specFormModel.setValues(item).then(()=>{
				this.props.onUpdate(item)
			})
		})
	}
	_bindAcceptRemove(){
		const detail = specListModel.getDetail()
		specListModel.delete(detail)
		.then(() => {
			this.setState({isConfirm: false}, () => {
				const parentDetail = productCategoryListModel.getDetail()
				productCategoryTypeListModel.loadList(parentDetail.id, true)
			})
		})
	}
	render(){
		const list = specListModel.getList()
		const loader = specListModel.getLoader()
		const detail = specListModel.getDetail()

		return (
			<div className="box">
			{loader ? <Loader/> : null}
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>Tên (En)</TableHeader>
						<TableHeader>Unit (en)</TableHeader>
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
									<TableCell>{item.unit_en}</TableCell>
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