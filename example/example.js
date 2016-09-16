$(function() {


  $("#hg_sel_hexnum").change(function() { hg_updateCodePreview() });
  $("#hg_sel_orientation").change(function() { hg_updateCodePreview() });
  $("#hg_sel_layout").change(function() { hg_updateCodePreview() });
  $("#hg_sel_direction").change(function() { hg_updateCodePreview() });
  $("#hg_sel_startingpoint").change(function() { hg_updateCodePreview() });

  $("#hg_sel_createBtn").click(function() { hg_createHexGrid() });

  function hg_createHexGrid() {

    var input = getInput();
    var hg = new HexGrid(input.hexnum,input.orientation);
    // hg.build(input.layout,input.direction,input.startingpoint);
    hg.build();

    hg_drawGrid(hg);


  }

  function hg_drawGrid(hg) {

    var startX = 223;
    var startY = 224;
    var imgInfo = {
      name: 'hex_56_64.png',
      width: 56,
      height: 64
    }

    var tmp_positions = [];

    hg.grid.hexes.forEach(function(hexy) {

      var pp = hexy.getPixelPosition(imgInfo.width, imgInfo.height, startX, startY);

      tmp_positions.push({
        posX: pp.x,
        posY: pp.y
      });

    });


    $('#hg_stage').empty();



    console.log(tmp_positions);

    var i = -1;
    (function loop(){
      if (++i >= tmp_positions.length) return;
      setTimeout(function(){
        hg_drawHex(tmp_positions[i].posX,tmp_positions[i].posY,i,imgInfo);
        loop();
      }, 200);
    })();

  }

  function hg_drawHex(posX,posY,someId,imgInfo) {

    $("<div>")
    .attr({
      'id': "hg_stagehex_"+someId,
      'class': "animated fadeIn",
      'style': "position:absolute;left:"+posX+"px;top:"+posY+"px;opacity:0;width:"+imgInfo.width+"px;height:"+imgInfo.height+"px;background-image: url("+imgInfo.name+");background-repeat: no-repeat;background-position: right top;"
    })
    .appendTo('#hg_stage');

  }



  function hg_updateCodePreview() {
    var input = getInput();
    var code = 'var hg = new HexGrid('+input.hexnum+',"'+input.orientation+'").build();';
    $("#hg_code_build").html(code);

  }

  function getInput() {
    var input = {};
    input.hexnum = parseInt($('#hg_sel_hexnum').val());
    input.orientation = $('#hg_sel_orientation').val().toLowerCase();
    input.layout =  $('#hg_sel_layout').val().toLowerCase();
    input.direction =  $('#hg_sel_direction').val().toLowerCase();
    input.startingpoint =  $('#hg_sel_startingpoint').val().toLowerCase();
    return input;
  }


  hg_updateCodePreview();

});
