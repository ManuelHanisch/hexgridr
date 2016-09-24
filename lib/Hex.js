var HexCoord2D = require('./HexCoord2D');
var HexCoord3D = require('./HexCoord3D');

(function () {
	'use strict';


	var Hex = function (orientation) { //type: pointy-top or flat-top
		this.orientation = orientation;
		this.hexCoords = {
			created: false,
			offsetTypeNum: 0,
			coord2D: {},
			coord3D: {}
		};

		return this; //chaining

	};



	Hex.prototype.updateCoordinates = function(offsetTypeNum, x, y, optionalZ) {

		this.hexCoords.offsetTypeNum = offsetTypeNum;

		if(optionalZ == undefined) { //double first
			this.hexCoords.coord2D = new HexCoord2D(x, y);
			const t = this._offsetToHex(this.hexCoords.offsetTypeNum, x, y);
			this.hexCoords.coord3D = new HexCoord3D(t.x, t.y, t.z);
		}
		else { //triple first
			this.hexCoords.coord3D = new HexCoord3D(x, y, optionalZ);
			const d = this._hexToOffset(this.hexCoords.offsetTypeNum, x, y, optionalZ);
			this.hexCoords.coord2D = new HexCoord2D(d.x, d.y);
		}

		this.hexCoords.created = true;

		return this; //chaining

	}

	Hex.prototype._hexToOffset = function(offsetTypeNum, x, y, z) { // 3D to 2D

		var r = {};

		if(this.orientation == 'flat-top') {
			const cOffsetType = offsetTypeNum;	//even: offsets at column 0,2,4... , odd: offsets at column 1,3,5...
			r.x = x;
			if(cOffsetType&1) r.y = z + (x - (x&1)) / 2;
			else r.y = z + (x + (x&1)) / 2; //
		}
		else { //pointy-top
			const rOffsetType = offsetTypeNum;	//even: offsets at row 0,2,4... , odd: offsets at row 1,3,5...
			if(rOffsetType&1) r.x = x + (z - (z&1)) / 2;
			else  r.x = x + (z + (z&1)) / 2;
			r.y = z
		}

		return r;

	}
	Hex.prototype._offsetToHex = function(offsetTypeNum, x, y) { // 2D to 3D

		var r = {};

		if(this.orientation == 'flat-top') {
			const cOffsetType = offsetTypeNum;	//even: offsets at column 0,2,4... , odd: offsets at column 1,3,5...
			r.x = x;
			if(cOffsetType&1) r.z = y - (x - (x&1)) / 2;
			else r.z = y - (x + (x&1)) / 2;
			r.y = -r.x-r.z;
		}
		else { //pointy-top
			const rOffsetType = offsetTypeNum;	//even: offsets at row 0,2,4... , odd: offsets at row 1,3,5...
			if(rOffsetType&1) r.x = x - (y - (y&1)) / 2;
			else r.x = x - (y + (y&1)) / 2;
			r.z = y;
			r.y = -r.x-r.z;
			
		}

		return r;

	}


	module.exports = Hex;

}());
