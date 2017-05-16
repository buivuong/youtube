import React, {Component} from 'react'

import ButtonCSS from 'comp/button/button.css'

class Button extends Component{
	render(){
		const type = (this.props.type) ? this.props.type : 'button'
		return (
			<button type={type} className={`${ButtonCSS.button}`} onClick={this.props.onClick}>
				{this.props.children}
			</button>
		)
	}
}

export default Button