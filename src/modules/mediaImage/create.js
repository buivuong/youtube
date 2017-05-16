import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'

import mediaImageFormModel from 'models/mediaImageForm'
import mediaImageListModel from 'models/mediaImageList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class MediaImageCreate extends Component{
	constructor(props){
		super(props)
		this.state = {
			image: ''
		}
	}
	componentWillMount(){
		mediaImageFormModel.init()
	}
	componentWillUnmount(){
		mediaImageFormModel.reset()
	}
	_bindChange(field, value){
		mediaImageFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		const title_en = mediaImageFormModel.getTitle('en')
		const title_vi = mediaImageFormModel.getTitle('vi')
		const image = mediaImageFormModel.getImage()
		let error = this._checkError('title_en', title_en)
		if(is.empty(error))
			error = this._checkError('title_vi', title_vi)
		if(is.empty(error))
			error = this._checkError('image', image)
		if(is.empty(error))
			this._create()
	}
	_create(){
		const values = mediaImageFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = uuid()
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.image = IMG_URL+realValues.image
		mediaImageFormModel.setLoader(true)
		.then(() => {
			mediaImageFormModel.create(realValues)
			.then((response) => {
				mediaImageFormModel.setLoader(false)
				.then(() => {
					mediaImageListModel.unshift(realValues)
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
			case 'image':
				if(is.empty(value))
					error = 'phải nhập'
				break
		}
		mediaImageFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = mediaImageFormModel.getErrors()
		const loader = mediaImageFormModel.getLoader()
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
				<Grid>
					<Col size="1-2">
						<FormGroup error={errors.image} required label="Ảnh">
							<Input onChange={this._bindChange.bind(this, 'image')}
								onEnter={(value) => this.setState({image: value})}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<img src={`${IMG_URL}${this.state.image}`} width="150px" height="150px"/>
					</Col>
				</Grid>
				<FormGroup>
					<Button onClick={this._bindSubmit.bind(this)}>Lưu</Button>
				</FormGroup>
			</div>
		)
	}
}

export default MediaImageCreate