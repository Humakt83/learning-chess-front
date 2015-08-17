'use strict'

var React = require('react')
var _ = require('lodash')
var Settings = require('settings')

var SettingsComponent = React.createClass({
	
	_start : function() {
		console.log('Starting')
	},
	
	_togglePlayer : function(white) {
		if (white) {
			Settings.setWhiteIsComputer(!Settings.isWhiteComputer())
		} else {
			Settings.setBlackIsComputer(!Settings.isBlackComputer())
		}
	},
	
	render : function() {
		let blackPlayer = Settings.isBlackComputer ? 'computer.png' : 'human.png'
		let whitePlayer = Settings.isWhiteComputer ? 'computer.png' : 'human.png'
		return (
			<div>
				<div className="settings left">
					<div className="togglePlayer" onClick={this.togglePlayer(true)}>
						<img className="whitePlayer" src={whitePlayer} />
					</div>
				</div>
	
				<div className="settings-center">
					<img className="start touchable" src="start.png" onClick={this.start()}/>
				</div>
	
				<div className="settings right">
					<div className="togglePlayer" onClick={this.togglePlayer(false)}>
						<img className="blackPlayer" src={blackPlayer} />
					</div>
				</div>
			</div>
		)
	}
	
})