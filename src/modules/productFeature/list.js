import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import productFeatureListModel from 'models/productFeatureList'
import productListModel from 'models/productList'

class List extends Component{
	componentWillMount(){
		productFeatureListModel.init()
	}
	componentDidMount(){
		const id = productListModel.getDetail().id
		productFeatureListModel.setLoader(true)
		.then(() => {
			productFeatureListModel.loadList({id})
			.then((response) => {
				productFeatureListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		productFeatureListModel.clear()
	}
	_bindSelectDetail(item){
		productFeatureListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	render(){
		const list = productFeatureListModel.getList()
		const loader = productFeatureListModel.getLoader()
		const detail = productFeatureListModel.getDetail()

		return (
			<div className="box">
			{loader ? <Loader/> : null}
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>Feature Name</TableHeader>
						<TableHeader>Ordered</TableHeader>
					</TableRow>
					{
						list.map((item, key) => {
							const active = (item.id === detail.id) ? true : false
							const status = item.status
							return (
								<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
									id={item.id}>
									<TableCell>{item.feature_name}</TableCell>
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