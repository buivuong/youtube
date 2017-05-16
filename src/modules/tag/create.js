import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import tagFormModel from 'models/tagForm'
import tagListModel from 'models/tagList'
import mediaImageListModel from 'models/mediaImageList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class TagCreate extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		tagFormModel.init()
	}
	componentWillUnmount(){
		tagFormModel.reset()
	}
	_bindChange(field, value){
		tagFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		const title_en = tagFormModel.getTitle('en')
		const title_vi = tagFormModel.getTitle('vi')
		let error = this._checkError('title_en', title_en)
		if(is.empty(error))
			error = this._checkError('title_vi', title_vi)
		if(is.empty(error))
			this._create()
	}
	_create(){
		const values = tagFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = uuid()
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		tagFormModel.setLoader(true)
		.then(() => {
			tagFormModel.create(realValues)
			.then((response) => {
				tagFormModel.setLoader(false)
				.then(() => {
					tagListModel.unshift(realValues)
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
			case 'title_en': case 'title_vi':
				if(is.empty(value))
					error = 'phải nhập'
				break
		}
		tagFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = tagFormModel.getErrors()
		const loader = tagFormModel.getLoader()
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

export default TagCreate