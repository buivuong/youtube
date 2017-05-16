import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import productImageListModel from 'models/productImageList'
import productListModel from 'models/productList'

class List extends Component{
	componentWillMount(){
		productImageListModel.init()
	}
	componentDidMount(){
		const id = productListModel.getDetail().id
		productImageListModel.setLoader(true)
		.then(() => {
			productImageListModel.loadList({id})
			.then((response) => {
				productImageListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		productImageListModel.clear()
	}
	_bindSelectDetail(item){
		productImageListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	render(){
		const list = productImageListModel.getList()
		const loader = productImageListModel.getLoader()
		const detail = productImageListModel.getDetail()

		return (
			<div className="box">
			{loader ? <Loader/> : null}
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>Image name</TableHeader>
						<TableHeader>Ordered</TableHeader>
					</TableRow>
					{
						list.map((item, key) => {
							const active = (item.id === detail.id) ? true : false
							const status = item.status
							return (
								<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
									id={item.id}>
									<TableCell>{item.name_en}</TableCell>
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