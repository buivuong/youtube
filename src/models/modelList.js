import Tree from 'app/tree'

const listMap = {
	root: [],
	filter: [],
	detail: {},
	loader: false
}

import axios from 'axios'

const list = Tree.select('modelList')

class Model{
	static init(){
		const listRoot = list.get()
		if(is.null(listRoot))
			Tree.set('modelList', listMap)
	}
	static loadList(id, force = true){
		return new Promise((resolve, reject) => {
			const listRoot = list.get('root')
			if(force)
				axios.post('model/listAll', {id})
				.then(response => {
					const data = response.list
					list.set('root', data)
					list.set('filter', data)
					list.select('filter').on('update', () => {
						resolve(data)
					})
				})
			else
				if(listRoot.length === 0){
					axios.post('model/listAll', {id})
					.then(response => {
						const data = response.list
						list.set('root', data)
						list.set('filter', data)
						list.select('filter').on('update', () => {
							resolve(data)
						})
					})
			}else
				resolve()
		})
	}
	static clear(){
		
	}
	static unshift(detail){
		return new Promise((resolve, reject) => {
			list.select('filter').unshift({...detail, status: 'create'})
			list.select('filter').on('update', () => {
				resolve()
			})
		})
	}
	static setLoader(loader){
		return new Promise((resolve, reject) => {
			list.set('loader', loader)
			list.select('loader').on('update', () => {
				resolve()
			})
		})
	}
	static setDetail(detail){
		return new Promise((resolve, reject) => {
			list.set('detail', detail)
			list.select('detail').on('update', () => {
				resolve()
			})
		})
	}
	static getLength(){
		return !is.null(list.get()) ? list.get('root').length : 0
	}
	static getList(){
		return !is.null(list.get()) ? list.get('filter') : []
	}
	static getLoader(){
		return !is.null(list.get()) ? list.get('loader') : {}
	}
	static getDetail(){
		return !is.null(list.get()) ? list.get('detail') : {}
	}
}

export default Model