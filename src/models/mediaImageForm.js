import Tree from 'app/tree'

const values = {
	title_en: '',
	title_vi: '',
	image: ''
}

const errors = {
	...values
}

import axios from 'axios'

class MediaImageForm{
	static init(){
		const form = Tree.get('mediaImageForm')
		if(is.null(form))
			Tree.set('mediaImageForm', {values, errors, loader: false})
	}
	static getValues(){
		const form = Tree.get('mediaImageForm')
		return !is.null(form) ? Tree.get('mediaImageForm', 'values') : {}
	}
	static getErrors(){
		const form = Tree.get('mediaImageForm')
		return !is.null(form) ? Tree.get('mediaImageForm', 'errors') : {}
	}
	static getTitle(lang){
		return Tree.get('mediaImageForm', 'values', 'title_'+lang)
	}
	static getImage(){
		return Tree.get('mediaImageForm', 'values', 'image')
	}
	static getLoader(){
		return Tree.get('mediaImageForm', 'loader')
	}
	static setValue(field, value){
		return new Promise((resolve, reject) => {
			const values = Tree.select('mediaImageForm', 'values')
			values.set(field, value)
			values.on('update', () => {
				resolve()
			})
		})
	}
	static setError(field, error){
		return new Promise((resolve, reject) => {
			const errors = Tree.select('mediaImageForm', 'errors')
			errors.set(field, error)
			errors.on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			Tree.set(['mediaImageForm', 'loader'], loader)
			Tree.select('mediaImageForm', 'loader').on('update', () => {
				resolve()
			})
		})
	}
	static reset(){
		Tree.set('mediaImageForm', {values, errors})
	}
	static create(values){
		return new Promise((resolve, reject) => {
			axios.post('mediaImage/create', {...values})
			.then(response => {
				resolve(response)
			})
		})
	}
}

export default MediaImageForm