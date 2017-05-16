import React, {Component} from 'react'

import ContentCSS from 'comp/navbar/content.css'

class Content extends Component{
	render(){
		return (
			<section className={`${ContentCSS.content}`}>
				<div className={`${ContentCSS.grid}`}>
					{this.props.children}
				</div>
			</section>
		)
	}
}

export default Content