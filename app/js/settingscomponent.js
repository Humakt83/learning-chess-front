'use strict'

import React from 'react'
import Settings from './settings'
import ChessComponent from './chesscomponent'

class SettingsComponent extends React.Component {
	
	constructor(props) {
		super(props)
	}
	
	_start() {
		this.setState({started: true})
	}
	
	_togglePlayer(white) {
		if (white) {
			Settings.setWhiteIsComputer(!Settings.isWhiteComputer())
		} else {
			Settings.setBlackIsComputer(!Settings.isBlackComputer())
		}
		this.setState({})
	}
	
	render() {
		let blackPlayer = Settings.isBlackComputer() ? 'computer.png' : 'human.png'
		let whitePlayer = Settings.isWhiteComputer() ? 'computer.png' : 'human.png'
		if (this.state && this.state.started) return <ChessComponent />
		return (
			<div>
				<div className="settings left">
					<div className="togglePlayer" onClick={this._togglePlayer.bind(this, true)}>
						<img className="whitePlayer" src={whitePlayer} />
					</div>
				</div>
	
				<div className="settings-center">
					<img className="start touchable" src="start.png" onClick={this._start.bind(this)}/>
				</div>
	
				<div className="settings right">
					<div className="togglePlayer" onClick={this._togglePlayer.bind(this, false)}>
						<img className="blackPlayer" src={blackPlayer} />
					</div>
				</div>
			</div>
		)
	}	
}

module.exports = SettingsComponent