import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import featureListModel from 'models/featureList'
import featureFormModel from 'models/featureForm'

class List extends Component{
	componentWillMount(){
		featureListModel.init()
	}
	componentDidMount(){
		featureListModel.setLoader(true)
		.then(() => {
			featureListModel.loadList()
			.then((response) => {
				featureListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		featureListModel.clear()
	}
	_bindSelectDetail(item){
		featureListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	_bindSearch(event){
		featureListModel.filter(event.target.value)
	}
	_bindModalRemove(item){
		featureListModel.setDetail(item).then(()=>{
			this.setState({isConfirm: true})
		})
	}
	_bindUpdate(item){
		featureListModel.setDetail(item).then(()=>{
			featureFormModel.setValues(item).then(()=>{
				this.props.onUpdate(item)
			})
		})
	}
	_bindAcceptRemove(){
		const detail = featureListModel.getDetail()
		featureListModel.delete(detail)
		.then(() => {
			this.setState({isConfirm: false}, () => {
				const parentDetail = featureListModel.getDetail()
				featureListModel.loadList(parentDetail.id, true)
			})
		})
	}
	render(){
		const list = featureListModel.getList()
		const loader = featureListModel.getLoader()
		const detail = featureListModel.getDetail()
		return (
			<div className="box">
			<h3>Tên</h3>
			<input type="text" onChange={this._bindSearch.bind(this)} style={{border: '1px solid black'}}/>
			{loader ? <Loader/> : null}
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>Tên (En)</TableHeader>
						<TableHeader>Tên (Vi)</TableHeader>
						<TableHeader>Diễn giải (En)</TableHeader>
						<TableHeader>Diễn giải (Vi)</TableHeader>
						<TableHeader>Thao tác</TableHeader>
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
									<TableCell>{item.description_en}</TableCell>
									<TableCell>{item.description_vi}</TableCell>
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