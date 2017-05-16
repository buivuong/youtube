import Tree from 'app/tree'

const values = {
	product_id: '',
	tag_id: ''
}

const errors = {
	
}

import axios from 'axios'

class ProductTagForm{
	static init(){
		const form = Tree.get('productTagForm')
		if(is.null(form))
			Tree.set('productTagForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('productTagForm')
		return !is.null(form) ? Tree.get('productTagForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('productTagForm')
		return !is.null(form) ? Tree.get('productTagForm', 'errors') : {}
	}
	static getName(lang){
		return Tree.get('productTagForm', 'values', 'name_'+lang)
	}
	static getLoader(){
		return Tree.get('productTagForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('productTagForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('productTagForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['productTagForm', 'loader'], loader)
			Tree.select('productTagForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('productTagForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('productTag/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ProductTagForm