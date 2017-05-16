import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import productCategoryListModel from 'models/productCategoryList'
import productConditionerListModel from 'models/productConditionerList'

class CategoryList extends Component{
	componentWillMount(){
		productCategoryListModel.init()
	}
	componentDidMount(){
		productCategoryListModel.setLoader(true)
		.then(() => {
			const conditioner = productConditionerListModel.getDetail()
			productCategoryListModel.loadList(conditioner.id, true)
			.then((response) => {
				productCategoryListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		productCategoryListModel.clear()
	}
	_bindSelectDetail(item){
		productCategoryListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	render(){
		const list = productCategoryListModel.getList()
		const loader = productCategoryListModel.getLoader()
		const detail = productCategoryListModel.getDetail()

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
						<TableHeader>Tên (Vi)</TableHeader>
						<TableHeader>Sắp xếp</TableHeader>
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

export default CategoryList