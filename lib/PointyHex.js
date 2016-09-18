var Hex = require('./Hex');

(function () {
	'use strict';


	var PointyHex = function (x, y, z) {
		Hex.call(this, x, y, z);
	};
	

	PointyHex.prototype= Object.create(Hex.prototype); //SUbclass of Hex


	PointyHex.DIRECTIONS = ['E','SE','SW','W','NW','NE'];
	PointyHex.DIRECTIONS_HEX = {
		E : new Hex(1, -1, 0),
		SE: new Hex(0, -1, 1),
		SW: new Hex(-1, 0, 1),
		W : new Hex(-1, 1, 0),
		NW: new Hex(0, 1, -1),
		NE: new Hex(1, 0, -1)
	};
	PointyHex.prototype.DIRECTIONS = PointyHex.DIRECTIONS;
	PointyHex.prototype.DIRECTIONS_HEX = PointyHex.DIRECTIONS_HEX;


	// Hex.prototype.getAxialCoordinates = function () {
	// 	return {
	// 		x: this.x,
	// 		y: this.z
	// 	};
	// }

	PointyHex.prototype.createNeighbor = function (direction, range) {

		var r = this.createCopy();
		if(range > 0) {
			r.add(PointyHex.DIRECTIONS_HEX[direction.toUpperCase()].scale(range));
			PointyHex.DIRECTIONS_HEX[direction.toUpperCase()].normalize();
		}
		return r;

	}


	PointyHex.prototype.createCopy = function () {

		return new PointyHex(this.x,this.y,this.z);

	}


	PointyHex.prototype.getPixelPosition = function (hexWidth, hexHeight, offsetX, offsetY) {

		var result = {};
		result.x = offsetX + Math.floor(hexWidth * (this.x + (this.z/2)));
		result.y = offsetY + Math.floor((hexHeight / 2) * 1.5 * this.z);
		return result;

	}



	module.exports = PointyHex;

}());
