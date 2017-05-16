import React, {Component} from 'react'

import Admin from 'comp/navbar'

class Home extends Component{
	render(){
		return (
			<div>
				<Admin router={this.props.router} tree={this.props.tree}>
					Home
				</Admin>
			</div>
		)
	}
}

export default Home