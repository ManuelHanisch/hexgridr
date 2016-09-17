
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
	var HexGrid = function (hexNum, orientation = 'pointy-top') {

		this.hexNum = parseInt(hexNum);
		this.orientation = orientation;
		this.axialOrigin = {x:0,y:0}; //TODO implement
		this.gridBuilt = false;
		this.grid = {};

		return this; //chaining
	};


	HexGrid.prototype.build = function (layout = 'hexagon') {

		var result = {
			layout: layout,
			verticalRange: 0,
			horizontalRange: 0,
			diagonalRange: 0,
			hexes: []
		};

		if(layout == 'hexagon') { //TODO implement rectangle layout
			var range = 0;
			var unconsumedElements = this.hexNum;

			while(unconsumedElements > 0) {
				range++;
				var ring = HexGrid.getHexagonalRing(range-1, this.orientation);
				for(var i = 0; i < ring.length; i++) {
					if(unconsumedElements > 0) {
						result.hexes.push(ring[i]);
						unconsumedElements--;
					}
					else break;
				}
			}

			result.verticalRange = result.horizontalRange = result.diagonalRange = range;
		}

		this.grid = result;
		this.gridBuilt = true;

		return this; //chaining
	}


	HexGrid.getHexagonalRing = function(radius, orientation = 'pointy-top') {

		var results = [];
		var centerHex = new Hex(0,0,0);

		if(radius <= 0 ) {
			results.push(centerHex);
		}
		else {

			if(orientation == 'pointy-top') {
				var tmp_hex = centerHex.getNeighbor(Hex.DIRECTIONS_HEX_POINTYTOP[Hex.PATH_STARTPOINT], radius);
				var tmp_directions = Hex.DIRECTIONS_POINTYTOP;

			}
			else if(orientation == 'flat-top') {
				var tmp_hex = centerHex.getNeighbor(Hex.DIRECTIONS_HEX_FLATTOP[Hex.PATH_STARTPOINT], radius);
				var tmp_directions = Hex.DIRECTIONS_FLATTOP;
			}

			for(var cDirection = 0; cDirection < 6; cDirection++) {
				for(var cRadius = 0; cRadius < radius; cRadius++) {
					results.push(tmp_hex);
					if(orientation == 'pointy-top') tmp_hex = tmp_hex.getNeighbor(Hex.DIRECTIONS_HEX_POINTYTOP[tmp_directions[cDirection]]);
					else tmp_hex = tmp_hex.getNeighbor(Hex.DIRECTIONS_HEX_FLATTOP[tmp_directions[cDirection]]);
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

	module.exports = HexGrid;

}());
