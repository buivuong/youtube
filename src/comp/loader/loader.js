import React, {Component} from 'react'

import LoaderCSS from 'comp/loader/loader.css'

class Loader extends Component{
	render(){
		return (
			<div className={`${LoaderCSS.dimmer}`}>
				<div className={`${LoaderCSS.wrapper}`}>
					<div className={`${LoaderCSS.overlay}`}>
						<div className={`${LoaderCSS.loader}`}>
							<div/><div/><div/><div/><div/><div/><div/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Loader