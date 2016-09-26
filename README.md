![GitHub Logo](hex_icon_48.png) hexgridr
===========

Install with npm

```sh
npm install hexgridr --save
```

Use with node.js

```js
var HexGrid = require('hexgridr');

var hexGrid = new HexGrid(orientation, offsetType);
var hexSet = hexGrid.createHexSet(hexCount, layout, originX, originY);

//Example:
var hexGrid = new HexGrid('pointy-top','odd');
var hexSet = hexGrid.createHexSet(19, 'hexagon', 0, 0);
```

Check out the [Demo](http://hexgridr.manuha.work) page.

Parameters:  
orientation {string}: **'pointy-top'** or **'flat-top'**  The two supported types of hexes.  
offsetType {string}: **'odd'** or **'even'** Rows (or columns) that contain the offset.  
hexCount {int}: **0 to N** Number of hexes.  
layout {string}: **'hexagon'**  HexSet is build according to this layout. (more coming soon - rectangle).  
originX {int}: X Coordinate of origin-hex. Each HexSet is build around the position of an origin-hex.  
originY {int}: Y Coordinate of origin-hex. Each HexSet is build around the position of an origin-hex.  


```js
//You can also generate pixel-positions for a HexSet:
var pixelSet = hexSet.buildPixelSet(hexWidth, hexHeight, offsetX, offsetY);

//Example:
var pixelSet = hexSet.buildPixelGrid(64, 64, 256, 256);
```
Parameters:  
hexWidth {int} : **0 to N** -- pixel-width of a Hex.  
hexHeight {int}: **0 to N** -- pixel-height of a Hex.  
offsetX {int}: **0 to N** -- X (or left) pixel-position of the origin-hex.  
offsetY {int}: **0 to N** -- Y (or top) pixel-position of the origin-hex.

Remarks:  
The center of each hex is used as the pivot point for positioning (hexWidth/2,  hexHeight/2).


Internally the library is using a coordinate system with three axes for most calculations (pair-wise perpendicular triple - x,y,z). But all relevant output also contains an x,y representation compatible with rectangular coordinate systems.

#### Hexgridr is currently under heavy development. More features and a complete documentation coming soon.
