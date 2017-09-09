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
    var oText = new fabric.IText(text, {left: 100, top: 150, editable: false});
    document.activecanvas.add(oText);
    var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
    document.activecanvas.setActiveObject(thisObj);
    thisObj.center();
    thisObj.setCoords();
    //console.log(thisObj.canvas.lowerCanvasEl.id);
    document.activecanvas.renderAll();
  }

  //  //sets the active object (see getLayer)
  // function layerOps(get) {
  //   document.activecanvas.setActiveObject(document.activecanvas.item(get));
  // }

  //   //layer list of active canvas
  // function getLayers() {
  //   var objects = document.activecanvas.getObjects();
  //   var layers = "";
  //   for (var object in objects) {
  //     var index = objects.length - object - 1;
  //     object = objects[index];
  //     var value;
  //     if (object.type == "i-text") value = object.text;
  //     else if (object.type == "image") value = object.width + " x " + object.height;
  //     else value = "&nbsp;<span class=\"layercolor\" style=\"background: "+object.fill+"; border: 3px solid "+(object.stroke || "transparent")+"\"></span>";
  //     if (object == document.activecanvas.getActiveObject())
  //       var li = "<li class=\"active\">"
  //     else
  //       var li = "<li>"
  //     layers += li;
  //     layers += "<span onclick=\"toggleVisible("+index+",'set')\">"+toggleVisible(index,'get')+"</span>";
  //     layers += "<label onclick=\"layerOps("+index+")\">" + object.type + " - " + value + "</label>";
  //     layers += "<div class=\"moveLayer\">";
  //     layers +=   "<a class=\"down\" onclick=\"moveBack("+index+")\">&#9652;</a>";
  //     layers +=   "<a class=\"up\" onclick=\"moveFront("+index+")\">&#9652;</a>";
  //     layers += "</div>\n";
  //   }
  //   $("#layers").html("<span>Layers on this side:</span>"+layers);
  // }

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
        return "";
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
      $("#textops").trigger('click');
      // $(".formatobject.active").removeClass("active");
      // $("#textops .formatobject").addClass("active");
      $("#textops article #texttoadd").val(object.text);
      // $("#textops article input[name='updatestrokewidth']").val(object.strokeWidth);
      $("#textops article #hccp-clickColorBackground").val(object.fill);
      // $("#textops article input[name='updatestroke']").val(object.stroke);
      // $("#textops article input[name='updateback']").val(object.backgroundColor);
    }
  }

  // ************** Event Listeners *************
  $("#addtext").click(function(){
    addText($("#texttoadd").val() || "text");
  });

  //text operations
  //make active text bold
  $("#bold").click(function(){
    object = document.activecanvas.getActiveObject();
    if (object.get('fontWeight')=='normal') object.set('fontWeight','bold');
    else object.set('fontWeight','normal');
    getTextFormatting(object,$(this),'fontWeight');
    document.activecanvas.renderAll();
  });


  //make active text italic
  $("#italic").click(function(){
    object = document.activecanvas.getActiveObject();
    if (object.get('fontStyle')=='normal') object.set('fontStyle','italic');
    else object.set('fontStyle','normal');
    getTextFormatting(object,$(this),'fontStyle');
    document.activecanvas.renderAll();
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
    if (e.which==8) {
      console.log("hi");
      if (!($("input").is(":focus")))
        removeObject();
    }
    if (e.which == 66 && e.ctrlKey) $(".bold").trigger("click");
    if (e.which == 73 && e.ctrlKey) $(".italic").trigger("click");
    if (e.which == 85 && e.ctrlKey) $(".textDecoration").trigger("click");
    if (e.which == 37) $(moveLeft(document.activecanvas.getActiveObject()));
    if (e.which == 38) $(moveUp(document.activecanvas.getActiveObject()));
    if (e.which == 39) $(moveRight(document.activecanvas.getActiveObject()));
    if (e.which == 40) $(moveDown(document.activecanvas.getActiveObject()));
  });
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