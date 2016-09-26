var HexCoord2D = require('./HexCoord2D');
var HexCoord3D = require('./HexCoord3D');

(function () {
	'use strict';


	var Hex = function (orientation) { //type: pointy-top or flat-top

		this.orientation = orientation;
		this.hasCoord2D = false;
		this.hasCoord3D = false;
		this.coord3D = {};
		this.coord2D = {};

		return this; //chaining

	};
	

	Hex.prototype.setCoord2D = function(x,y) {

		this.coord2D = new HexCoord2D(x, y);
		this.hasCoord2D = true;
		return this; //chaining

	}


	Hex.prototype.setCoord3D = function(x, y, z) {

		this.coord3D = new HexCoord3D(x, y, z);
		this.hasCoord3D = true;
		return this; //chaining

	}


	Hex.prototype.setCoord2DFrom3D = function (gridOffsetType) {

		const th = Hex.createCoord2DFrom3D(this.orientation, gridOffsetType, this.coord3D.x, this.coord3D.y, this.coord3D.z);
		this.setCoord2D(th.x, th.y);

	}


	Hex.prototype.setCoord3DFrom2D = function (gridOffsetType) {

		const th = Hex.createCoord3DFrom2D(this.orientation, gridOffsetType, this.coord2D.x, this.coord2D.y);
		this.setCoord2D(th.x, th.y, th.z);

	}


	Hex.prototype.setAllCoordinates = function(gridOffsetType, x, y, optionalZ) {

		if(optionalZ == undefined) { //double first
			this.setCoord2D(x, y);
			this.setCoord3DFrom2D(gridOffsetType);
		}
		else { //triple first
			this.setCoord3D(x, y, optionalZ);
			this.setCoord2DFrom3D(gridOffsetType);
		}

		return this; //chaining

	}


	Hex.createCoord3DFrom2D = function(orientation, gridOffsetType, x, y) {

		const t = Hex._offsetToHex(orientation, gridOffsetType, x, y);
		return new HexCoord3D(t.x, t.y, t.z);

	}


	Hex.createCoord2DFrom3D = function(orientation, gridOffsetType, x, y, z) {

		const d = Hex._hexToOffset(orientation, gridOffsetType, x, y, z);
		return new HexCoord2D(d.x, d.y);

	}


	Hex._hexToOffset = function(orientation, gridOffsetType, x, y, z) { // 3D to 2D

		const got = Hex._resolveGridOffsetType(gridOffsetType);

		var r = {};

		if(orientation == 'flat-top') {
			//even: offsets at column 0,2,4... , odd: offsets at column 1,3,5...
			// r.x = x;
			// if(got&1) r.y = z + (x - (x&1)) / 2;
			// else r.y = z + (x + (x&1)) / 2;
			r.x = x;
			if(got&1) r.y = z + (x - (x&1)) / 2;
			else r.y = z + (x + (x&1)) / 2;

		}
		else { //pointy-top
			//even: offsets at row 0,2,4... , odd: offsets at row 1,3,5...
			if(got&1) r.x = x + (z - (z&1)) / 2;
			else r.x = x + (z + (z&1)) / 2;
			r.y = z
		}

		return r;

	}
	Hex._offsetToHex = function(orientation, gridOffsetType, x, y) { // 2D to 3D

		const got = Hex._resolveGridOffsetType(gridOffsetType);

		var r = {};

		if(orientation == 'flat-top') {
			//even: offsets at column 0,2,4... , odd: offsets at column 1,3,5...
			r.x = x;
			if(got&1) r.z = y - (x - (x&1)) / 2;
			else r.z = y - (x + (x&1)) / 2;
			r.y = 0-r.x-r.z;
		}
		else { //pointy-top
			//even: offsets at row 0,2,4... , odd: offsets at row 1,3,5...
			if(got&1) r.x = x - (y - (y&1)) / 2;
			else r.x = x - (y + (y&1)) / 2;
			r.z = y;
			r.y = 0-r.x-r.z;

		}

		return r;

	}

	Hex._resolveGridOffsetType = function(gridOffsetType) {
		if(gridOffsetType == 'even') return 0;
		else return 1; //odd
	}


	module.exports = Hex;

}());
