![GitHub Logo](hex_icon_48.png) hexgridr
===========

Install with npm

```sh
npm install hexgridr --save
```

Use with node.js

```js
var HexGrid = require('hexgridr');

var hexGridType = new HexGridType(orientation, offsetType);
var hexGrid = new HexGrid(hexGridType, hexCount, layout, originX, originY);

//Example:
var hexGridType = new HexGridType('pointy-top','odd');
var hexGrid = new HexGrid(hexGridType, 19, 'hexagon', 0, 0);
```

Check out the [Demo](http://hexgridr.manuha.work) page.

Parameters explained:  
orientation {string}: **'pointy-top'** or **'flat-top'**  -- the two supported types of hexagons  
offsetType {string}: **'odd'** or **'even'** -- the rows (or columns) that contain the offset  
hexCount {int}: **0 to N**  -- Number of Hexes  
layout {string}: **'hexagon'**  -- more coming soon (rectangle next)



```js

//You can also generate pixel-positions for all Hexes:
var pixelGrid = hexGrid.buildPixelGrid(hexWidth, hexHeight, offsetX, offsetY);

//Example:
var pixelGrid = hexGrid.buildPixelGrid(64, 64, 256, 256);

```
Parameters explained:  
hexWidth {int} : **0 to N** -- width of a Hex, usually in Pixels.  
hexHeight {int}: **0 to N** -- height of a Hex, usually in Pixels.  
offsetX {int}: **0 to N** -- X (or left) position of the initial Hex, usually in Pixels.   
offsetY {int}: **0 to N** -- Y (or top) position of the initial Hex, usually in Pixels.

Remarks:  
The center of each hex is used as the pivot point for positioning (hexWidth/2,  hexHeight/2).


Internally the library is using a coordinate system with three axes (pair-wise perpendicular triple - x,y,z) for most calculations. But all relevant output also contains an x,y representation compatible with rectangular coordinate systems.

#### Hexgridr is currently under heavy development. More features and a complete documentation coming soon.
