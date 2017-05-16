import React, {Component} from 'react'

import PageOption from 'comp/navbar/user'
import Header from 'comp/navbar/header'
import Sidebar from 'comp/navbar/sidebar'
import Content from 'comp/navbar/content'

class Admin extends Component{
	render(){
		return (
			<div>
				<PageOption/>
				<Header/>
				<Sidebar router={this.props.router}/>
				<Content>
					{this.props.children}
				</Content>
			</div>
		)
	}
}

export default Admin