
var HexSet = require('./HexSet');


(function () {
	'use strict';


	var HexGrid = function (orientation, offsetType) {

		this.orientation = orientation;
		this.offsetType = offsetType;

	}



	HexGrid.prototype.createHexSet = function (hexNum, layout, originX, originY) {

		return new HexSet(this, hexNum, layout, originX, originY).includeCoord2D();

	}


	//public static API methods --------------------------------------------------


	HexGrid.getHexagonalRadius = function (hexNum) {

		var radius = 0;
		var consumedElements = 1;
		var found = false;

		while(!found) {

			if(consumedElements >= hexNum) found = true;
			else {
				radius++;
				consumedElements += (radius*6);
			}

		}

		return radius;
	}


	module.exports = HexGrid;

}());
