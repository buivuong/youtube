import Tree from 'app/tree'

const values = {
	title_en: '',
	title_vi: '',
	ordered: ''
}

const errors = {
	title_en: '',
	title_vi: ''
}

import axios from 'axios'

class ProductCategoryTypeForm{
	static init(){
		const form = Tree.get('productCategoryTypeForm')
		if(is.null(form))
			Tree.set('productCategoryTypeForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('productCategoryTypeForm')
		return !is.null(form) ? Tree.get('productCategoryTypeForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('productCategoryTypeForm')
		return !is.null(form) ? Tree.get('productCategoryTypeForm', 'errors') : {}
	}
	static getTitle(lang){
		return Tree.get('productCategoryTypeForm', 'values', 'title_'+lang)
	}
	static getLoader(){
		return Tree.get('productCategoryTypeForm', 'loader')
	}
	static setValues(values){
		return new Promise((resolve, reject) => {
			const form = Tree.select('productCategoryTypeForm')
			form.set('values', values)
			form.on('update', () => {
				resolve()
			})
		})
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('productCategoryTypeForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('productCategoryTypeForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['productCategoryTypeForm', 'loader'], loader)
			Tree.select('productCategoryTypeForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('productCategoryTypeForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('productCategoryType/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
	static update(values){
		return new Promise((resolve, reject) => {
			axios.post('productCategoryType/update', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default ProductCategoryTypeForm