
var HexGridType = require('./HexGridType');
var Hex = require('./Hex');
var HexCoord3D = require('./HexCoord3D');


(function () {
	'use strict';


	var HexGrid = function (hexgridType, hexNum, layout, originX, originY) {

		this.hexgridType = hexgridType;
		this.hexNum = parseInt(hexNum);
		this.layout = layout;
		this.origin = HexGrid._createHex(this.hexgridType.orientation, this.hexgridType.offsetTypeNum, originX, originY);
		this.hexes = [];


		if(this.layout == 'hexagon') { //TODO implement rectangle layout

			var range = 0;
			var unconsumedElements = this.hexNum;

			while(unconsumedElements > 0) {
				range++;
				const ring = HexGrid.createHexagonalRing(this.origin, range-1);
				for(var i = 0; i < ring.length; i++) {
					if(unconsumedElements > 0) {
						this.hexes.push(ring[i]);
						unconsumedElements--;
					}
					else break;
				}
			}

		}

	}


	HexGrid.prototype.createPixelGrid = function (hexWidth, hexHeight, originPosX, originPosY) {

		const pGrid = {};
		pGrid.hexWidth = hexWidth;
		pGrid.hexHeight = hexHeight;
		pGrid.offsetX = originPosX;
		pGrid.offsetY = originPosY;
		pGrid.hexes = [];

		for(var i = 0; i < this.hexes.length;i++) {
			pGrid.hexes.push({hex: this.hexes[i], pPos: this.hexes[i].hexCoords.coord2D.getPixelPosition(this.hexgridType.orientation, this.hexgridType.offsetTypeNum, hexWidth, hexHeight, originPosX, originPosY)});
		}

		return pGrid;

	}


	HexGrid.createHexagonalRing = function (originHex, radius) {

		var results = [];
		var tmp_hex = HexGrid._createHex(originHex.orientation, originHex.hexCoords.offsetTypeNum, originHex.hexCoords.coord3D.x, originHex.hexCoords.coord3D.y, originHex.hexCoords.coord3D.z);

		if(radius <= 0 ) results.push(tmp_hex);
		else {

			const o = (originHex.orientation == 'flat-top') ? 'FLATTOP' : 'POINTYTOP';
			tmp_hex = HexGrid._createNeighbor(tmp_hex, HexGrid._HEXRING_BUILDPATHS[o].CLOCKWISE.START , radius);

			for(var cDirection = 0; cDirection < 6; cDirection++) {
				for(var cRadius = 0; cRadius < radius; cRadius++) {
					results.push(tmp_hex);
					tmp_hex = HexGrid._createNeighbor(tmp_hex, HexGrid._HEXRING_BUILDPATHS[o].CLOCKWISE.PATH[cDirection], 1);
				}
			}

		}

		return results;
	}


	HexGrid._HEXRING_BUILDPATHS = {
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


	HexGrid._createHex = function(orientation, offsetTypeNum, x, y, optionalZ) {
		const h = new Hex(orientation).updateCoordinates(offsetTypeNum, x, y, optionalZ);
		return h;
	}


	HexGrid._createNeighbor = function(hex, direction, range) {
		const nCoords = new HexCoord3D(hex.hexCoords.coord3D.x, hex.hexCoords.coord3D.y, hex.hexCoords.coord3D.z).transformToNeighbor(hex.orientation, direction, range);
		return HexGrid._createHex(hex.orientation, hex.hexCoords.offsetTypeNum, nCoords.x, nCoords.y, nCoords.z);
	}



	//static API methods ---------------------------------------------------------



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
