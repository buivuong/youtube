import React, {Component} from 'react'

import {Group as FormGroup} from 'comp/form/group'
import Input from 'comp/form/input'
import Button from 'comp/button/button'
import Loader from 'comp/loader/loader'
import {Grid, Col} from 'comp/grid/grid'
import Dropdown from 'comp/form/dropdown'

import productFeatureFormModel from 'models/productFeatureForm'
import productFeatureListModel from 'models/productFeatureList'
import mediaImageListModel from 'models/mediaImageList'

import productListModel from 'models/productList'
import featureListModel from 'models/featureList'

import uuid from 'uuid/v4'
import {formatDT} from 'config/helper'
import {IMG_URL} from 'config/app'

class ProductFeatureCreate extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		productFeatureFormModel.init()
	}
	componentWillUnmount(){
		productFeatureFormModel.reset()
	}
	_bindChange(field, value){
		productFeatureFormModel.setValue(field, value)
		.then(() => {
			this._checkError(field, value)
		})
	}
	_bindSubmit(){
		this._create()
	}
	_create(){
		const values = productFeatureFormModel.getValues()
		const realValues = JSON.parse(JSON.stringify(values))
		realValues.created_at = realValues.updated_at = formatDT(new Date())
		realValues.product_id = productListModel.getDetail().id
		realValues.ordered = productFeatureListModel.getLength()
		productFeatureFormModel.setLoader(true)
		.then(() => {
			productFeatureFormModel.create(realValues)
			.then((response) => {
				productFeatureFormModel.setLoader(false)
				.then(() => {
					productFeatureListModel.unshift(realValues)
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
		productFeatureFormModel.setError(field, error)
		return error
	}
	render(){
		const errors = productFeatureFormModel.getErrors()
		const loader = productFeatureFormModel.getLoader()
		return (
			<div className="box">
				{loader ? <Loader/> : null}
				<Grid>
					<Col size="1-1">
						<FormGroup label="Feature">
							<Dropdown onChange={this._bindChange.bind(this, 'feature_id')} 
								code="id" display="name_en"
								list={featureListModel.getList()}/>
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

export default ProductFeatureCreate