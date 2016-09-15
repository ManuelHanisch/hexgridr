
var Hex = require('./Hex.js');

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
	var HexGrid = function (hexNum = 20, orientation = 'pointy-top', axialOrigin = {x:0,y:0}) {

		this.hexNum = hexNum;
		this.orientation = orientation;
		this.axialOrigin = axialOrigin;

		this.hexGridBuild = false;
		this.hexGrid = {};

		return this;

	};



	// HexGrid.prototype.createPositionRect = function(hexWidth, hexHeight, pivotPoint = 'center') {
	//
	// 	var positionMap = {
	// 		width: (this.horizontalRange * hexWidth) + hexWidth,
	// 		height: (this.verticalRange * hexHeight) + hexHeight,
	// 		map: []
	// 	};
  HexGrid.prototype.build = function (layout = 'hexagon', direction = 'c-clock', startPoint = 'sw') {

		var result = {
				layout: layout,
				verticalRange: 0,
				horizontalRange: 0,
				diagonalRange: 0,
				hexes: []
		};

		switch(this.layout) {
			case 'rectangle': //TODO implement rectangle layout
				break;
			case 'hexagon':
				var range = 0;
				var unconsumedElements = this.hexNum;

				while(unconsumedElements > 0) {

					range++;

					var ring = HexGrid.getHexagonalRing(range-1, this.orientation, direction, startPoint);

					for(var i = 0; i < ring.length; i++) {
						if(unconsumedElements > 0) {
							result.hexes.push(ring[i]);
							unconsumedElements--;
						}
						else break;
					}

				}

				result.verticalRange = result.horizontalRange = result.diagonalRange = range;


				break;

		}

		this.hexGrid = result;
		this.hexGridBuild = true;
	}





	HexGrid.getHexagonalRing = function(radius, orientation = 'pointy-top', direction = 'c-clock', startPoint = 'sw') { //TODO implement orientation,direction,tartPoint

		var results = [];
		var centerHex = new Hex(0,0,0);

		if(radius <= 0 ) {
			results.push(centerHex);
		}
		else {

			var tmp_hex = centerHex.getNeighbor(Hex.DIRECTIONS.SW, radius);
			var tmp_directions = [Hex.DIRECTIONS.E, Hex.DIRECTIONS.NE, Hex.DIRECTIONS.NW,
														Hex.DIRECTIONS.W, Hex.DIRECTIONS.SW, Hex.DIRECTIONS.SE];

			for(var cDirection = 0; cDirection < 6; cDirection++) {
				for(var cRadius = 0; cRadius < radius; cRadius++) {

					results.push(tmp_hex);
					tmp_hex = tmp_hex.getNeighbor(tmp_directions[cDirection]);

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
	};



	module.exports = HexGrid;


}());
