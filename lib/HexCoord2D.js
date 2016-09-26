(function () {
	'use strict';


	var HexCoord2D = function (x,y) {
		this.x = x;
		this.y = y;

		return this; //chaining

	}


	HexCoord2D.prototype.getNormalizedPixelPosition = function(orientation, gridOffsetType) {

		const got = HexCoord2D._resolveGridOffsetType(gridOffsetType);
		var result = {};

		if(orientation == 'flat-top') {

			result.x = 0.75 * this.x;
			result.y = this.y;
			if(got&1) result.y += 0.5*(this.x&1); //column offset
			else result.y -= 0.5*(this.x&1);

			//recovery code:
			//getPixelPosition + getNormalizedPP together:
			// result.x = offsetX + Math.floor((hexWidth / 2) * 1.5 * this.x);
			// if(cOffsetType&1) result.y = offsetY + Math.floor(hexHeight * this.y + ((hexHeight/2)*(this.x&1)));
			// else result.y = offsetY + Math.floor(hexHeight * this.y - ((hexHeight/2)*(this.x&1)));

			// without hexToOffset function: see HexCoord3D
			// result.x = offsetX + Math.floor((hexWidth / 2) * 1.5 * this.x);
			// result.y = offsetY + Math.floor(hexHeight * (this.z + (this.x/2)));

		}
		else {

			result.x = this.x;
			if(got&1) result.x += 0.5*(this.y&1); //row offset
			else result.x -= 0.5*(this.y&1);
			result.y = 0.75 * this.y;

			//recovery code:
			//getPixelPosition + getNormalizedPP together:
			// if(rOffsetType&1) result.x = offsetX + Math.floor(hexWidth * this.x + ((hexWidth/2)*(this.y&1)));
			// else result.x = offsetX + Math.floor(hexWidth * this.x - ((hexWidth/2)*(this.y&1)));
			// result.y = offsetY + Math.floor((hexHeight/2) * 1.5 * this.y);

			// without hexToOffset function: see HexCoord3D
			// result.x = offsetX + Math.floor(hexWidth * (this.x + (this.z/2)));
			// result.y = offsetY + Math.floor((hexHeight / 2) * 1.5 * this.z);

		}

		return result;

	}


	HexCoord2D._resolveGridOffsetType = function(gridOffsetType) {
		if(gridOffsetType == 'even') return 0;
		else return 1; //odd
	}


	module.exports = HexCoord2D;

}());
