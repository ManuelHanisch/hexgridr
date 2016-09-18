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
hg.buildPixelGrid(hexWidth, hexHeight, offsetX, offsetY);

//you can also chain the functions. Example:
var hg = new HexGrid("pointy-top").buildGrid(19,"hexagon").buildPixelGrid(64, 64, 256, 256);

```
Check out the [Demo](http://hexgridr.manuha.work) page.

Parameters used:

orientation {string}: **'pointy-top'** or **'flat-top'**  *--the two supported types of hexagons*  
hexCount {int}: **0 to N**  *--Number of Hexes*  
layout {string}: **'hexagon'**  - more coming soon (rectangle next)

hexWidth {int} : width of each Hex, usually in Pixels.  
hexHeight {int}: height of each Hex, usually in Pixels.  
offsetX {int}: X position of the first Hex, usually in Pixels.   
offsetY {int}: Y position of the first Hex, usually in Pixels.

Remarks:  
The center of each hex is used as the pivot point for positioning (hexWidth/2,  hexHeight/2).

The library is using an x,y,z representation for hexes internally. The HexGrid starts at 0,0,0 and all hexes are built
around that. Options to change the starting position and axial/offset representations (x,y) will be available soon.


#### Hexgridr is currently under heavy development. More features and a complete documentation coming soon.
