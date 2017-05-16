import React, {Component} from 'react'

import {Table, TableRow, TableCell, TableHeader} from 'comp/table/table'

import Loader from 'comp/loader/loader'

import mediaImageListModel from 'models/mediaImageList'

class List extends Component{
	componentWillMount(){
		mediaImageListModel.init()
	}
	componentDidMount(){
		mediaImageListModel.setLoader(true)
		.then(() => {
			mediaImageListModel.loadList()
			.then((response) => {
				mediaImageListModel.setLoader(false).then(()=>{})
			})
		})
	}
	componentWillUnmount(){
		mediaImageListModel.clear()
	}
	_bindSelectDetail(item){
		mediaImageListModel.setDetail(item).then(()=>{
			if(!is.undefined(this.props.onSelectRow))
				this.props.onSelectRow(item)
		})
	}
	_bindSearch(event){

	}
	render(){
		const list = mediaImageListModel.getList()
		const loader = mediaImageListModel.getLoader()
		const detail = mediaImageListModel.getDetail()
		return (
			<div className="box">
			{loader ? <Loader/> : null}
			<h3>Tìm kiếm</h3>
			<input type="text" onChange={this._bindSearch.bind(this)}/>
			{
				list.length === 0
				? <div>Không có dữ liệu</div>
				:
				<Table>
					<TableRow>
						<TableHeader>Ảnh</TableHeader>
						<TableHeader>Tên (En)</TableHeader>
						<TableHeader>Tên (Vi)</TableHeader>
					</TableRow>
					{
						list.map((item, key) => {
							const active = (item.id === detail.id) ? true : false
							const status = item.status
							return (
								<TableRow key={key} onClick={this._bindSelectDetail.bind(this, item)} active={active} status={status}
									id={item.id}>
									<TableCell><img src={item.image} width="30px" height="30px"/></TableCell>
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