$(function() {


  $("#hg_sel_orientation,#hg_sel_offsettype,#hg_sel_layout,#hg_sel_direction").change(function() { hg_updateCodePreview() });
  $("#hg_sel_hexnum,#hg_sel_originX,#hg_sel_originY,#hg_sel_hexW,#hg_sel_hexH,#hg_sel_hexX,#hg_sel_hexY").on('input', function() { hg_updateCodePreview() });
  $("#hg_sel_createBtn").click(function() { hg_createHexGrid() });

  var hg_imgInfo_pointytop = {name: 'hex_pointy_56_64.png'}
  var hg_imgInfo_flattop = {name: 'hex_flat_64_56.png'}
  //preloading images
  $("#hg_preloadimg_pointytop").css('backgroundImage','url('+hg_imgInfo_pointytop.name+')');
  $("#hg_preloadimg_flattop").css('backgroundImage','url('+hg_imgInfo_flattop.name+')');


  function hg_createHexGrid() {

    const input = hg_getInput();

    const hgType = new HexGridType(input.orientation, input.offsettype);
    const hg = new HexGrid(hgType, input.hexnum, input.layout, input.originX, input.originY);

    if(input.orientation == 'pointy-top') var imgInfo = hg_imgInfo_pointytop;
    else var imgInfo = hg_imgInfo_flattop;

    const pg = hg.createPixelGrid(input.hexW, input.hexH, input.ohexX, input.ohexY);

    hg_updateCodeResult(hgType,hg,pg);
    hg_drawPixelGrid(pg, imgInfo.name);

  }


  function hg_drawPixelGrid(pGrid, imgName) {

    $('#hg_stage').empty();

    var i = -1;
    (function loop(){
      if (++i >= pGrid.hexes.length) {

        //draw rectangular Coordinate system
        hg_drawRectCCS(128, 128, pGrid.offsetX, pGrid.offsetY, pGrid.hexes[0].pPos.x, pGrid.hexes[0].pPos.y);
        return;
      }
      else setTimeout(function(){
        hg_drawHex(pGrid, i, imgName);
        loop();
      }, 100);
    })();

  }


  function hg_drawHex(pGrid, index, imgName) {

    const ph = pGrid.hexes[index];
    const pp = ph.pPos;
    const x = pp.x - (pGrid.hexWidth/2);
    const y = pp.y - (pGrid.hexHeight/2);

    $("<div>")
    .attr({
      'class': "animated fadeIn",
      'id': "hg_stagehex_"+index,
      'style': "display:table;position:absolute;left:"+x+"px;top:"+y+"px;width:"+pGrid.hexWidth+"px;height:"+pGrid.hexHeight+"px;background-size:100% 100%;background-image: url("+imgName+");background-repeat: no-repeat;background-position: right top;"
    })
    .append('<div style="display:table-cell;vertical-align:middle;text-align:center;color:#FF9999">'+ph.hex.hexCoords.coord2D.x+'|'+ph.hex.hexCoords.coord2D.y+'</div>')
    .appendTo('#hg_stage');

  }


  function hg_drawRectCCS(w, h, x, y) {

    $("<div>")
    .attr({
      'style': "position:absolute;left:"+x+"px;top:"+y+"px;width:"+w+"px;height:"+h+"px;border-left:2px solid green;border-top:2px solid green"
    })
    .appendTo('#hg_stage');

  }


  function hg_updateCodePreview() {

    const input = hg_getInput();

    const code = 'const hexGridType = new HexGridType("'+input.orientation+'", "'+input.offsettype+'");<br />var hexGrid = new HexGrid(hexGridType, '+input.hexnum+', "'+input.layout+'", '+input.originX+', '+input.originY+');';
    const pcode = 'var pixelGrid = hexGrid.buildPixelGrid('+input.hexW+', '+input.hexH+', '+input.ohexX+', '+input.ohexY+');';

    $("#hg_code_build").html(code);
    $("#hg_pcode_build").html(pcode);

    hljs.highlightBlock($('#hg_code_build')[0]);
    hljs.highlightBlock($('#hg_pcode_build')[0]);

  }


  function hg_updateCodeResult(hgType,hg,pg) {
    $("#hg_code_result").html('hexGridType: '+JSON.stringify(hgType)+';<br />hexGrid: '+JSON.stringify(hg)+';<br /><br />pixelGrid: '+JSON.stringify(pg)) + ';';
    hljs.highlightBlock($('#hg_code_result')[0]);
  }


  function hg_getInput() {

    const input = {};

    input.orientation = $('#hg_sel_orientation').val().toLowerCase();
    input.offsettype = $('#hg_sel_offsettype').val().toLowerCase();

    input.hexnum = parseInt($('#hg_sel_hexnum').val());
    input.layout =  $('#hg_sel_layout').val().toLowerCase();
    input.originX = parseInt($('#hg_sel_originX').val());
    input.originY = parseInt($('#hg_sel_originY').val());

    input.hexW = parseInt($('#hg_sel_hexW').val());
    input.hexH = parseInt($('#hg_sel_hexH').val());
    input.ohexX = parseInt($('#hg_sel_hexX').val());
    input.ohexY = parseInt($('#hg_sel_hexY').val());

    return input;

  }


  hg_updateCodePreview();

});
