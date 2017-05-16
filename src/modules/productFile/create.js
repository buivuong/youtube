import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import productFileFormModel from 'models/productFileForm'
import productFileListModel from 'models/productFileList'
import mediaImageListModel from 'models/mediaImageList'

import productListModel from 'models/productList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class ProductFileCreate extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		productFileFormModel.init()
	}
	componentWillUnmount(){
		productFileFormModel.reset()
	}
	_bindChange(field, value){
		productFileFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		this._create()
	}
	_create(){
		const values = productFileFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = uuid()
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.product_id = productListModel.getDetail().id
		realValues.ordered = productFileListModel.getLength()
		productFileFormModel.setLoader(true)
		.then(() => {
			productFileFormModel.create(realValues)
			.then((response) => {
				productFileFormModel.setLoader(false)
				.then(() => {
					productFileListModel.unshift(realValues)
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
		productFileFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = productFileFormModel.getErrors()
		const loader = productFileFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-2">
						<FormGroup label="URL (En)">
							<Input onChange={this._bindChange.bind(this, 'url_en')}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="URL (Vi)">
							<Input onChange={this._bindChange.bind(this, 'url_vi')}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Name (En)">
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

export default ProductFileCreate