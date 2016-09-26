
var Hex = require('./Hex');
var HexCoord3D = require('./HexCoord3D');


(function () {
	'use strict';



	var PixelSet = function (hexSet, hexWidth, hexHeight, offsetX, offsetY) {

		this.fromHexSet = hexSet;

		this.hexWidth = hexWidth;
		this.hexHeight = hexHeight;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.hexes = [];

		const orientation = this.fromHexSet.fromHexGrid.orientation;
		const gridOffsetType = this.fromHexSet.fromHexGrid.offsetType;
		const hexSetHexes = this.fromHexSet.hexes;
		const originPpos = this.fromHexSet.originHex3D.coord3D.getNormalizedPixelPosition(orientation);

		for(var i = 0; i < hexSetHexes.length; i++) {

			const pPos = hexSetHexes[i].coord3D.getNormalizedPixelPosition(orientation);
			pPos.x = Math.floor(offsetX + (hexWidth * (pPos.x - originPpos.x)));
			pPos.y = Math.floor(offsetY + (hexHeight * (pPos.y - originPpos.y)));

			this.hexes.push({fromHexSetHex: hexSetHexes[i], pPos: pPos});

		}

		return this; //chaining

	}


	module.exports = PixelSet;

}());
