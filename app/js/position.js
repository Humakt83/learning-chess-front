'use strict'

class Position {
	
	constructor(x, y) {
		this.x = y
		this.y = y
	}
	
	newPosition(xModifier, yModifier) {
		return new Position(this.x + xModifier, this.y + yModifier)
	}
}

module.exports = Position