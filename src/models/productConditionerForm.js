import Tree from 'app/tree'

const values = {
	title: ''
}

const errors = {
	title: ''
}

import axios from 'axios'

class ProductConditionerForm{
	static init(){
		const form = Tree.get('productConditionerForm')
		if(is.null(form))
			Tree.set('productConditionerForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('productConditionerForm')
		return !is.null(form) ? Tree.get('productConditionerForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('productConditionerForm')
		return !is.null(form) ? Tree.get('productConditionerForm', 'errors') : {}
	}
	static getTitle(){
		return Tree.get('productConditionerForm', 'values', 'title')
	}
	static getLoader(){
		return Tree.get('productConditionerForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('productConditionerForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('productConditionerForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['productConditionerForm', 'loader'], loader)
			Tree.select('productConditionerForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('productConditionerForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('productConditioner/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ProductConditionerForm