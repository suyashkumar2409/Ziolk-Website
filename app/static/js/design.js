
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

$(".toggleCaret").click(function (e){
	$(this).find('caret-right').toggleClass("caret-right caret")
	console.log($(this).first())
})

// Click front back left right
$('.custom-nav-pills li').mousedown(function(e){
	$('.custom-nav-pills li').each(function(i, obj){
		$(this).removeClass("pill-selected").addClass("pill-unselected");
	})

	$(this).toggleClass("pill-unselected pill-selected")
});
