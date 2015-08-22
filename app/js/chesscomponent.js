'use strict'

import React from 'react'
import ClassNames from 'classnames'
import Settings from './settings'
import Chess from './chess'
import Piece from './pieces'
import Position from './position'
import SettingsComponent from './settingscomponent'

class ChessComponent extends React.Component {
	
	constructor(props) {
		super(props)
		this.chess = new Chess()
		this.gameOver = false
	}
		
	selectPiece(x, y) {
		if (!this.gameOver) {
			if (!this.chess.selected || this.chess.canSetSelected(x, y)) {
				this.chess.setSelected(x, y)
			} else if (this.chess.isMovable(x, y)) {
				this.chess.movePiece(this.chess.selected, new Position(x, y))
				this.checkState()				
				/*if (!$scope.gameOver && ($scope.aiBlack || $scope.aiWhite)) {
					$scope.aiTurn()
				}*/
			}
			this.setState({})
		}
	}
		
	/*$scope.aiTurn = function() {
		$timeout(function() {
			if ($scope.chessBoard.turnOfWhite) $scope.aiWhite.playTurn($scope.chessBoard)
			else $scope.aiBlack.playTurn($scope.chessBoard)
			$scope.checkState()
			return !$scope.gameOver && (($scope.chessBoard.turnOfWhite && $scope.aiWhite) || (!$scope.chessBoard.turnOfWhite && $scope.aiBlack))
		}, 300).then(function(continueGame) {
			if (continueGame) {
				$scope.aiTurn()
			}
		})
	}*/
	
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
	
	/*$scope.aiOnBlack = Settings.isBlackComputer()
	$scope.aiOnWhite = Settings.isWhiteComputer()
	$scope.chessBoard = Chess.createBoard()
	if ($scope.aiOnBlack) $scope.aiBlack = ChessAI.createAI(true, Settings.getDifficultyBlack(), Settings.getPersonalityBlack())
	if ($scope.aiOnWhite) $scope.aiWhite = ChessAI.createAI(false, Settings.getDifficultyWhite(), Settings.getPersonalityWhite())
		
	$scope.checkState()
	
	if ($scope.aiWhite) {
		$scope.aiTurn()
	}*/
	
	restart() {
		this.chess = new Chess()
		this.gameOver = false
		this.setState({})
	}
	
	toSettings() {
		//since we are not implementing routing for simple two view application, might as well just reload the window"
		window.location.reload()
	}
	
	render() {
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