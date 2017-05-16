import Tree from 'app/tree'

const values = {
	product_id: '',
	feature_id: ''
}

const errors = {
	
}

import axios from 'axios'

class ProductFeatureForm{
	static init(){
		const form = Tree.get('productFeatureForm')
		if(is.null(form))
			Tree.set('productFeatureForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('productFeatureForm')
		return !is.null(form) ? Tree.get('productFeatureForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('productFeatureForm')
		return !is.null(form) ? Tree.get('productFeatureForm', 'errors') : {}
	}
	static getName(lang){
		return Tree.get('productFeatureForm', 'values', 'name_'+lang)
	}
	static getLoader(){
		return Tree.get('productFeatureForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('productFeatureForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('productFeatureForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['productFeatureForm', 'loader'], loader)
			Tree.select('productFeatureForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('productFeatureForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('productFeature/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ProductFeatureForm