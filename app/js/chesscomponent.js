'use strict'

import React from 'react'
import ClassNames from 'classnames'
import Settings from './settings'
import Chess from './chess'
import Piece from './pieces'
import Position from './position'

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
		this.gameOver = this.chess.isGameOver()
		if (this.gameOver) {
			gameOver()
		}
	}
	
	gameOver() {
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
	
	/*$scope.restart = function() {
		$scope.gameOver = undefined
		$scope.chessBoard = Chess.createBoard()
		if ($scope.aiWhite) {
			$scope.aiTurn()
		}
	}*/
	
	/*$scope.toSettings = function() {
		$location.path("settings")
	}*/
	
	render() {
		let that = this
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
		
				{/*<div class="end" ng-if="gameOver">
					<div class="end-inner">
						<p>{{chessOverText}}</p>
						<div>
							<img class="restart" src="start.png" ng-click="restart()"/>
							<img class="settings-image" src="settings.png" ng-click="toSettings()"/>
						</div>
					</div>
				</div>*/}
			</div>
		)
	}
	
}

module.exports = ChessComponent