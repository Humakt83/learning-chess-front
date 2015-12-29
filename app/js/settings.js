'use strict'


const PlayerType = {
	LEARNING_AI: 'computer.png', 
	SPARRING_AI: 'sparring.png', 
	HUMAN: 'human.png'
}

class Settings {

	constructor() {
		this.white = PlayerType.HUMAN
		this.black = PlayerType.LEARNING_AI
	}

	getNextType(type) {
		if (type == PlayerType.HUMAN) return PlayerType.LEARNING_AI
		else if (type == PlayerType.LEARNING_AI) return PlayerType.SPARRING_AI
		return PlayerType.HUMAN		
	} 	

	getWhiteType() { return this.white }
	getBlackType() { return this.black }
	toggleWhite() { this.white = this.getNextType(this.white) }
	toggleBlack() { this.black = this.getNextType(this.black) }
	getPlayerTypes() { return PlayerType }
}

module.exports = new Settings()
