'use strict'

import React from 'react'
import ClassNames from 'classnames'
import Settings from './settings'
import Chess from './chess'
import Piece from './pieces'
import Position from './position'
import SettingsComponent from './settingscomponent'
import $ from 'jquery'

class ChessComponent extends React.Component {
	
	constructor(props) {
		super(props)
		this.chess = new Chess()
		this.gameOver = false
		this.aiBlack = Settings.isBlackComputer()
		this.aiWhite = Settings.isWhiteComputer()
	}
		
	selectPiece(x, y) {
		if (!this.gameOver) {
			if (!this.chess.selected || this.chess.canSetSelected(x, y)) {
				this.chess.setSelected(x, y)
			} else if (this.chess.isMovable(x, y)) {
				this.chess.movePiece(this.chess.selected, new Position(x, y))
				this.checkState()				
				if (!this.gameOver && (this.aiBlack || this.aiWhite)) {
					this.aiTurn()
				}
			}
			this.setState({})
		}
	}
		
	aiTurn() {
		let that = this
		window.setTimeout(function() {						
			that.playAITurn()
		}, 500)
	}
	
	playAITurn() {
		let that = this
		let board = {board: this.chess.board, turnOfWhite: this.chess.turnOfWhite, castlingState: this.chess.getCastlingState()}
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/aimove",
			data: JSON.stringify(board),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				that.chess.makeAIMove(data)
				that.checkState()
				that.setState({})
				if (!that.gameOver && ((that.chess.turnOfWhite && that.aiWhite) || (!that.chess.turnOfWhite && that.aiBlack))) {				
					that.aiTurn()
				}
			},
			failure: function(errMsg) {
				alert(errMsg);
				that.chess.turnOfWhite = !that.chess.turnOfWhite
			}
		})
	}
	
	checkState() {
		if (this.chess.isGameOver()) this.gameIsOver()
	}
	
	gameIsOver() {
		this.gameOver = true
		if (this.chess.isStaleMate()) {
			this.chessOverText = 'Stalemate'
		} else {
			this.chessOverText = 'Checkmate.'
		}
	}
		
	restart() {
		this.chess = new Chess()
		this.gameOver = false
		this.started = false
		this.setState({})
	}
	
	toSettings() {
		//since we are not implementing routing for simple two view application, might as well just reload the window"
		window.location.reload()
	}
	
	render() {
		if (this.aiWhite && !this.started) {
			this.started = true
			this.aiTurn()
		}
		let that = this
		let displayEnd = this.gameOver ? 'block' : 'none'
		return (
			<div className="container">
				<table className="chess">
					{this.chess.board.map(function(row, i) {
						return (
							<tr key={i}>
								{row.map(function(col, j) {
									let classes = ClassNames({
										'bg-black': (j + i) % 2 === 0,
										'bg-white': (j + i) % 2 !== 0,
										'selectable': !that.gameOver && that.chess.isMovable(j, i)
									})
									return (
										<td key={j} onClick={that.selectPiece.bind(that, j, i)}
												className={classes}>
											<img className="piece" src={Piece.getCssName(col) + '.png'}/>
										</td>
									)
								})}
							</tr>
						)
					})}
				</table>
				
				<div className="end" style={{display: displayEnd}}>
					<div className="end-inner">
						<p>{this.chessOverText}</p>
						<div>
							<img className="restart" src="start.png" onClick={this.restart.bind(this)}/>
							<img className="settings-image" src="settings.png" onClick={this.toSettings.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}

module.exports = ChessComponent