import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import productImageFormModel from 'models/productImageForm'
import productImageListModel from 'models/productImageList'
import mediaImageListModel from 'models/mediaImageList'

import productListModel from 'models/productList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class ProductImageCreate extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		productImageFormModel.init()
	}
	componentWillUnmount(){
		productImageFormModel.reset()
	}
	_bindChange(field, value){
		productImageFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		this._create()
	}
	_create(){
		const values = productImageFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = uuid()
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.product_id = productListModel.getDetail().id
		realValues.ordered = productImageListModel.getLength()
		productImageFormModel.setLoader(true)
		.then(() => {
			productImageFormModel.create(realValues)
			.then((response) => {
				productImageFormModel.setLoader(false)
				.then(() => {
					productImageListModel.unshift(realValues)
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
		productImageFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = productImageFormModel.getErrors()
		const loader = productImageFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-1">
						<FormGroup label="Hình ảnh">
							<Dropdown onChange={this._bindChange.bind(this, 'media_image_id')} 
								code="id" display="title_en"
								list={mediaImageListModel.getList()}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Name (en)">
							<Input onChange={this._bindChange.bind(this, 'name_en')}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Name (Vi)">
							<Input onChange={this._bindChange.bind(this, 'name_vi')}/>
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

export default ProductImageCreate