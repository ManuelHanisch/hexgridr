var Hex = require('./Hex');
var HexCoord3D = require('./HexCoord3D');
var PixelSet = require('./PixelSet');


(function () {
	'use strict';



	var HexSet = function (hexGrid, hexNum, layout, originX, originY) {

		this.fromHexGrid = hexGrid;
		
		this.hexNum = hexNum;
		this.layout = layout;
		this.originHex3D = HexSet._createHexFrom2D(this.fromHexGrid.orientation, this.fromHexGrid.offsetType, originX, originY);
		this.hexes = [];


		if(this.layout == 'hexagon') { //TODO implement rectangle layout

			var range = 0;
			var unconsumedElements = hexNum;

			while(unconsumedElements > 0) {
				range++;
				const ring = HexSet._createHexagonalRing(this.originHex3D, range-1);
				for(var i = 0; i < ring.length; i++) {
					if(unconsumedElements > 0) {
						this.hexes.push(ring[i]);
						unconsumedElements--;
					}
					else break;
				}
			}

		}

		return this; //chaining

	}


	HexSet.prototype.includeCoord2D = function() {

		for(var i = 0; i < this.hexes.length; i++) this.hexes[i].setCoord2DFrom3D(this.fromHexGrid.offsetType);
		return this; //chaining

	}


	HexSet.prototype.createPixelSet = function (hexWidth, hexHeight, offsetX, offsetY) {

		return new PixelSet(this, hexWidth, hexHeight, offsetX, offsetY);

	}


	HexSet._createHexagonalRing = function (originHex3D, radius) {

		var results = [];
		var tmp_hex3D = HexSet._createHexFrom3D(originHex3D.orientation, originHex3D.coord3D.x, originHex3D.coord3D.y, originHex3D.coord3D.z);

		if(radius <= 0 ) results.push(tmp_hex3D);
		else {

			const o = (originHex3D.orientation == 'flat-top') ? 'FLATTOP' : 'POINTYTOP';
			tmp_hex3D = HexSet._createNeighbor(tmp_hex3D, HexSet._HEXRING_BUILDPATHS[o].CLOCKWISE.START, radius);

			for(var cDirection = 0; cDirection < 6; cDirection++) {
				for(var cRadius = 0; cRadius < radius; cRadius++) {
					results.push(tmp_hex3D);
					tmp_hex3D = HexSet._createNeighbor(tmp_hex3D, HexSet._HEXRING_BUILDPATHS[o].CLOCKWISE.PATH[cDirection], 1);
				}
			}

		}

		return results;
	}

	HexSet._HEXRING_BUILDPATHS = {
		POINTYTOP: {
			CLOCKWISE: {
				START: 'E',
				PATH: ['SW','W','NW','NE','E','SE']
			}
		},
		FLATTOP: {
			CLOCKWISE: {
				START: 'N',
				PATH: ['SE','S','SW','NW','N','NE']
			}
		}
	}


	HexSet._createHexFrom2D = function(orientation, gridOffsetType, x, y) {

		const t = Hex.createCoord3DFrom2D(orientation, gridOffsetType, x, y);
		return HexSet._createHexFrom3D(orientation, t.x, t.y, t.z);

	}


	HexSet._createHexFrom3D = function(orientation, x, y, z) {

		return new Hex(orientation).setCoord3D(x, y, z);

	}


	HexSet._createNeighbor = function(hex3D, direction, range) {

		const nCoords = new HexCoord3D(hex3D.coord3D.x, hex3D.coord3D.y, hex3D.coord3D.z).transformToNeighbor(hex3D.orientation, direction, range);
		return HexSet._createHexFrom3D(hex3D.orientation, nCoords.x, nCoords.y, nCoords.z);
	}


	module.exports = HexSet;

}());
