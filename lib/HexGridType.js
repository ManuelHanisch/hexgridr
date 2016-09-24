(function () {
	'use strict';


	var HexGridType = function (orientation, offsetType) {

		this.orientation = orientation;
		this.offsetType = offsetType;
		if(this.offsetType == 'even') this.offsetTypeNum = 0;
		else this.offsetTypeNum = 1;

	};

	
	module.exports = HexGridType;

}());
