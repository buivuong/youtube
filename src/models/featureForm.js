import Tree from 'app/tree'

const values = {
	media_image_id: '',
	name_en: '',
	name_vi: '',
	description_en: '',
	description_vi: '',
	media_image_id_en: ''
}

const errors = {
	name_en: '',
	name_vi: ''
}

import axios from 'axios'

class ProductForm{
	static init(){
		const form = Tree.get('featureForm')
		if(is.null(form))
			Tree.set('featureForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('featureForm')
		return !is.null(form) ? Tree.get('featureForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('featureForm')
		return !is.null(form) ? Tree.get('featureForm', 'errors') : {}
	}
	static getName(lang){
		return Tree.get('featureForm', 'values', 'name_'+lang)
	}
	static getLoader(){
		return Tree.get('featureForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('featureForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setValues(values){
		return new Promise((resolve, reject) => {
			const form = Tree.select('featureForm')
			form.set('values', values)
			form.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('featureForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['featureForm', 'loader'], loader)
			Tree.select('featureForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('featureForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('feature/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
	static update(values){
		return new Promise((resolve, reject) => {
			axios.post('feature/update', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ProductForm