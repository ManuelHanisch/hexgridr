$(function() {


  // $("#hg_sel_hexnum").change(function() { hg_updateCodePreview() });
  // $("#hg_sel_orientation").change(function() { hg_updateCodePreview() });
  // $("#hg_sel_layout").change(function() { hg_updateCodePreview() });
  // $("#hg_sel_direction").change(function() { hg_updateCodePreview() });
  // $("#hg_sel_startingpoint").change(function() { hg_updateCodePreview() });
  //

  $("#hg_sel_orientation,#hg_sel_layout,#hg_sel_direction,#hg_sel_startingpoint").change(function() { hg_updateCodePreview() });
  $("#hg_sel_hexnum,#hg_sel_hexW,#hg_sel_hexH,#hg_sel_hexX,#hg_sel_hexY").on('input', function() { hg_updateCodePreview() });



  $("#hg_sel_createBtn").click(function() { hg_createHexGrid() });

  var hg_imgInfo_pointytop = {
    name: 'hex_pointy_56_64.png'
  }
  var hg_imgInfo_flattop = {
    name: 'hex_flat_64_56.png'
  }
  //preloading images
  $("#hg_preloadimg_pointytop").css('backgroundImage','url('+hg_imgInfo_pointytop.name+')');
  $("#hg_preloadimg_flattop").css('backgroundImage','url('+hg_imgInfo_flattop.name+')');


  function hg_createHexGrid() {

    var input = getInput();
    var hg = new HexGrid(input.hexnum,input.orientation, input.layout, HexGrid.createHex(0,0,0));



    if(input.orientation == 'pointy-top') var imgInfo = hg_imgInfo_pointytop;
    else var imgInfo = hg_imgInfo_flattop;

    hg.buildPixelGrid(input.hexW, input.hexH, input.ohexX, input.ohexY);

    hg_updateCodeResult(hg);

    hg_drawPixelGrid(hg.pixelGrid, imgInfo.name);

  }


  function hg_drawPixelGrid(pGrid, imgName) {

    $('#hg_stage').empty();

    var i = -1;
    (function loop(){
      if (++i >= pGrid.grid.length) return;
      setTimeout(function(){
        hg_drawHex(pGrid, i, imgName);
        loop();
      }, 100);
    })();

  }
  function hg_drawHex(pGrid, index, imgName) {

    $("<div>")
    .attr({
      'class': "animated fadeIn",
      'id': "hg_stagehex_"+index,
      'style': "position:absolute;left:"+pGrid.grid[index].x+"px;top:"+pGrid.grid[index].y+"px;width:"+pGrid.hexWidth+"px;height:"+pGrid.hexHeight+"px;background-size:100% 100%;background-image: url("+imgName+");background-repeat: no-repeat;background-position: right top;"
    })
    .appendTo('#hg_stage');

  }


  function hg_updateCodePreview() {

    var input = getInput();
    var code = 'var hg = new HexGrid('+input.hexnum+', "'+input.orientation+'", "'+input.layout+'", HexGrid.createHex(0,0,0));<br />hg.buildPixelGrid('+input.hexW+', '+input.hexH+', '+input.ohexX+', '+input.ohexY+');';
    code += '<br /><br />/*you can also chain both functions:*/<br /><br />';
    code += 'var hg = new HexGrid('+input.hexnum+', "'+input.orientation+'", "'+input.layout+'", HexGrid.createHex(0,0,0)).buildPixelGrid('+input.hexW+', '+input.hexH+', '+input.ohexX+', '+input.ohexY+');';

    $("#hg_code_build").html(code);
    hljs.highlightBlock($('#hg_code_build')[0]);



  }


  function hg_updateCodeResult(hg) {
    $("#hg_code_result").html('HexGrid: '+JSON.stringify(hg)+'<br />PixelGrid: '+JSON.stringify(hg.pixelGrid));
    hljs.highlightBlock($('#hg_code_result')[0]);
  }


  function getInput() {
    var input = {};
    input.hexnum = parseInt($('#hg_sel_hexnum').val());
    input.orientation = $('#hg_sel_orientation').val().toLowerCase();
    input.layout =  $('#hg_sel_layout').val().toLowerCase();
    input.hexW = parseInt($('#hg_sel_hexW').val());
    input.hexH = parseInt($('#hg_sel_hexH').val());
    input.ohexX = parseInt($('#hg_sel_hexX').val());
    input.ohexY = parseInt($('#hg_sel_hexY').val());
    return input;
  }


  hg_updateCodePreview();

});
