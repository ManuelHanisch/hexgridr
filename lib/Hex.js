(function () {
	'use strict';


	var Hex = function (x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	};


	Hex.PATH_STARTPOINT = 'NW'; //both orientations need this neighbor
	Hex.DIRECTIONS_POINTYTOP = ['E','SE','SW','W','NW','NE'];
	Hex.DIRECTIONS_FLATTOP =   ['NE','SE','S','SW','NW','N'];

	Hex.DIRECTIONS_HEX_POINTYTOP = {
		E : new Hex(1, -1, 0),
		SE: new Hex(0, -1, 1),
		SW: new Hex(-1, 0, 1),
		W : new Hex(-1, 1, 0),
		NW: new Hex(0, 1, -1),
		NE: new Hex(1, 0, -1)
	};
	Hex.DIRECTIONS_HEX_FLATTOP = {
		NE: new Hex(1, 0, -1),
		SE: new Hex(1, -1, 0),
		S : new Hex(0, -1, 1),
		SW: new Hex(-1, 0, 1),
		NW: new Hex(-1, 1, 0),
		N : new Hex(0, 1, -1)
	};


	// Hex.prototype.getAxialCoordinates = function () {
	// 	return {
	// 		x: this.x,
	// 		y: this.z
	// 	};
	// }

	Hex.prototype.getNeighbor = function (directionHex, range) {
		return this._add(directionHex._scale(range));
	}


	Hex.prototype.getPixelPosition = function (hexWidth, hexHeight,  offsetX, offsetY, orientation) {

		var result = {};

		if(orientation == 'pointy-top') {
			result.x = offsetX + Math.floor(hexWidth * (this.x + (this.z/2)));
			result.y = offsetY + Math.floor((hexHeight / 2) * 1.5 * this.z);
		}
		else if(orientation == 'flat-top') {
			result.x = offsetX + Math.floor((hexWidth / 2) * 1.5 * this.x);
			result.y = offsetY + Math.floor(hexHeight * (this.z + (this.x/2)));
		}

		return result;
	}

	Hex.prototype._add = function (directionHex) {
		return new Hex(this.x + directionHex.x, this.y + directionHex.y, this.z + directionHex.z);
	}
	Hex.prototype._scale = function (k) {
		return new Hex(this.x * k, this.y * k, this.z * k);
	}


	module.exports = Hex;

}());
