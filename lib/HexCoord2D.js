(function () {
	'use strict';


	var HexCoord2D = function (x,y) { //type: pointy-top or flat-top
		this.x = x;
		this.y = y;

		return this; //chaining

	}


	HexCoord2D.prototype.getPixelPosition = function(orientation, offsetTypeNum, hexWidth, hexHeight, offsetX, offsetY) {

		var result = {};

		if(orientation == 'flat-top') {

			const cOffsetType = offsetTypeNum;

			result.x = offsetX + Math.floor((hexWidth / 2) * 1.5 * this.x);
			if(cOffsetType&1) result.y = offsetY + Math.floor(hexHeight * this.y + ((hexHeight/2)*(this.x&1)));
			else result.y = offsetY + Math.floor(hexHeight * this.y - ((hexHeight/2)*(this.x&1)));
			// without hexToOffset function:
			// result.x = offsetX + Math.floor((hexWidth / 2) * 1.5 * this.x);
			// result.y = offsetY + Math.floor(hexHeight * (this.z + (this.x/2)));

		}
		else {

			const rOffsetType = offsetTypeNum;

			if(rOffsetType&1) result.x = offsetX + Math.floor(hexWidth * this.x + ((hexWidth/2)*(this.y&1)));
			else result.x = offsetX + Math.floor(hexWidth * this.x - ((hexWidth/2)*(this.y&1)));
			result.y = offsetY + Math.floor((hexHeight/2) * 1.5 * this.y);
			// without hexToOffset function:
			// result.x = offsetX + Math.floor(hexWidth * (this.x + (this.z/2)));
			// result.y = offsetY + Math.floor((hexHeight / 2) * 1.5 * this.z);

		}

		return result;

	}


	module.exports = HexCoord2D;

}());
