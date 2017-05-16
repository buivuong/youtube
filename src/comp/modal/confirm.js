import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {displayImage} from 'config/helper'
import Button from 'comp/button/button'

import ModalCSS from 'comp/modal/confirm.css'

export class Confirm extends Component{
	render(){
		return (
			<div className={`${ModalCSS.confirm}`}>
				<div className={`${ModalCSS.header}`}>
					<span>Thông báo</span>
					<a className={`${ModalCSS.close}`} onClick={this.props.onNo}>
						<img src={displayImage('icons/18dp/exit.png')}/>
					</a>
				</div>
				<div className={`${ModalCSS.body}`}>
					Bạn có thực sự muốn làm việc đó không ?
				</div>
				<div className={`${ModalCSS.footer}`}>
					<div className={`${ModalCSS['btn-group']}`}>
						<Button onClick={this.props.onYes}>Có</Button>
						<Button onClick={this.props.onNo}>Không</Button>
					</div>
				</div>
			</div>
		)
	}
}