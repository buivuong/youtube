import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import specFormModel from 'models/specForm'
import specListModel from 'models/specList'
import mediaImageListModel from 'models/mediaImageList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class SpecCreate extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		specFormModel.init()
	}
	componentWillUnmount(){
		specFormModel.reset()
	}
	_bindChange(field, value){
		specFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		const name_en = specFormModel.getName('en')
		const name_vi = specFormModel.getName('vi')
		let error = this._checkError('name_en', name_en)
		if(is.empty(error))
			error = this._checkError('name_vi', name_vi)
		if(is.empty(error))
			this._create()
	}
	_create(){
		const values = specFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = uuid()
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		specFormModel.setLoader(true)
		.then(() => {
			specFormModel.create(realValues)
			.then((response) => {
				specFormModel.setLoader(false)
				.then(() => {
					specListModel.unshift(realValues)
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
		specFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = specFormModel.getErrors()
		const loader = specFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-2">
						<FormGroup error={errors.name_en} required label="Tên (En)">
							<Input onChange={this._bindChange.bind(this, 'name_en')}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup error={errors.name_vi} required label="Tên (Vi)">
							<Input onChange={this._bindChange.bind(this, 'name_vi')}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Unit (En)">
							<Input onChange={this._bindChange.bind(this, 'unit_en')}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Unit (Vi)">
							<Input onChange={this._bindChange.bind(this, 'unit_vi')}/>
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

export default SpecCreate