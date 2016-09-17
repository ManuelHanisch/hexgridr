$(function() {


  $("#hg_sel_hexnum").change(function() { hg_updateCodePreview() });
  $("#hg_sel_orientation").change(function() { hg_updateCodePreview() });
  $("#hg_sel_layout").change(function() { hg_updateCodePreview() });
  $("#hg_sel_direction").change(function() { hg_updateCodePreview() });
  $("#hg_sel_startingpoint").change(function() { hg_updateCodePreview() });

  $("#hg_sel_createBtn").click(function() { hg_createHexGrid() });

  var hg_imgInfo_pointytop = {
    name: 'hex_pointy_56_64.png',
    width: 56,
    height: 64
  }
  var hg_imgInfo_flattop = {
    name: 'hex_flat_64_56.png',
    width: 64,
    height: 56
  }
  //preloading images
  $("#hg_preloadimg_pointytop").css('backgroundImage','url('+hg_imgInfo_pointytop.name+')');
  $("#hg_preloadimg_flattop").css('backgroundImage','url('+hg_imgInfo_flattop.name+')');


  function hg_createHexGrid() {

    var input = getInput();
    var hg = new HexGrid(input.hexnum,input.orientation);
    hg.build(input.layout);
    hg_drawGrid(hg,input.orientation);

  }


  function hg_drawGrid(hg, orientation) {

    var startX = 223;
    var startY = 224;

    hg_updateCodeResult(hg);
    $('#hg_stage').empty();


    var i = -1;
    (function loop(){
      if (++i >= hg.grid.hexes.length) return;
      setTimeout(function(){
        hg_drawHex(hg.grid.hexes[i],i,startX,startY,orientation);
        loop();
      }, 100);
    })();

  }


  function hg_drawHex(hexy,someId,offsetX,offsetY,orientation) {

    if(orientation == 'pointy-top') var imgInfo = hg_imgInfo_pointytop;
    else var imgInfo = hg_imgInfo_flattop;

    var pp = hexy.getPixelPosition(imgInfo.width, imgInfo.height, offsetX, offsetY, orientation);

    $("<div>")
    .attr({
      'class': "animated fadeIn",
      'id': "hg_stagehex_"+someId,
      'style': "position:absolute;left:"+pp.x+"px;top:"+pp.y+"px;width:"+imgInfo.width+"px;height:"+imgInfo.height+"px;background-image: url("+imgInfo.name+");background-repeat: no-repeat;background-position: right top;"
    })
    .appendTo('#hg_stage');

  }


  function hg_updateCodePreview() {
    var input = getInput();
    var code = 'var hg = new HexGrid('+input.hexnum+',"'+input.orientation+'").build();';
    $("#hg_code_build").html(code);
  }


  function hg_updateCodeResult(hg) {
    $("#hg_code_result").html('HexGrid: '+JSON.stringify(hg));
  }


  function getInput() {
    var input = {};
    input.hexnum = parseInt($('#hg_sel_hexnum').val());
    input.orientation = $('#hg_sel_orientation').val().toLowerCase();
    input.layout =  $('#hg_sel_layout').val().toLowerCase();
    return input;
  }


  hg_updateCodePreview();

});
