import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'

import productConditionerFormModel from 'models/productConditionerForm'
import productConditionerListModel from 'models/productConditionerList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'

class ConditionerCreate extends Component{
	componentWillMount(){
		productConditionerFormModel.init()
	}
	componentWillUnmount(){
		productConditionerFormModel.reset()
	}
	_bindChange(field, value){
		productConditionerFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		const title = productConditionerFormModel.getTitle()
		const error = this._checkError('title', title)
		if(is.empty(error))
			this._create()
	}
	_create(){
		const values = productConditionerFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = uuid()
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.ordered = productConditionerListModel.getLength()
		productConditionerFormModel.setLoader(true)
		.then(() => {
			productConditionerFormModel.create(realValues)
			.then((response) => {
				productConditionerFormModel.setLoader(false)
				.then(() => {
					productConditionerListModel.unshift(realValues)
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
			case 'title':
				if(is.empty(value))
					error = 'phải nhập'
				break
		}
		productConditionerFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = productConditionerFormModel.getErrors()
		const loader = productConditionerFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<FormGroup error={errors.title} required label="Tiêu đề">
					<Input onChange={this._bindChange.bind(this, 'title')}/>
				</FormGroup>
				<FormGroup>
					<Button onClick={this._bindSubmit.bind(this)}>Lưu</Button>
				</FormGroup>
			</div>
		)
	}
}

export default ConditionerCreate