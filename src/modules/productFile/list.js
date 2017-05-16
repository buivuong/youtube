import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import productFileListModel from 'models/productFileList'
import productListModel from 'models/productList'

class List extends Component{
	componentWillMount(){
		productFileListModel.init()
	}
	componentDidMount(){
		const id = productListModel.getDetail().id
		productFileListModel.setLoader(true)
		.then(() => {
			productFileListModel.loadList({id})
			.then((response) => {
				productFileListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		productFileListModel.clear()
	}
	_bindSelectDetail(item){
		productFileListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	render(){
		const list = productFileListModel.getList()
		const loader = productFileListModel.getLoader()
		const detail = productFileListModel.getDetail()

		return (
			<div className="box">
			{loader ? <Loader/> : null}
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>File Name</TableHeader>
						<TableHeader>File Name (vi)</TableHeader>
						<TableHeader>Ordered</TableHeader>
					</TableRow>
					{
						list.map((item, key) => {
							const active = (item.id === detail.id) ? true : false
							const status = item.status
							return (
								<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
									id={item.id}>
									<TableCell>{item.url_en}</TableCell>
									<TableCell>{item.url_vi}</TableCell>
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