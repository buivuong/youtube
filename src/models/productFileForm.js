import Tree from 'app/tree'

const values = {
	product_id: '',
	url_en: '',
	url_vi: '',
	name_en: '',
	name_vi: ''
}

const errors = {
	
}

import axios from 'axios'

class ProductFileForm{
	static init(){
		const form = Tree.get('productFileForm')
		if(is.null(form))
			Tree.set('productFileForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('productFileForm')
		return !is.null(form) ? Tree.get('productFileForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('productFileForm')
		return !is.null(form) ? Tree.get('productFileForm', 'errors') : {}
	}
	static getName(lang){
		return Tree.get('productFileForm', 'values', 'name_'+lang)
	}
	static getLoader(){
		return Tree.get('productFileForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('productFileForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('productFileForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['productFileForm', 'loader'], loader)
			Tree.select('productFileForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('productFileForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('productFile/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ProductFileForm