import Tree from 'app/tree'

const values = {
	name_en: '',
	name_vi: '',
	type_en: '',
	type_vi: '',
	sum_en: '',
	sum_vi: '',
	unit_en: '',
	unit_vi: ''
}

const errors = {
	name_en: '',
	name_vi: ''
}

import axios from 'axios'

class SpecForm{
	static init(){
		const form = Tree.get('specForm')
		if(is.null(form))
			Tree.set('specForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('specForm')
		return !is.null(form) ? Tree.get('specForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('specForm')
		return !is.null(form) ? Tree.get('specForm', 'errors') : {}
	}
	static getName(lang){
		return Tree.get('specForm', 'values', 'name_'+lang)
	}
	static getLoader(){
		return Tree.get('specForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('specForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setValues(values){
		return new Promise((resolve, reject) => {
			const form = Tree.select('specForm')
			form.set('values', values)
			form.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('specForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['specForm', 'loader'], loader)
			Tree.select('specForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('specForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('spec/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
	static update(values){
		return new Promise((resolve, reject) => {
			axios.post('spec/update', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default SpecForm