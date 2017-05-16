import React, {Component} from 'react'

import SidebarCSS from 'comp/navbar/sidebar.css'

import MenuModel from 'models/menu'

class Sidebar extends Component{
	componentDidMount(){
		MenuModel.init()
	}
	_bindNavigate(menu){
		const state = menu.state
		this.props.router.navigate(state)
	}
	render(){
		const menus = MenuModel.getList()
		return (
			<nav className={`${SidebarCSS.sidebar}`}>
				<ul>
				{
					menus.map((menu, key) => {
						return <li key={key}><a onClick={this._bindNavigate.bind(this, menu)}>{menu.title}</a></li>
					})
				}
				</ul>
			</nav>
		)
	}
}

export default Sidebar