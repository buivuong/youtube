import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import modelSpecFormModel from 'models/modelSpecForm'
import modelSpecListModel from 'models/modelSpecList'
import mediaImageListModel from 'models/mediaImageList'

import modelListModel from 'models/modelList'
import specListModel from 'models/specList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class ModelSpecCreate extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		modelSpecFormModel.init()
	}
	componentWillUnmount(){
		modelSpecFormModel.reset()
	}
	_bindChange(field, value){
		modelSpecFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		this._create()
	}
	_create(){
		const values = modelSpecFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.model_id = modelListModel.getDetail().id
		realValues.ordered = modelSpecListModel.getLength()
		modelSpecFormModel.setLoader(true)
		.then(() => {
			modelSpecFormModel.create(realValues)
			.then((response) => {
				modelSpecFormModel.setLoader(false)
				.then(() => {
					modelSpecListModel.unshift(realValues)
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
		modelSpecFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = modelSpecFormModel.getErrors()
		const loader = modelSpecFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-1">
						<FormGroup label="Spec">
							<Dropdown onChange={this._bindChange.bind(this, 'spec_id')} 
								code="id" display="name_en"
								list={specListModel.getList()}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Value (En)">
							<Input onChange={this._bindChange.bind(this, 'value_en')}/>
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

export default ModelSpecCreate