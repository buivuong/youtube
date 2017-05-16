import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'

import productCategoryTypeFormModel from 'models/productCategoryTypeForm'
import productCategoryTypeListModel from 'models/productCategoryTypeList'
import productCategoryListModel from 'models/productCategoryList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'

class CategoryTypeCreate extends Component{
	componentWillMount(){
		productCategoryTypeFormModel.init()
	}
	componentWillUnmount(){
		productCategoryTypeFormModel.reset()
	}
	_bindChange(field, value){
		productCategoryTypeFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		const title_en = productCategoryTypeFormModel.getTitle('en')
		const title_vi = productCategoryTypeFormModel.getTitle('vi')
		let error = this._checkError('title_en', title_en)
		if(is.empty(error))
			error = this._checkError('title_vi', title_vi)
		if(is.empty(error))
			this._create()
	}
	_create(){
		const values = productCategoryTypeFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = uuid()
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.ordered = productCategoryTypeListModel.getLength()
		realValues.category_id = productCategoryListModel.getDetail().id
		productCategoryTypeFormModel.setLoader(true)
		.then(() => {
			productCategoryTypeFormModel.create(realValues)
			.then((response) => {
				productCategoryTypeFormModel.setLoader(false)
				.then(() => {
					this.props.onSuccess(response)
				})
			})
		})
	}
	_checkError(field, value){
		let error = ''
		switch(field){
			case 'title_en': case 'title_vi':
				if(is.empty(value))
					error = 'phải nhập'
				break
		}
		productCategoryTypeFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = productCategoryTypeFormModel.getErrors()
		const loader = productCategoryTypeFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-2">
						<FormGroup error={errors.title_en} required label="Tiêu đề (En)">
							<Input onChange={this._bindChange.bind(this, 'title_en')}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup error={errors.title_vi} required label="Tiêu đề (Vi)">
							<Input onChange={this._bindChange.bind(this, 'title_vi')}/>
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

export default CategoryTypeCreate