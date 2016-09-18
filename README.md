![GitHub Logo](hex_icon_48.png) hexgridr
===========

Install with npm

```sh
npm install hexgridr --save
```

Use with node.js

```js
var HexGrid = require('hexgridr');

var hg = new HexGrid(orientation);
hg.buildGrid(hexCount,layout);
hg.buildPixelGrid(hexWidth, hexHeight, originPosX, originPosY);

//you can also chain the functions.
//Example:
var hg = new HexGrid("pointy-top").buildGrid(19,"hexagon").buildPixelGrid(64, 64, 256, 256);

```
Check out the [Demo](http://hexgridr.manuha.work) page.

Parameters:

orientation {string}: **'pointy-top'** or **'flat-top'**  *--the two supported types of hexagons*  
hexCount {int}: **0 to N**  *--Number of Hexes*  
layout {string}: **'hexagon'**  - more coming soon (rectangle next)

hexWidth {int} : width of the Hex, usually in Pixels.  
hexHeight {int}: height of the Hex, usually in Pixels.  
originPosX {int}: X position of the origin Hex, usually in Pixels.   
originPosX {int}: Y position of the origin Hex, usually in Pixels.

Remarks:  
The center of the hex is used as the pivot point for positioning (hexWidth/2,  hexHeight/2).  
The Coordinates of all hexes are build relative to [0,0] (or [0,0,0] internally). The option to change that will be available soon !


#### Hexgridr is currently under heavy development. More features and a complete documentation coming soon.
