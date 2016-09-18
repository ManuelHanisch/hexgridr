var Hex = require('./Hex');

(function () {
	'use strict';


	var FlatHex = function (x, y, z) {
		Hex.call(this, x, y, z);
	};


	FlatHex.prototype = Object.create(Hex.prototype); //SUbclass of Hex


	FlatHex.DIRECTIONS = ['NE','SE','S','SW','NW','N'];
	FlatHex.DIRECTIONS_HEX = {
		NE: new Hex(1, 0, -1),
		SE: new Hex(1, -1, 0),
		S : new Hex(0, -1, 1),
		SW: new Hex(-1, 0, 1),
		NW: new Hex(-1, 1, 0),
		N : new Hex(0, 1, -1)
	};
	FlatHex.prototype.DIRECTIONS = FlatHex.DIRECTIONS;
	FlatHex.prototype.DIRECTIONS_HEX = FlatHex.DIRECTIONS_HEX;

	// Hex.prototype.getAxialCoordinates = function () {
	// 	return {
	// 		x: this.x,
	// 		y: this.z
	// 	};
	// }


	FlatHex.prototype.createNeighbor = function (direction, range) {

		var r = this.createCopy();
		if(range > 0) {
			r.add(FlatHex.DIRECTIONS_HEX[direction.toUpperCase()].scale(range));
			FlatHex.DIRECTIONS_HEX[direction.toUpperCase()].normalize();
		}
		return r;

	}


	FlatHex.prototype.createCopy = function () {

		return new FlatHex(this.x,this.y,this.z);

	}


	FlatHex.prototype.getPixelPosition = function (hexWidth, hexHeight, offsetX, offsetY) {

		var result = {};
		result.x = offsetX + Math.floor((hexWidth / 2) * 1.5 * this.x);
		result.y = offsetY + Math.floor(hexHeight * (this.z + (this.x/2)));
		return result;

	}


	module.exports = FlatHex;

}());
