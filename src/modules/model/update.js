import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import modelFormModel from 'models/modelForm'
import modelListModel from 'models/modelList'
import mediaImageListModel from 'models/mediaImageList'
import productListModel from 'models/productList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class ModelUpdate extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		modelFormModel.init()
	}
	componentWillUnmount(){
		modelFormModel.reset()
	}
	_bindChange(field, value){
		modelFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		const model = modelFormModel.getModel()
		let error = this._checkError('model', model)
		if(is.empty(error))
			this._update()
	}
	_update(){
		const values = modelFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = uuid()
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.ordered = modelListModel.getLength()
		realValues.model_id = modelListModel.getDetail().id
		modelFormModel.setLoader(true)
		.then(() => {
			modelFormModel.create(realValues)
			.then((response) => {
				modelFormModel.setLoader(false)
				.then(() => {
					modelListModel.unshift(realValues)
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
			case 'model':
				if(is.empty(value))
					error = 'phải nhập'
				break
		}
		modelFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = modelFormModel.getErrors()
		const loader = modelFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-2">
						<FormGroup error={errors.model} required label="Model">
							<Input onChange={this._bindChange.bind(this, 'model')}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="">
							<Input onChange={this._bindChange.bind(this, '')}/>
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

export default ModelUpdate