// console.log('here');
var img = new Image();
	img.src = 'https://ziolk.herokuapp.com/static/img/color-picker-small.jpg';
	img.crossOrigin="anonymous";
	
img.onload = function()
{	
	$('.hccp-FindCanvasColor').each(function(i, obj){

		var canvas = $(this)[0];
		console.log($(this));
		var context = canvas.getContext('2d');
		canvas.width = 258;
		canvas.height = 235;

		// $('#text-color-bar').color = $('.well').parent().backgroundColor;

		// var canvasLeftOffset = canvas.offsetLeft;
		// var canvasTopOffset = canvas.offsetTop;

		// console.log(canvasLeftOffset);
		// draw image onto HTML5 canvas
		
		context.drawImage(img,0,0);
		

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
		$(this).on('mousedown', function(e){
		var canvas = $(this);
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
		console.log(img_data);
		// console.log('img_data');

		var R = img_data[0];
		var G = img_data[1];
		var B = img_data[2];
		var rgb = 'rgb('+R+','+G+','+B+')';
		var hex = RGBtoHex(R,G,B);
		// document.getElementById('hccp-clickColorFont').style.color = hex;
		// console.log($(this).parent().find('#text-color-bar'));
		$(this).parent().find('#text-color-bar').css("background-color", hex);
		$(this).parent().find('#text-color-bar').css("color", hex);
		
		changeColorActive(document.activecanvas.getActiveObject() , hex);
		// document.getElementById('text-color-bar').style.backgroundColor = hex;
		// document.getElementById('text-color-bar').style.color = hex;
		// document.getElementById('hccp-clickColorRGB').value = rgb;
		// document.getElementById('hccp-clickColorHEX').value = hex;

		});

	});
};