import React, {Component} from 'react'

import ImageCSS from 'comp/image/image.css'

class Image extends Component{
	constructor(props){
		super(props)
		this.state = {
			
		}
	}
	_bindChange(event){
		if(!is.undefined(this.props.onChange))
			this.props.onChange(event.target.value)
	}
	componentDidMount(){
		$()
	}
	_readURL(input){
		if(input.files && input.files[0]){
			var reader = new FileReader()
			reader.onload = (event) => {
				this.image.src = event.target.result
			}
			reader.readAsDataURL(input.files[0])
		}
	}
	render(){
		return (
			<div>
				<input type="file" accept="image/*" ref={(node) = this.input = node}/>
				<img ref={()} src=/>
			</div>
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

export default Image