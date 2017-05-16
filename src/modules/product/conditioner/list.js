import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import productConditionerListModel from 'models/productConditionerList'

class ConditionerList extends Component{
	componentWillMount(){
		productConditionerListModel.init()
	}
	componentDidMount(){
		productConditionerListModel.setLoader(true)
		.then(() => {
			productConditionerListModel.loadList()
			.then((response) => {
				productConditionerListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		productConditionerListModel.clear()
	}
	_bindSelectDetail(item){
		productConditionerListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	render(){
		const list = productConditionerListModel.getList()
		const loader = productConditionerListModel.getLoader()
		const detail = productConditionerListModel.getDetail()

		return (
			<div className="box">
			{loader ? <Loader/> : null}	
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>Tiêu đề (En)</TableHeader>
						<TableHeader>Tiêu đề (Vi)</TableHeader>
						<TableHeader>Sắp xếp</TableHeader>
					</TableRow>
					{
						list.map((item, key) => {
							const active = (item.id === detail.id) ? true : false
							const status = item.status
							return (
								<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
									id={item.id}>
									<TableCell>{item.title_en}</TableCell>
									<TableCell>{item.title_vi}</TableCell>
									<TableCell>{item.ordered}</TableCell>
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

export default ConditionerList