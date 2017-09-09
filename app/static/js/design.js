// Reverse Engineered Content
$(".ops").click(function(){
	console.log('happening');
  $(".ops").removeClass("selected");
  $(this).addClass("selected");
  $(".poppable").slideUp('fast');
  $(this).children(".poppable").slideDown('fast');
});


$(".ops .selected").click(function(){
  $(".ops").removeClass("selected");
  $(".poppable").slideUp('fast');
});


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
			
		
		var apiKey = "AIzaSyAyRpungWO-WbGigyZL0SbBEMj0H40Rvbg";	
		// var apiKey = loadJSON('js/keys.json') ['google-fonts']
		var script = document.createElement('script');
		script.src = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey + '&callback=SetFonts';
		document.body.appendChild(script);


	})();
})

function SetFonts(fonts){

			for (var i = 0; i < fonts.items.length; i++) {
				$('#selectFont')
				.append($("<option></option>")
				.attr("value", fonts.items[i].family)
				.text(fonts.items[i].family));
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
