//customize corners
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: '#7777ff'
});

//define various canvasses
var canvasfront = new fabric.Canvas('canvasfront', {preserveObjectStacking: true, selection: false, hoverCursor: 'pointer',
     selection: true,
     selectionBorderColor:'blue'});
var canvasback = new fabric.Canvas('canvasback', {preserveObjectStacking: true, selection: false});
var canvasleft = new fabric.Canvas('canvasleft', {preserveObjectStacking: true, selection: false});
var canvasright = new fabric.Canvas('canvasright', {preserveObjectStacking: true, selection: false});
var canvasses = [canvasfront, canvasback, canvasleft, canvasright];

//define TShirt SVGs

//define front as initial active canvas
document.activecanvas = canvasfront;

  //add a text object
  function addText(text) {
    var hex = $('#text-color-bar').css('color'); //this is trigger for text change
    // console.log(hex);
   
    var oText = new fabric.IText(text, {left: 100, top: 150, editable: false});
    document.activecanvas.add(oText);
    var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
    document.activecanvas.setActiveObject(thisObj);
    thisObj.center();
    thisObj.setCoords();

   
    changeColorActive(thisObj, hex);
    //console.log(thisObj.canvas.lowerCanvasEl.id);
    // document.activecanvas.renderAll();


    $('#text-color-bar').css("background-color", hex);
    $('#text-color-bar').css("color", hex);
  }

  function changeColorActive(active, hex)
  {
    if(active != null)
    {
      active.set('fill', hex);
      document.activecanvas.renderAll();
    }
  }

   //sets the active object (see getLayer)
  function layerOps(get) {
    document.activecanvas.setActiveObject(document.activecanvas.item(get));
  }

    //layer list of active canvas
  function getLayers() {
    // console.log('getting laywers');
    var objects = document.activecanvas.getObjects();
    var layers = "";
    for (var object in objects) {
      var index = objects.length - object - 1;
      object = objects[index];
      var value;
      if (object.type == "i-text") value = object.text;
      else if (object.type == "image") value = object.width + " x " + object.height;
      else value = "&nbsp;<span class=\"layercolor\" style=\"background: "+object.fill+"; border: 3px solid "+(object.stroke || "transparent")+"\"></span>";
      if (object == document.activecanvas.getActiveObject())
        var li = "<li class=\"active row\">"
      else
        var li = "<li class=\"row\">"
      layers += li;
      layers += "<span onclick=\"toggleVisible("+index+",'set')\" >"+toggleVisible(index,'get')+"</span>";
      layers += "<label onclick=\"layerOps("+index+")\"class=\"span8 singleLayer\">" + object.type + " - " + value + "</label>";
      layers += "<div class=\"moveLayer\">";
      layers +=   "<a class=\"down\" onclick=\"moveBack("+index+")\">&#9652;</a>";
      layers +=   "<a class=\"up\" onclick=\"moveFront("+index+"\">&#9652;</a>";
      layers +=   "<span aria-hidden=\"true\" id=\"closeLayer\" onclick = \"closeLayer("+index+", this)\">×</span>"
      layers += "</div>\n";
    }
    $("#layers").html(layers);
  }

  function closeLayer(index,elem)
  {
    console.log('hap');
    console.log($(elem))
    $(elem).parent().parent().remove();

    var objects = document.activecanvas.getObjects();
    objects[index].remove();
  }

  //moves object one layer up
  function moveFront(index) {
    document.activecanvas.getObjects()[index].bringForward();
    document.activecanvas.renderAll();
  }
  //moves object one layer Back
  function moveBack(index) {
    document.activecanvas.getObjects()[index].sendBackwards();
    document.activecanvas.renderAll();
  }
  //moves object one unit left
  function moveLeft(object) {
    object.left -= 1;
    object.setCoords();
    document.activecanvas.renderAll();
  }
  function moveRight(object) {
    object.left += 1;
    object.setCoords();
    document.activecanvas.renderAll();
  }
  function moveUp(object) {
    object.top -= 1;
    object.setCoords();
    document.activecanvas.renderAll();
  }
  function moveDown(object) {
    object.top += 1;
    object.setCoords();
    document.activecanvas.renderAll();
  }
  //deletes object
  function removeObject() {
    var index = document.activecanvas.getObjects().indexOf(document.activecanvas.getActiveObject());
    if (index == document.activecanvas.getObjects().length - 1) isLast = true;
    if (!isLast) newindex = index + 1;
    else if (index != 0) newindex = index - 1;
    else newindex = null;
    object = document.activecanvas.getActiveObject().remove();
    console.log("hi2");
    document.activecanvas.setActiveObject(document.activecanvas.getObjects()[newindex]);
  }

  //toggles visibility of object
  function toggleVisible(index,method) {
    if (method == "get") {
      if (document.activecanvas.getObjects()[index].visible == true) {
        return "&#128065;";
      }
      else {
        return "---";
      }
    }
    else if (method == "set") {
      document.activecanvas.getObjects()[index].visible = !document.activecanvas.getObjects()[index].visible;
      document.activecanvas.discardActiveObject();
      document.activecanvas.renderAll();
    }
  }

    // //gets the textformatting
  function getTextFormatting(object, element, type) {
    console.log(object.get(type));
    if(object.get(type) == "normal" || object.get(type) == "none") element.removeClass('active');
    else element.addClass('active');
  }

// sets values after selection
  function objectops(object) {
    if(object.type == "i-text") {
      // console.log('bou');
      if(! $("#textops").hasClass('selected') )
        $("#textops").trigger('click');
      // console.log($("p#text-color-bar.hccp-colorbar"));
      // $(".formatobject.active").removeClass("active");
      // $("#textops .formatobject").addClass("active");
      $("input#texttoadd").val(object.text);
      // $("#textops article input[name='updatestrokewidth']").val(object.strokeWidth);
      $("p#text-color-bar.hccp-colorbar").css({'color':object.fill, 'background-color':object.fill});
      // $("#textops article input[name='updatestroke']").val(object.stroke);
      // $("#textops article input[name='updateback']").val(object.backgroundColor);
    }
  }

  // ************** Event Listeners *************
  $("#addtext").click(function(){
    addText($("#texttoadd").val() || "text");
  });

  $("#texttoadd").on('input', function(){
    var text = $("#texttoadd").val() || "text";
    var active = document.activecanvas.getActiveObject();
    // console.log(active);
    if(active != null)
    {
     active.set('text', text);
     document.activecanvas.renderAll();
   }
    // console.log('changed');
  })

  //text operations
  //make active text bold
  $("#bold").click(function(){
    object = document.activecanvas.getActiveObject();
    if (object.get('fontWeight')=='normal') object.set('fontWeight','bold');
    else object.set('fontWeight','normal');
    getTextFormatting(object,$(this),'fontWeight');
    document.activecanvas.renderAll();

    return false;
  });


  //make active text italic
  $("#italic").click(function(){
    object = document.activecanvas.getActiveObject();
    if (object.get('fontStyle')=='normal') object.set('fontStyle','italic');
    else object.set('fontStyle','normal');
    getTextFormatting(object,$(this),'fontStyle');
    document.activecanvas.renderAll();

    return false;

  });

  //switch text decoration - underline, strikethrough etc
  $("#textDecoration").click(function(){
    object = document.activecanvas.getActiveObject();
    decor = object.get('textDecoration');
    if (decor=='underline') object.set('textDecoration','line-through');
    else if (decor == 'line-through') object.set('textDecoration','overline');
    else if (decor == 'overline') object.set('textDecoration','none');
    else object.set('textDecoration','underline');
    getTextFormatting(object,$(this),'textDecoration');
    document.activecanvas.renderAll();

    return false;

  });

   //change font
  $("#selectFont").change(function(){
    object = document.activecanvas.getActiveObject();
    object.set('fontFamily',$("#selectFont").val());
    document.activecanvas.renderAll();
  });

/********** This part needs to be updated with current html************/
  //update text
  $("input[name='updatetext']").keyup(function(){
    if ($("input[name='updatetext']").val().trim() != "") {
    document.activecanvas.getActiveObject().text = $("input[name='updatetext']").val();
    document.activecanvas.renderAll();
    }
  });
  $("input[name='updatetext']").change(function(){
    if ($("input[name='updatetext']").val().trim() != "") {
    docuemtn.activecanvas.getActiveObject().text = $("input[name='updatetext']").val();
    docuemtn.activecanvas.renderAll();
    }
  });
  //update text color attributes
  $("#textops .color").change(function(){
    var active = document.activecanvas.getActiveObject();
    if (active.type == 'i-text') {
      active.set('backgroundColor',$("#textops article input[name='updateback']").val());
      active.set('fill',$("#textops article input[name='updatefill']").val());
      active.set('stroke',$("#textops article input[name='updatestroke']").val());
      document.activecanvas.renderAll();
    }
  });

  // ********* End **************8

  //generic operations
  //remove

// remove should be in the layers

  // $(".remove").click(function(){
  //   removeObject();
  // });
  // //Flip operations - haven't been added to UI yet
 
  // $(".flipX").click(function(){
  //   flipObject(document.activecanvas.getActiveObject(),$(this),"flipX");
  // });
  // $(".flipY").click(function(){
  //   flipObject(document.activecanvas.getActiveObject(),$(this),"flipY");
  // });


  // //key operations
  $(document).keyup(function(e){
    if (e.which==46) {
      console.log("hi");
      if (!($("input").is(":focus")))
        removeObject();
    }
    if (e.which == 66 && e.ctrlKey) $(".bold").trigger("click");
    if (e.which == 73 && e.ctrlKey) $(".italic").trigger("click");
    if (e.which == 85 && e.ctrlKey) $(".textDecoration").trigger("click");
    
  });

  $(document).keydown(function(e){
    if (e.which == 37) $(moveLeft(document.activecanvas.getActiveObject()));
    else if (e.which == 38) $(moveUp(document.activecanvas.getActiveObject()));
    else if (e.which == 39) $(moveRight(document.activecanvas.getActiveObject()));
    else if (e.which == 40) $(moveDown(document.activecanvas.getActiveObject()));
    else
    {
      return true;
    }

    return false;
    // e.stopPropagation();

  })
  //select operations

// **** generic ops is important, but needs modified functions to work
// **** also, damn coder has replicated code for all canvases, modularize it
//Particular object selected
canvasfront.on('object:selected', function(object){
    object = object.target;
    objectops(object);
  });

//Object selection cleared
canvasfront.on('selection:cleared',function(){
    $(".poppable").slideUp('fast');
    $(".ops").removeClass('selected');
  });

  canvasfront.on('after:render', function() {
    getLayers();
  });




// ********* Image operations ****************//

//add an image object
  function addImage(url) {
    var img = new fabric.Image.fromURL(url, function (oImg) {
      oImg.scaleToWidth(225);
      document.activecanvas.add(oImg);
      var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
      document.activecanvas.setActiveObject(thisObj);
      thisObj.center();
      thisObj.setCoords();
      document.activecanvas.renderAll();
      $("ul#ops li article").slideUp('fast');
    });
  }

//render image from select
  function renderImage(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      the_url = event.target.result;
      addImage(the_url);
    }
    reader.readAsDataURL(file);
  }

  $("#addimg").click(function() {
    if ($("#imgtoadd")[0].files.length != 0) {
      for (var file in $("#imgtoadd")[0].files) {
        renderImage($("#imgtoadd")[0].files[file]);
      }
    }
    else {
      alert("Please Select one or more files");
      $("#imgtoadd").trigger("click");
    }
  });
  //auto trigger image add
  // $("#imgtoadd").change(function(){
  //   $("#addimg").trigger("click");
  // });

$(document).ready(function(){
  addText("hey");
  addText("hello");

});
  
