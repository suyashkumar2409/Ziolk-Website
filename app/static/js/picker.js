// console.log('here');
var img = new Image();
img.src = 'http://127.0.0.1:5000/static/img/color-picker-small.jpg';
img.crossOrigin="anonymous";
var canvas = document.getElementById('hccp-FindCanvasColor');
var context = canvas.getContext('2d');
canvas.width = 258;
canvas.height = 235;

// $('#hccp-clickColorBackground').color = $('.well').parent().backgroundColor;

// var canvasLeftOffset = canvas.offsetLeft;
// var canvasTopOffset = canvas.offsetTop;

// console.log(canvasLeftOffset);
// draw image onto HTML5 canvas
img.onload = function() {
	console.log('happening');
// canvas.width = img.width;
// canvas.height = img.height;
// console.log(img.width);
// console.log(img.height);
context.drawImage(img,0,0);
};

// convert individual RGB components
function unitConversion(unit) {
var hexconv = unit.toString(16);
return hexconv.length == 1 ? '0' + hexconv : hexconv;
}

// convert RGB to Hex
function RGBtoHex(r, g, b) {
return "#" + unitConversion(r) + unitConversion(g) + unitConversion(b);
}

// find pixel color value on jQuery mousemove or click event
// use document.getElementById to return values to user and change CSS
$('#hccp-FindCanvasColor').on('mousedown', function(e){
var canvas = document.getElementById('hccp-FindCanvasColor');
var x, y;
  if(e.offsetX) {
        x = e.offsetX;
        y = e.offsetY;
    }
    else if(e.layerX) {
        x = e.layerX;
        y = e.layerY;
    }


// console.log(x + " " + y);
var img_data = context.getImageData(x, y, 1, 1).data;
// console.log(img_data);
// console.log('img_data');

var R = img_data[0];
var G = img_data[1];
var B = img_data[2];
var rgb = 'rgb('+R+','+G+','+B+')';
var hex = RGBtoHex(R,G,B);
// document.getElementById('hccp-clickColorFont').style.color = hex;
document.getElementById('hccp-clickColorBackground').style.backgroundColor = hex;
document.getElementById('hccp-clickColorBackground').style.color = hex;
// document.getElementById('hccp-clickColorRGB').value = rgb;
// document.getElementById('hccp-clickColorHEX').value = hex;

});
