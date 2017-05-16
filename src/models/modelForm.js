import Tree from 'app/tree'

const values = {
	product_id: '',
	model: '',
	type_en: '',
	type_vi: '',
	ordered: ''
}

const errors = {
	model: ''
}

import axios from 'axios'

class ModelForm{
	static init(){
		const form = Tree.get('modelForm')
		if(is.null(form))
			Tree.set('modelForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('modelForm')
		return !is.null(form) ? Tree.get('modelForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('modelForm')
		return !is.null(form) ? Tree.get('modelForm', 'errors') : {}
	}
	static getModel(){
		return Tree.get('modelForm', 'values', 'model')
	}
	static getLoader(){
		return Tree.get('modelForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('modelForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('modelForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['modelForm', 'loader'], loader)
			Tree.select('modelForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('modelForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('model/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ModelForm