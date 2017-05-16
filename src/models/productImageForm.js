import Tree from 'app/tree'

const values = {
	'product_id': '',
	'media_image_id': '',
	'name_en': '',
	'name_vi': ''
}

const errors = {
	
}

import axios from 'axios'

class ProductImageForm{
	static init(){
		const form = Tree.get('productImageForm')
		if(is.null(form))
			Tree.set('productImageForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('productImageForm')
		return !is.null(form) ? Tree.get('productImageForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('productImageForm')
		return !is.null(form) ? Tree.get('productImageForm', 'errors') : {}
	}
	static getName(lang){
		return Tree.get('productImageForm', 'values', 'name_'+lang)
	}
	static getLoader(){
		return Tree.get('productImageForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('productImageForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('productImageForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['productImageForm', 'loader'], loader)
			Tree.select('productImageForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('productImageForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('productImage/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ProductImageForm