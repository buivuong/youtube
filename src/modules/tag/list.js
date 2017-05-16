import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import tagListModel from 'models/tagList'

class List extends Component{
	componentWillMount(){
		tagListModel.init()
	}
	componentDidMount(){
		tagListModel.setLoader(true)
		.then(() => {
			tagListModel.loadList()
			.then((response) => {
				tagListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		tagListModel.clear()
	}
	_bindSelectDetail(item){
		tagListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	render(){
		const list = tagListModel.getList()
		const loader = tagListModel.getLoader()
		const detail = tagListModel.getDetail()

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