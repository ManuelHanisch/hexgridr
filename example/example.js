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
    
    const hg = new HexGrid(input.orientation, input.offsettype);
    const hs = hg.createHexSet(input.hexnum, input.layout, input.originX, input.originY).includeCoord2D();
    const ps = hs.createPixelSet(input.hexW, input.hexH, input.ohexX, input.ohexY);

    if(input.orientation == 'pointy-top') var imgInfo = hg_imgInfo_pointytop;
    else var imgInfo = hg_imgInfo_flattop;

    hg_updateCodeResult(hg,hs,ps);

    hg_drawPixelGrid(ps, imgInfo.name);

  }


  function hg_drawPixelGrid(pg, imgName) {

    $('#hg_stage').empty();

    //draw rectangular Coordinate system
    hg_drawRectCCS(128, 128, pg.offsetX, pg.offsetY, pg.hexes[0].pPos.x, pg.hexes[0].pPos.y);


    var i = -1;
    (function loop(){
      if (++i >= pg.hexes.length) {
        return;
      }
      else setTimeout(function(){
        hg_drawHex(pg, i, imgName);
        loop();
      }, 100);
    })();

  }


  function hg_drawHex(pg, index, imgName) {

    const ph = pg.hexes[index];
    const pp = ph.pPos;
    const x = pp.x - (pg.hexWidth/2);
    const y = pp.y - (pg.hexHeight/2);

    $("<div>")
    .attr({
      'class': "animated fadeIn",
      'id': "hg_stagehex_"+index,
      'style': "z-index:0;display:table;position:absolute;left:"+x+"px;top:"+y+"px;width:"+pg.hexWidth+"px;height:"+pg.hexHeight+"px;background-size:100% 100%;background-image: url("+imgName+");background-repeat: no-repeat;background-position: right top;"
    })
    .append('<div style="display:table-cell;vertical-align:middle;text-align:center;color:#FF9999;word-break:break-all;">'+ph.fromHexSetHex.coord2D.x+'|'+ph.fromHexSetHex.coord2D.y+'</div>')
    .appendTo('#hg_stage');

  }


  function hg_drawRectCCS(w, h, x, y) {

    $("<div>")
    .attr({
      'style': "z-index:10;position:absolute;left:"+x+"px;top:"+y+"px;width:"+w+"px;height:"+h+"px;border-left:2px solid green;border-top:2px solid green"
    })
    .appendTo('#hg_stage');

  }


  function hg_updateCodePreview() {

    const input = hg_getInput();

    const code = 'const hexGrid = new HexGrid("'+input.orientation+'", "'+input.offsettype+'");<br />var hexSet = hexGrid.createHexSet('+input.hexnum+', "'+input.layout+'", '+input.originX+', '+input.originY+');';
    const pcode = 'var pixelSet = hexSet.createPixelSet('+input.hexW+', '+input.hexH+', '+input.ohexX+', '+input.ohexY+');';

    $("#hg_code_build").html(code);
    $("#hg_pcode_build").html(pcode);

    hljs.highlightBlock($('#hg_code_build')[0]);
    hljs.highlightBlock($('#hg_pcode_build')[0]);

  }


  function hg_updateCodeResult(hg,hs,ps) {

    hs.fromHexGrid = '[HexGrid reference]';
    ps.fromHexSet = '[HexSet reference]';
    $("#hg_code_result").html('hexGrid: '+JSON.stringify(hg)+';<br />hexSet: '+JSON.stringify(hs)+';<br /><br />pixelSet: '+JSON.stringify(ps)) + ';';
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
