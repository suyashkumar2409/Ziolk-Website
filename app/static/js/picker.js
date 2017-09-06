// console.log('here');
var img = new Image();
img.src = 'http://127.0.0.1:5000/static/img/color-picker.png';
img.crossOrigin="anonymous";
var canvas = document.getElementById('hccp-FindCanvasColor');
var context = canvas.getContext('2d');
canvas.width = 396;
canvas.height = 360;

var canvasLeftOffset = canvas.offsetLeft;
var canvasTopOffset = canvas.offsetTop;
// draw image onto HTML5 canvas
img.onload = function() {
	console.log('happening');
// canvas.width = img.width;
// canvas.height = img.height;
console.log(img.width);
console.log(img.height);
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
$('#hccp-FindCanvasColor').on('mousemove click', function(event){
var x = event.pageX - canvasLeftOffset;
var y = event.pageY - canvasTopOffset;
// console.log(canvasLeftOffset);
var img_data = context.getImageData(x, y, 1, 1).data;
// console.log(img_data);
// console.log('img_data');

var R = img_data[0];
var G = img_data[1];
var B = img_data[2];
var rgb = 'rgb('+R+','+G+','+B+')';
var hex = RGBtoHex(R,G,B);
if(event.type=='mousemove') {
	// console.log('moving');
document.getElementById('hccp-hoverColorFont').style.color = hex;
document.getElementById('hccp-hoverColorBackground').style.backgroundColor = hex;
document.getElementById('hccp-hoverColorBackground').style.color = hex;
document.getElementById('hccp-hoverColorRGB').value = rgb;
document.getElementById('hccp-hoverColorHEX').value = hex;
} else if(event.type=='click') {
document.getElementById('hccp-clickColorFont').style.color = hex;
document.getElementById('hccp-clickColorBackground').style.backgroundColor = hex;
document.getElementById('hccp-clickColorBackground').style.color = hex;
document.getElementById('hccp-clickColorRGB').value = rgb;
document.getElementById('hccp-clickColorHEX').value = hex;
}
});
