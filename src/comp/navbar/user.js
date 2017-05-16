import React, {Component} from 'react'

import UserCSS from 'comp/navbar/user.css'

class User extends Component{
	render(){
		return (
			<div className={`${UserCSS.user}`}>
				<ul>
					<li><a>buivuongdhmo@gmail.com</a></li>
				</ul>
			</div>
		)
	}
}

export default User