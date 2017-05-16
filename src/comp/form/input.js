import React, {Component} from 'react'

import InputCSS from 'comp/form/input.css'

class Input extends Component{
	_bindChange(event){
		if(!is.undefined(this.props.onChange))
			this.props.onChange(event.target.value)
	}
	_bindKeyPress(event){
		if(event.key === 'Enter')
			if(!is.undefined(this.props.onEnter))
				this.props.onEnter(event.target.value)
	}
	render(){
		const type = (this.props.type) ? this.props.type : 'text'
		return (
			<input type="text" onChange={this._bindChange.bind(this)} value={this.props.value}
				onKeyPress={this._bindKeyPress.bind(this)}/>
		)
	}
}

export default Input