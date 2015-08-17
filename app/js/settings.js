'use strict'

var Settings = function() {
	
	var whiteIsComputer = false
	var blackIsComputer = true
	
	return {
		isWhiteComputer : function() { return whiteIsComputer },
		isBlackComputer : function() { return blackIsComputer },
		setWhiteIsComputer : function(computer) { whiteIsComputer = computer },
		setBlackIsComputer : function(computer) { blackIsComputer = computer }
	}
}