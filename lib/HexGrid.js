
var Hex = require('./Hex');
var PointyHex = require('./PointyHex');
var FlatHex = require('./FlatHex');


(function () {
	'use strict';


	var HexGrid = function (orientation) {

		this.orientation = orientation;

		this.gridBuilt = false;
		this.pixelGridBuilt = false;
		this.grid = {};
		this.pixelGrid = {};

		return this; //chaining

	};
	

	HexGrid.prototype.buildGrid = function (hexNum,layout) { //TODO NEXT: update implemetn originX,originY !

		var grid = {};
		grid.hexNum = parseInt(hexNum);
		grid.origin = (this.orientation == 'pointy-top') ? new PointyHex(0,0,0) : new FlatHex(0,0,0);
		grid.layout = layout;
		grid.hexes = [];

		if(grid.layout == 'hexagon') { //TODO implement rectangle layout
			var range = 0;
			var unconsumedElements = grid.hexNum;

			while(unconsumedElements > 0) {
				range++;
				var ring = HexGrid.getHexagonalRing(grid.origin, range-1);
				for(var i = 0; i < ring.length; i++) {
					if(unconsumedElements > 0) {
						grid.hexes.push(ring[i]);
						unconsumedElements--;
					}
					else break;
				}
			}

		}

		this.grid = grid;
		this.gridBuilt = true;

		return this; //chaining

	}

	HexGrid.prototype.buildPixelGrid = function (hexWidth, hexHeight, originPosX, originPosY) {

		var pGrid = {};
		pGrid.hexWidth = hexWidth;
		pGrid.hexHeight = hexHeight;
		pGrid.offsetX = originPosX;
		pGrid.offsetY = originPosY;
		pGrid.hexes = [];

		if(this.gridBuilt) {

			for(var i = 0; i < this.grid.hexes.length;i++) {
				pGrid.hexes.push(this.grid.hexes[i].getPixelPosition(hexWidth, hexHeight, originPosX, originPosY));
			}

			this.pixelGrid = pGrid;
			this.pixelGridBuilt = true;

		}

		return this; //chaining

	}


	HexGrid.getHexagonalRing = function (origin, radius) {

		var results = [];
		var tmp_hex = origin.createCopy();

		if(radius <= 0 ) results.push(tmp_hex);
		else {

			var tmp_hex = tmp_hex.createNeighbor(Hex.PATH_STARTPOINT, radius);

			for(var cDirection = 0; cDirection < 6; cDirection++) {
				for(var cRadius = 0; cRadius < radius; cRadius++) {
					results.push(tmp_hex);
					tmp_hex = tmp_hex.createNeighbor(tmp_hex.DIRECTIONS[cDirection], 1);
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

	// HexGrid.createHex = function (x,y,z) {
	// 	return new Hex(x,y,z);
	// }

	module.exports = HexGrid;

}());
