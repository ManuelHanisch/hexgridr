(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
	'use strict';


	var Hex = function (x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	};

	Hex.DIRECTIONS = {
		N : new Hex(0, 0, -1),
		NE: new Hex(1, 0, -1),
		E : new Hex(1, -1, 0),
		SE: new Hex(0, -1, 1),
		S : new Hex(0, 0,  1),
		SW: new Hex(-1, 0, 1),
		W : new Hex(-1, 1, 0),
		NW: new Hex(0, 1, -1),
	};



	Hex.prototype.getAxialCoordinates = function () {
		return {
			x: this.x,
			y: this.z
		};
	}

	Hex.prototype.getNeighbor = function(directionHex, range = 1) {
		return this._add(directionHex._scale(range));
	}


	Hex.prototype.getPixelPosition = function(hexWidth, hexHeight,  offsetX = 0, offsetY = 0, orientation = 'pointy-top') {

		var result = {};

		if(orientation == 'pointy-top') {
			result.x = offsetX + Math.floor(hexWidth * (this.x + (this.z/2)));
			result.y = offsetY + Math.floor((hexHeight / 2) * 1.5 * this.z);
		}

		return result;
		
	}

	Hex.prototype._add = function(directionHex) {
		return new Hex(this.x + directionHex.x, this.y + directionHex.y, this.z + directionHex.z);
	}
	Hex.prototype._scale = function(k) {
		return new Hex(this.x * k, this.y * k, this.z * k);
	}

	module.exports = Hex;

}());

},{}],2:[function(require,module,exports){

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
	var HexGrid = function (hexNum = 20, orientation = 'pointy-top', axialOrigin = {x:0,y:0}) {

		this.hexNum = hexNum;
		this.orientation = orientation;
		this.axialOrigin = axialOrigin;
		this.hexGridBuild = false;
		this.hexGrid = {};

		return this; //chaining
	};


	HexGrid.prototype.build = function (layout = 'hexagon', direction = 'c-clock', startPoint = 'sw') {

		var result = {
			layout: layout,
			verticalRange: 0,
			horizontalRange: 0,
			diagonalRange: 0,
			hexes: []
		};

		switch(layout) {
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

		return this; //for chaining
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

},{"./Hex":1}]},{},[2]);
