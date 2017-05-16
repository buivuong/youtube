import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import uuid from 'uuid/v4'

import ModalCSS from 'comp/modal/modal.css'

const appendedElements = {}
const appendElementContainer = document.getElementById('modal')

function getAppendedElements(){
	const elements = []
	const keys = Object.keys(appendedElements)
	const length = keys.length
	if(length > 0){
		keys.forEach(key => {
			elements.push(appendedElements[key])
		})
	}
	return elements
}

class AppendBody extends Component{
	constructor(props){
		super(props)
		this.appendElementContainer = appendElementContainer
	}
	setAppendElementId(id){
		this.appendElementId = id
	}
	updateAppendElement(content){
		appendedElements[this.appendElementId] = content
		this.updateAppendElements()
	}
	updateAppendElements(){
		ReactDOM.render(<span>{getAppendedElements()}</span>, appendElementContainer)
	}
	removeAppendElement(){
		delete appendedElements[this.appendElementId]
		this.updateAppendElements()
	}
}

class Modal extends AppendBody{
	constructor(props){
		super(props)
		this.uniqueId = uuid()
		this.setAppendElementId(this.uniqueId)
	}
	componentDidMount(){
		this.updateSelf()
	}
	componentDidUpdate(){
		this.updateSelf()
	}
	componentWillUnmount(){
		this.removeAppendElement()
	}
	updateSelf(){
		const html = this.props.isOpen ? <div key={this.uniqueId} className={`${ModalCSS.dimmer}`}>
											<div className={`${ModalCSS.wrapper}`}>
												{this.props.children}
											</div>
										</div>
										: null
		this.updateAppendElement(html)
	}
	render(){
		return null
	}
}

export default Modal