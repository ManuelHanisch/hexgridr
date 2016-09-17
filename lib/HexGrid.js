
var Hex = require('./Hex');

/**
* Hexagonal Grid Functions, with Axial Storage and Cubic Representation
*
*/
(function () {
	'use strict';


	/*
	* Orientations: pointy-top or flat-top
	*	layouts: hexagon, rectangle
	*	origins: axial coordinate of origin.
	*/
	var HexGrid = function (hexNum, orientation, layout, origin) {

		this.hexNum = parseInt(hexNum);
		this.orientation = orientation;
		this.origin = origin;
		this.layout = layout;
		this.grid = this._buildGrid();

		this.pixelGrid = {};
		this.pixelGridBuilt = false;

		return this; //chaining

	};


	HexGrid.prototype._buildGrid = function () {

		var hexes = [];

		if(this.layout == 'hexagon') { //TODO implement rectangle layout
			var range = 0;
			var unconsumedElements = this.hexNum;

			while(unconsumedElements > 0) {
				range++;
				var ring = HexGrid.getHexagonalRing(this.origin, range-1, this.orientation);
				for(var i = 0; i < ring.length; i++) {
					if(unconsumedElements > 0) {
						hexes.push(ring[i]);
						unconsumedElements--;
					}
					else break;
				}
			}

		}

		return hexes;
	}

	HexGrid.prototype.buildPixelGrid = function (hexWidth, hexHeight, originPosX, originPosY) {

		var pGrid = {};

		pGrid.hexWidth = hexWidth;
		pGrid.hexHeight = hexHeight;
		pGrid.offsetX = originPosX;
		pGrid.offsetY = originPosY;
		pGrid.grid = [];

		for(var i = 0; i < this.grid.length;i++) {
			pGrid.grid.push(this.grid[i].getPixelPosition(hexWidth, hexHeight, originPosX, originPosY, this.orientation));
		}

		this.pixelGrid = pGrid;
		this.pixelGridBuilt = true;

		return this; //chaining

	}


	HexGrid.getHexagonalRing = function (origin, radius, orientation) {

		var results = [];

		if(radius <= 0 ) {
			results.push(origin);
		}
		else {

			if(orientation == 'pointy-top') {
				var tmp_hex = origin.getNeighbor(Hex.DIRECTIONS_HEX_POINTYTOP[Hex.PATH_STARTPOINT], radius);
				var tmp_directions = Hex.DIRECTIONS_POINTYTOP;

			}
			else if(orientation == 'flat-top') {
				var tmp_hex = origin.getNeighbor(Hex.DIRECTIONS_HEX_FLATTOP[Hex.PATH_STARTPOINT], radius);
				var tmp_directions = Hex.DIRECTIONS_FLATTOP;
			}


			for(var cDirection = 0; cDirection < 6; cDirection++) {
				for(var cRadius = 0; cRadius < radius; cRadius++) {
					results.push(tmp_hex);
					if(orientation == 'pointy-top') tmp_hex = tmp_hex.getNeighbor(Hex.DIRECTIONS_HEX_POINTYTOP[tmp_directions[cDirection]], 1);
					else if(orientation == 'flat-top') tmp_hex = tmp_hex.getNeighbor(Hex.DIRECTIONS_HEX_FLATTOP[tmp_directions[cDirection]], 1);
				}
			}

		}

		return results;
	}


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

	HexGrid.createHex = function (x,y,z) {
		return new Hex(x,y,z);
	}

	module.exports = HexGrid;

}());
