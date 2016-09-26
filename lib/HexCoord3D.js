(function () {
	'use strict';


	var HexCoord3D = function (x,y,z) { //type: pointy-top or flat-top
		this.x = x;
		this.y = y;
		this.z = z;

		return this; //chaining

	}


	HexCoord3D.prototype.getNormalizedPixelPosition = function(orientation) {

		var result = {};

		if(orientation == 'flat-top') {
			result.x = 0.75 * this.x;
			result.y = this.z + (this.x/2);
		}
		else {
			result.x = this.x + (this.z/2);
			result.y = 0.75 * this.z;
		}

		return result;


	}


	HexCoord3D.DIRECTIONS = {
		POINTYTOP: {
			SW: new HexCoord3D(-1, 0, 1),
			W : new HexCoord3D(-1, 1, 0),
			NW: new HexCoord3D(0, 1, -1),
			NE: new HexCoord3D(1, 0, -1),
			E : new HexCoord3D(1, -1, 0),
			SE: new HexCoord3D(0, -1, 1)
		},
		FLATTOP: {
			SE: new HexCoord3D(1, -1, 0),
			S : new HexCoord3D(0, -1, 1),
			SW: new HexCoord3D(-1, 0, 1),
			NW: new HexCoord3D(-1, 1, 0),
			N : new HexCoord3D(0, 1, -1),
			NE: new HexCoord3D(1, 0, -1)
		}
	}


	HexCoord3D.prototype.transformToNeighbor = function(orientation, direction, range) {

		const d = direction.toUpperCase();
		if(range > 0) {
			const o = (orientation == 'flat-top') ? 'FLATTOP' : 'POINTYTOP';
			const th = new HexCoord3D(HexCoord3D.DIRECTIONS[o][d].x, HexCoord3D.DIRECTIONS[o][d].y, HexCoord3D.DIRECTIONS[o][d].z)._scale(range);
			this._add(th);
		}

		return this; //chaining

	}


	HexCoord3D.prototype._add = function (hCoord3D) {
		this.x += hCoord3D.x;
		this.y += hCoord3D.y;
		this.z += hCoord3D.z;
		return this; //chaining
	}


	HexCoord3D.prototype._scale = function (k) {
		this.x *= k;
		this.y *= k;
		this.z *= k;
		return this; //chaining
	}


	// HexCoord3D.prototype._normalize = function (k) {
	// 	this.x = (this.x == 0) ? this.x : this.x / Math.abs(this.x);
	// 	this.y = (this.y == 0) ? this.y : this.y / Math.abs(this.y);
	// 	this.z = (this.z == 0) ? this.z : this.z / Math.abs(this.z);
	// 	return this; //chaining
	// }


	module.exports = HexCoord3D;

}());
