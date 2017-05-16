import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import featureFormModel from 'models/featureForm'
import featureListModel from 'models/featureList'
import mediaImageListModel from 'models/mediaImageList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class FeatureCreate extends Component{
	constructor(props){
		super(props)
		this.state = {
			image: ''
		}
	}
	componentWillMount(){
		featureFormModel.init()
	}
	componentWillUnmount(){
		featureFormModel.reset()
	}
	_bindChange(field, value){
		featureFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		const name_en = featureFormModel.getName('en')
		const name_vi = featureFormModel.getName('vi')
		let error = this._checkError('name_en', name_en)
		if(is.empty(error))
			error = this._checkError('name_vi', name_vi)
		if(is.empty(error))
			this._update()
	}
	_update(){
		const values = featureFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.id = featureListModel.getDetail().id
		realValues.updated_at = formatDT(new Date())
		featureFormModel.setLoader(true)
		.then(() => {
			featureFormModel.update(realValues)
			.then((response) => {
				featureFormModel.setLoader(false)
				.then(() => {
					featureListModel.unshift(realValues)
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
		featureFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = featureFormModel.getErrors()
		const loader = featureFormModel.getLoader()
		const values = featureFormModel.getValues()

		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-2">
						<FormGroup label="Hình ảnh (Vi)">
							<Dropdown onChange={this._bindChange.bind(this, 'media_image_id')}
								value={values.media_image_id}
								code="id" display="title_en"
								list={mediaImageListModel.getList()}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Hình ảnh (En)">
							<Dropdown onChange={this._bindChange.bind(this, 'media_image_id_en')}
								value={values.media_image_id_en}
								code="id" display="title_en"
								list={mediaImageListModel.getList()}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Tên (En)">
							<Input onChange={this._bindChange.bind(this, 'name_en')}
								value={values.name_en}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Tên (Vi)">
							<Input onChange={this._bindChange.bind(this, 'name_vi')}
								value={values.name_vi}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Diễn giải (En)">
							<Input onChange={this._bindChange.bind(this, 'description_en')}
								value={values.description_en}/>
						</FormGroup>
					</Col>
					<Col size="1-2">
						<FormGroup label="Diễn giải (Vi)">
							<Input onChange={this._bindChange.bind(this, 'description_vi')}
								value={values.description_vi}/>
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

export default FeatureCreate