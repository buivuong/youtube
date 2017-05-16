import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'


import Modal from 'comp/modal/modal'
import {Confirm} from 'comp/modal/confirm'
import Loader from 'comp/loader/loader'

import modelSpecListModel from 'models/modelSpecList'
import modelSpecFormModel from 'models/modelSpecForm'
import modelListModel from 'models/modelList'
import specListModel from 'models/specList'

class List extends Component{
	componentWillMount(){
		modelSpecListModel.init()
		this.state = {
			isConfirm: false
		}
	}
	componentDidMount(){
		const id = modelListModel.getDetail().id
		specListModel.loadList()
		.then(() => {
			modelSpecListModel.setLoader(true)
			.then(() => {
				modelSpecListModel.loadList({id})
				.then((response) => {
					modelSpecListModel.setLoader(false).then(()=>{})
				})
			})
		})
	}
	componentWillUnmount(){
		modelSpecListModel.clear()
	}
	_bindSelectDetail(item){
		modelSpecListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	_bindModalRemove(item){
		modelSpecListModel.setDetail(item).then(()=>{
			this.setState({isConfirm: true})
		})
	}
	_bindUpdate(item){
		modelSpecListModel.setDetail(item).then(()=>{
			modelSpecFormModel.setValues(item).then(()=>{
				this.props.onUpdate(item)
			})
		})
	}
	_bindAcceptRemove(){
		const detail = modelSpecListModel.getDetail()
		modelSpecListModel.delete(detail)
		.then(() => {
			this.setState({isConfirm: false}, () => {
				const id = modelListModel.getDetail().id
				modelSpecListModel.loadList(id, true)
			})
		})
	}
	render(){
		const list = modelSpecListModel.getList()
		const loader = modelSpecListModel.getLoader()
		const detail = modelSpecListModel.getDetail()
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
						<TableHeader>Specific</TableHeader>
						<TableHeader>Specific Unit</TableHeader>
						<TableHeader>Value</TableHeader>
						<TableHeader>Ordered</TableHeader>
						<TableHeader/>
					</TableRow>
					{
						list.map((item, key) => {
							const active = (item.id === detail.id) ? true : false
							const status = item.status
							return (
								<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
									id={item.id}>
									<TableCell>{item.specific_name}</TableCell>
									<TableCell>{item.specific_unit}</TableCell>
									<TableCell>{item.value_en}</TableCell>
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