// Reverse Engineered Content
$('.color-preview').click(function(){
		   var color = $(this).css("background-color");
		   document.getElementById("shirtDiv").style.backgroundColor = color;		   
	   });


function toggleArticle(self)
{
	if(! self.hasClass('selected'))
	{
		// console.log('not selected');
		  $(".ops").removeClass("selected");
		  self.addClass("selected");
		  $(".poppable").slideUp('fast');
		  self.parent().children(".poppable").slideDown('fast');
		  // console.log($(self).parent().children('.poppable'));
	}
	else
	{
		// console.log('here');
	  $(".ops").removeClass("selected");
  		$(".poppable").slideUp('fast');
	}
}

$(".ops").click(function(){
	// console.log('happening');

	toggleArticle($(this));	
});

$(".close").click(function()
{
	toggleArticle($(this).parent().children('selected'));
})


$("ul#ops li .close").click(function(e){
  e.stopPropagation();
  $(this).parent().slideUp('fast');
  $(this).parent().parent().removeClass("selected");
});


$("ul#ops li article").hover(function(e){
  e.stopPropagation();
});


$("ul#ops li article").click(function(e){
  e.stopPropagation();
});


$("li.sideselector").not(".active").click(function(){
  //$("li article").slideUp('fast');
  var side = $(this).attr("side");
  $("#main div").fadeOut(150);
  $("#main #"+side).delay(150).fadeIn(150);
  document.activecanvas = eval("canvas"+side);
  getLayers();
  $("li.sideselector.active").removeClass("active");
  $("li[side="+side+"]").addClass("active");
});

$("li#zoom").click(function(){
  $("li#zoom article").slideToggle('fast');
  $(this).toggleClass('active');
});

// *************** End of content

$(document).ready(function(){
	(function (){
			
		// var apiKey = "AIzaSyDBQLiWr7M6982EiWDayj2waQvh_O9GDqU";	
		var apiKey = loadJSON('http://127.0.0.1:5000/static/js/keys.json') ['google-fonts']
		var script = document.createElement('script');
		script.src = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey + '&callback=SetFonts';
		document.body.appendChild(script);


	})();
})

function SetFonts(fonts){
			var linkStr = "";
			var toBePushed = false;
			for (var i = 0; i < fonts.items.length; i++) {
				$('#selectFont')
				.append($("<option></option>")
				.attr("value", fonts.items[i].family)
				.attr("style", "font-family:" + "Roboto Sans MS")//fonts.items[i].family)
				.text(fonts.items[i].family));

				if(i%30 == 0)
				{
					if (i!= 0)	
					{
						linkStr = linkStr + fonts.items[i].family + ">";
						$("head")
						.append($(linkStr));

						// console.log(linkStr);

						toBePushed = false;
					}
					linkStr = '<link href="https://fonts.googleapis.com/css?family=';
					if(i==0)
					{
						toBePushed = true;
						linkStr = linkStr + fonts.items[i].family + '|';
					}
				}
				else
				{
					toBePushed = true;
					linkStr = linkStr + fonts.items[i].family + '|';
				}

			}

			if(toBePushed == true)
			{
				linkStr = linkStr + ">";
				$("head").append($(linkStr));
						// console.log(linkStr);
				
			}


			// $('selectFont option[value="1"]').attr("selected",true);
		}

// $(".toggleCaret").click(function (e){
// 	$(this).find('.caret-change').toggleClass("caret-right caret");
// 	// $(this).find('.caret').toggleClass("caret caret-right");
// 	// console.log($(this).find('.caret-right'));
// })

// Click front back left right
$('.custom-nav-pills li').mousedown(function(e){
	$('.custom-nav-pills li').each(function(i, obj){
		$(this).removeClass("pill-selected").addClass("pill-unselected");
	})

	$(this).toggleClass("pill-unselected pill-selected")
});

function changeView(elem)
{
	console.log('ha[[[');
	var imgName;

	$('#frontcanvas').css('display','none');
	$('#backcanvas').css('display','none');
	$('#leftcanvas').css('display','none');
	$('#rightcanvas').css('display','none');

	if( elem == 'frontview')
	{
		imgName = 'crew_front.png';
		document.activecanvas = canvasfront;
		// console.log($('#canvasfront'));
		$('#frontcanvas').css('display', 'block');
		console.log('frontview')
	}
	else if( elem == 'backview')
	{
		imgName = 'crew_back.png';
		document.activecanvas = canvasback;
		$('#backcanvas').css('display', 'block');
		console.log('backview')

		// $('#backcanvas').toggleClass('activeCanvas');

	}
	else if( elem == 'leftview')
	{
		imgName = 'crew_left.png';
		document.activecanvas = canvasleft;
		$('#leftcanvas').css('display', 'block');
		console.log('leftview')

		// $('#leftcanvas').toggleClass('activeCanvas');

	}
	else if( elem == 'rightview')
	{
		imgName = 'crew_right.png';
		document.activecanvas = canvasright;
		$('#rightcanvas').css('display', 'block');
		console.log('rightview')

		// $('#rightcanvas').toggleClass('activeCanvas');

	}
	else
	{
		imgName = 'crew_front.png';
		document.activecanvas = canvasfront;
		console.log('frontview')
	}
		
	console.log(document.activecanvas);	
	getLayers();
	var src = "/static/img/" + imgName;
	$("#tshirtFacing").attr('src', src);

	// updateCanvasView();
}

// console.log('hey');
$("#frontview").click(function(){
	changeView('frontview');
});
$("#backview").click(function(){
	changeView('backview');
});
$("#leftview").click(function(){
	changeView('leftview');
});
$("#rightview").click(function(){
	changeView('rightview');
});


$(document).ready(function(){
	// console.log($('#frontcanvas'))

	// set canvas displays
	$('#frontcanvas').css('display','visible');
	$('#backcanvas').css('display','none');
	$('#leftcanvas').css('display','none');
	$('#rightcanvas').css('display','none');
	console.log('yo');

	var options = "";


	var ctr = 1;
	for (var shirtType in algo)
	{
		options += "<option value = \"" + ctr + "\">" + shirtType + "</option>"
		ctr+=1; 
	}

		

	$('#selectProduct').html(options);

	updatePrice();
});

$('.total-effect').change(function(){
	// console.log($('#snum').val());
	var snum = Number($('#snum').val());
	var mnum = Number($('#mnum').val());
	var lnum = Number($('#lnum').val());
	var xlnum = Number($('#xlnum').val());
	var xxlnum = Number($('#xxlnum').val());
	// console.log(snum);
	var tot = snum + mnum + lnum + xlnum + xxlnum;
	$('#disabled-total').val(tot);

	updatePrice();
})
  

$("#selectProduct").change(function(){
	$("#shirtTypeLabel").html($("#selectProduct").find(":selected").text())
})

$("#saveDesign").click(function(){

	// First check if name can be used
	// then save object
	$.ajax({
            url: '/design/checkName',
            data: {'designName':$("#name-of-design").val()},
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            success: function(response) {
            	response = $.parseJSON(response)
                console.log(response);
                console.log(response['result']);

                if(response['result'] == 'True')
                {
                	console.log('hey')
                	var obj = {};
                	// var url = response['url']

					obj['name'] = $("#name-of-design").val();
					obj['canvasfront'] = JSON.stringify(canvasfront);
					obj['canvasback'] = JSON.stringify(canvasback);
					obj['canvasleft'] = JSON.stringify(canvasleft);
					obj['canvasright'] = JSON.stringify(canvasright);
					obj['snum'] = Number($('#snum').val());
					obj['mnum'] = Number($('#mnum').val());
					obj['lnum'] = Number($('#lnum').val());
					obj['xlnum'] = Number($('#xlnum').val());
					obj['xxlnum'] = Number($('#xxlnum').val());
					obj['shirtColor'] = $('#tshirtFacing').css('color');

					console.log(obj)
                	// $("#name-of-design").val('Yo!')
                	$.ajax({
                		url:'/design/custom/' + obj['name'],
                		data: JSON.stringify(obj),
                		type: 'POST',
            			contentType: 'application/json;charset=UTF-8',
            			success: function(response){
            				window.location.href = window.location.href + 'custom/' + obj['name']
            			},
            			error: function(error){
            				console.log(error);	
            			
            			}

                	})

	
                }
                else
                {
                	$("#name-of-design").val('That name has already been set!')
                }
            },
            error: function(error) {
                console.log(error);
                console.log('yo');
            }
        });
	// var obj;
	
})

function reRender(obj)
{
	console.log(obj['canvasfront']);


	canvasfront.loadFromJSON(obj['canvasfront']);
	canvasback.loadFromJSON( obj['canvasback']);
	canvasleft.loadFromJSON(obj['canvasleft']);
	canvasright.loadFromJSON(obj['canvasright']);

	$('#snum').val(obj['snum']);
	$('#mnum').val(obj['mnum']);
	$('#lnum').val(obj['lnum']);
	$('#xlnum').val(obj['xlnum']);
	$('#xxlnum').val(obj['xxlnum']);

	$('#tshirtFacing').css('color', obj['shirtColor']);

	getLayers();
	updatePrice();
	
}

// $('#layers-div').change(function(){
// 	updatePrice();
// })