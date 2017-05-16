import React, {Component} from 'react'

import HeaderCSS from 'comp/navbar/header.css'

import {displayImage} from 'config/helper'

import MenuModel from 'models/menu'

class Header extends Component{
	render(){
		return (
			<header className={`${HeaderCSS.header}`}>
				<div className={`${HeaderCSS.logo}`}>
					New Daikin
				</div>
				<div className={`${HeaderCSS.content}`}>
					<ul>
						<li><a>Thoát</a></li>
					</ul>
				</div>
			</header>
		)
	}
}

export default Header