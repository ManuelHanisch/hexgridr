![GitHub Logo](hex_icon_48.png) hexgridr
===========

Install with npm

```sh
npm install hexgridr --save
```

Use with node.js

```js
var HexGrid = require('hexgridr');

var hg = new HexGrid(hexCount, orientation, layout, origin);
hg.buildPixelGrid(hexWidth, hexHeight, originPosX, originPosY);

//you can also chain both functions:
var hg = new HexGrid(hexCount, orientation, layout, origin).buildPixelGrid(hexWidth, hexHeight, originPosX, originPosY);

//Example:
var hg = new HexGrid(20, "pointy-top", "hexagon", new Hex(0,0,0)).buildPixelGrid(64, 64, 256, 256);

```
Check out the [Demo](http://hexgridr.manuha.work) page.


This library uses internally a cubic representation (x,y,z) for all Hexes but it will
be possible to convert them into an axial representation (x,y) soon!  


Parameters Constructor:

hexCount {int}: **0 to N**  *--Number of Hexes*  
orientation {string}: **'pointy-top'** or **'flat-top'**  *--the two types of hexagons*  
layout {string}: **'hexagon'**  - more coming soon (rectangle next)  
origin {Hex}: a Hex with cubic coordinates x,y,z. You can use **new Hex(x,y,z)** or  **HexGrid.createHex(x,y,z)**. The Position of all Hexes will be relative to this one.

Parameters buildPixelGrid: 

hexWidth {int} : width of the Hex, usually in Pixels.  
hexHeight {int}: height of the Hex, usually in Pixels.  
originPosX {int}: X position of the origin Hex, usually in Pixels.   
originPosX {int}: Y position of the origin Hex, usually in Pixels.   
(Remark: Center is used as pivot point - hexWidth/2,  hexHeight/2).

#### Hexgridr is currently under heavy development. More features and a complete documentation coming in the next days.
