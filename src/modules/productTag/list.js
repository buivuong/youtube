import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import productTagListModel from 'models/productTagList'
import productListModel from 'models/productList'

class List extends Component{
	componentWillMount(){
		productTagListModel.init()
	}
	componentDidMount(){
		const id = productListModel.getDetail().id
		productTagListModel.setLoader(true)
		.then(() => {
			productTagListModel.loadList({id})
			.then((response) => {
				productTagListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		productTagListModel.clear()
	}
	_bindSelectDetail(item){
		productTagListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	render(){
		const list = productTagListModel.getList()
		const loader = productTagListModel.getLoader()
		const detail = productTagListModel.getDetail()

		return (
			<div className="box">
			{loader ? <Loader/> : null}
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>Tag Name</TableHeader>
						<TableHeader>Ordered</TableHeader>
					</TableRow>
					{
						list.map((item, key) => {
							const active = (item.id === detail.id) ? true : false
							const status = item.status
							return (
								<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
									id={item.id}>
									<TableCell>{item.tag_title}</TableCell>
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

export default List