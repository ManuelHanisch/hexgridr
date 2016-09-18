(function () {
	'use strict';


	var Hex = function (x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	};

	Hex.PATH_STARTPOINT = 'NW';


	// Hex.prototype.getAxialCoordinates = function () {
	// 	return {
	// 		x: this.x,
	// 		y: this.z
	// 	};
	// }


	Hex.prototype.add = function (hex) {
		this.x += hex.x;
		this.y += hex.y;
		this.z += hex.z;
		return this; //chaining
	}
	Hex.prototype.scale = function (k) {
		this.x *= k;
		this.y *= k;
		this.z *= k;
		return this; //chaining
	}
	Hex.prototype.normalize = function (k) {
		this.x = (this.x == 0) ? this.x : this.x / Math.abs(this.x);
		this.y = (this.y == 0) ? this.y : this.y / Math.abs(this.y);
		this.z = (this.z == 0) ? this.z : this.z / Math.abs(this.z);
		return this; //chaining
	}


	module.exports = Hex;

}());
