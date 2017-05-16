import Tree from 'app/tree'

const values = {
	media_image_id: '',
	name_en: '',
	name_vi: '',
	content_en: '',
	content_vi: '',
	description_en: '',
	description_vi: '',
	ordered: ''
}

const errors = {
	name_en: '',
	name_vi: ''
}

import axios from 'axios'

class ProductForm{
	static init(){
		const form = Tree.get('productForm')
		if(is.null(form))
			Tree.set('productForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('productForm')
		return !is.null(form) ? Tree.get('productForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('productForm')
		return !is.null(form) ? Tree.get('productForm', 'errors') : {}
	}
	static getName(lang){
		return Tree.get('productForm', 'values', 'name_'+lang)
	}
	static getLoader(){
		return Tree.get('productForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('productForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setValues(values){
		return new Promise((resolve, reject) => {
			const values = Tree.select('productForm')
			values.set('values', values)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('productForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['productForm', 'loader'], loader)
			Tree.select('productForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('productForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('product/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
	static update(values){
		return new Promise((resolve, reject) => {
			axios.post('product/update', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ProductForm