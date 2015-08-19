'use strict'

import React from 'react'
import Settings from './settings'
import Chess from './chess'
import Piece from './pieces'

class ChessComponent extends React.Component {
	
	constructor(props) {
		super(props)
		this.chess = new Chess()
	}
		
	/*$scope.selectPiece = function(x, y) {
		if (!$scope.gameOver) {
			if (!$scope.chessBoard.selected || $scope.chessBoard.canSetSelected(x, y)) {
				$scope.chessBoard.setSelected(x, y)
			} else if ($scope.chessBoard.isMovable(x, y)) {
				$scope.chessBoard.movePiece($scope.chessBoard.selected, PositionService.createPosition(x, y))
				$scope.checkState()
				if (!$scope.gameOver && ($scope.aiBlack || $scope.aiWhite)) {
					$scope.aiTurn()
				}
			}
		}
	}
	
	$scope.piece = ChessPiece
	
	$scope.position = PositionService*/
		
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
	
	/*$scope.checkState = function() {
		$scope.blackPieces = $scope.chessBoard.getBlackPieces()
		$scope.whitePieces = $scope.chessBoard.getWhitePieces()
		$scope.gameOver = $scope.chessBoard.isGameOver()
		if ($scope.gameOver) {
			gameOver()
		}
	}*/
	
	/*var gameOver = function() {
		if ($scope.chessBoard.isStaleMate()) {
			$scope.chessOverText = 'Stalemate'
		} else {
			$scope.chessOverText = 'Checkmate.'
		}
	}*/
	
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
		return (
			<div className="container">
				<table className="chess">
					{this.chess.board.map(function(row, i) {
						return (
							<tr key={i}>
								{row.map(function(col, j) {
									return (
										<td key={j} ng-click="selectPiece($index, $parent.$index)"
												className={(j + i) % 2 === 0 ? 'bg-black' : 'bg-white'}>
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