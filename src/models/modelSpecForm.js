import Tree from 'app/tree'

const values = {
	model_id: '',
	spec_id: '',
	value_en: '',
	value_vi: '',
	ordered: ''
}

const errors = {
	
}

import axios from 'axios'

class ModelSpecForm{
	static init(){
		const form = Tree.get('modelSpecForm')
		if(is.null(form))
			Tree.set('modelSpecForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('modelSpecForm')
		return !is.null(form) ? Tree.get('modelSpecForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('modelSpecForm')
		return !is.null(form) ? Tree.get('modelSpecForm', 'errors') : {}
	}
	static getName(lang){
		return Tree.get('modelSpecForm', 'values', 'name_'+lang)
	}
	static getLoader(){
		return Tree.get('modelSpecForm', 'loader')
	}
	static setValues(values){
		return new Promise((resolve, reject) => {
			const form = Tree.select('modelSpecForm')
			form.set('values', values)
			form.on('update', () => {
				resolve()
			})
		})
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('modelSpecForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('modelSpecForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['modelSpecForm', 'loader'], loader)
			Tree.select('modelSpecForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('modelSpecForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('modelSpec/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
	static update(values){
		return new Promise((resolve, reject) => {
			axios.post('modelSpec/update', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ModelSpecForm