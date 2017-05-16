import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import productTagFormModel from 'models/productTagForm'
import productTagListModel from 'models/productTagList'
import mediaImageListModel from 'models/mediaImageList'

import productListModel from 'models/productList'
import tagListModel from 'models/tagList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class ProductTagCreate extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		productTagFormModel.init()
	}
	componentWillUnmount(){
		productTagFormModel.reset()
	}
	_bindChange(field, value){
		productTagFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		this._create()
	}
	_create(){
		const values = productTagFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.product_id = productListModel.getDetail().id
		realValues.ordered = productTagListModel.getLength()
		productTagFormModel.setLoader(true)
		.then(() => {
			productTagFormModel.create(realValues)
			.then((response) => {
				productTagFormModel.setLoader(false)
				.then(() => {
					productTagListModel.unshift(realValues)
					.then(() => {
						this.props.onSuccess(response)
					})
				})
			})
		})
	}
	_checkError(field, value){
		let error = ''
		switch(field){
			case 'name_en': case 'name_vi':
				if(is.empty(value))
					error = 'phải nhập'
				break
		}
		productTagFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = productTagFormModel.getErrors()
		const loader = productTagFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-1">
						<FormGroup label="Tag">
							<Dropdown onChange={this._bindChange.bind(this, 'tag_id')} 
								code="id" display="title_en"
								list={tagListModel.getList()}/>
						</FormGroup>
					</Col>
				</Grid>
				<FormGroup>
					<Button onClick={this._bindSubmit.bind(this)}>Lưu</Button>
				</FormGroup>
			</div>
		)
	}
}

export default ProductTagCreate