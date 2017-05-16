import React, {Component} from 'react'

import DropdownCSS from 'comp/form/dropdown.css'

class Dropdown extends Component{
	_bindChange(event){
		if(!is.undefined(this.props.onChange))
			this.props.onChange(event.target.value)
	}
	render(){
		return (
			<select onChange={this._bindChange.bind(this)} value={this.props.value}>
				<option value=""></option>
				{
					this.props.list.map((l, key) => {
						return <option key={key} value={l[this.props.code]}>{l[this.props.display]}</option>
					})
				}
			</select>
		)
	}
}

export default Dropdown