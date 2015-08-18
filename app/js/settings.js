'use strict'

class Settings {
	
	constructor() {
		this.whiteIsComputer = false
		this.blackIsComputer = true
	}
	
	isWhiteComputer() { return this.whiteIsComputer }
	isBlackComputer() { return this.blackIsComputer }
	setWhiteIsComputer(computer) { this.whiteIsComputer = computer }
	setBlackIsComputer(computer) { this.blackIsComputer = computer }
}

module.exports = new Settings()