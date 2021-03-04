'use strict'

import React from 'react'
import ClassNames from 'classnames'
import Settings from './settings'
import Chess from 'jschessrulz'
import SettingsComponent from './settingscomponent'
import $ from 'jquery'

class ChessComponent extends React.Component {
	
	constructor(props) {
		super(props)
		this.chess = new Chess.Chess()
		this.gameOver = false
		this.blackType = Settings.getBlackType()
		this.whiteType = Settings.getWhiteType()
	}
		
	selectPiece(x, y) {
		if (!this.gameOver) {
			if (!this.chess.selected || this.chess.canSetSelected(x, y)) {
				this.chess.setSelected(x, y)
			} else if (this.chess.isMovable(x, y)) {
				this.chess.movePiece(this.chess.selected, new Chess.Position(x, y))
				this.checkState()				
				if (!this.gameOver && (this.unHuman(this.blackType) || this.unHuman(this.whiteType))) {
					this.chess.aiTurn = true
					this.aiTurn()
				}
			}
			this.setState({})
		}
	}

	unHuman(player) {
		return player !== Settings.getPlayerTypes().HUMAN
	}
		
	aiTurn() {
		let that = this
		window.setTimeout(function() {						
			that.playAITurn()
		}, 300)
	}
	
	playAITurn() {
		let that = this
		let board = {board: this.chess.board, turnOfWhite: this.chess.turnOfWhite, castlingState: this.chess.getCastlingState()}
		let port = (this.chess.turnOfWhite && this.whiteType == Settings.getPlayerTypes().SPARRING_AI)
					|| (!this.chess.turnOfWhite && this.blackType == Settings.getPlayerTypes().SPARRING_AI) ? '8089' : '8080'
		$.ajax({
			type: "POST",
			url: "http://localhost:" + port + "/aimove",
			data: JSON.stringify(board),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				that.chess.aiTurn = false
				that.chess.makeAIMove(data)
				that.checkState()
				if (!that.gameOver && ((that.chess.turnOfWhite && that.unHuman(that.whiteType)) || (!that.chess.turnOfWhite && that.unHuman(that.blackType)))) {	
					that.chess.aiTurn = true
					that.setState({})				
					that.aiTurn()
				} else {
					if (that.gameOver && that.autoplay) that.restart()
					else that.setState({})
				}
			},
			failure: function(errMsg) {
				that.checkState()
				that.setState({})
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
		} else if (this.chess.isCheckMate()) {
			this.postWin()
			this.chessOverText = 'Checkmate'
		} else if (this.chess.isInsufficientMaterial()) {
			this.chessOverText = 'Insufficient material'
		} else if (this.chess.isThreefoldRepetition()) {
			this.chessOverText = 'Threefold repetition'
		} else if (this.chess.isOverMoveLimit()) {
			this.chessOverText = 'Move limit reached'
		} else {
			this.chessOverText = 'Game over for unknown reason?'
		}
	}
	
	postWin() {
		let gameResult = this.chess.getGameResultForCheckMate()
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/gameover",
			data: JSON.stringify(gameResult),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				console.log("Submitted victory")
			},
			failure: function(errMsg) {
				alert("Failed to submit victory")
			}
		})
	}
		
	restart() {
		this.chess = new Chess.Chess()
		this.gameOver = false
		this.started = false
		this.setState({})
	}
	
	toSettings() {
		//since we are not implementing routing for simple two view application, might as well just reload the window"
		window.location.reload()
	}
	
	toggleAutoplay() {
		this.autoplay = !this.autoplay
	}
	
	render() {
		if (this.unHuman(this.whiteType) && !this.started) {
			this.started = true
			this.chess.aiTurn = true
			this.aiTurn()
		}
		let that = this
		let displayEnd = this.gameOver ? 'block' : 'none'
		let autoplay
		if (this.unHuman(this.whiteType) && this.unHuman(this.blackType)) {
			autoplay = <div><label htmlFor="autoplay-toggle">Autoplay</label><input id="autoplay-toggle" type="checkbox" checked={this.autoplay} onChange={this.toggleAutoplay.bind(this)} /></div>
		}		
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
										'selectable': !that.gameOver && !that.chess.aiTurn && that.chess.isMovable(j, i)
									})
									return (
										<td key={j} onClick={that.selectPiece.bind(that, j, i)}
												className={classes}>
											<img className="piece" src={Chess.Piece.getCssName(col) + '.png'}/>
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
				
				{autoplay}
			</div>
		)
	}
	
}

module.exports = ChessComponent
