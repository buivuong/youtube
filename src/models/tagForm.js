import Tree from 'app/tree'

const values = {
	title_en: '',
	title_vi: ''
}

const errors = {
	title_en: '',
	title_vi: ''
}

import axios from 'axios'

class TagForm{
	static init(){
		const form = Tree.get('tagForm')
		if(is.null(form))
			Tree.set('tagForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('tagForm')
		return !is.null(form) ? Tree.get('tagForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('tagForm')
		return !is.null(form) ? Tree.get('tagForm', 'errors') : {}
	}
	static getTitle(lang){
		return Tree.get('tagForm', 'values', 'title_'+lang)
	}
	static getLoader(){
		return Tree.get('tagForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('tagForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('tagForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['tagForm', 'loader'], loader)
			Tree.select('tagForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('tagForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('tag/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default TagForm