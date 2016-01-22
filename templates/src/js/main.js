$(document).ready(function () {
	$("#page01").click(function(){
		window.history.pushState(null, null, "/Slim/content01");
	    $("h1").html("Hello, My template content01");
	});
	
	$("#page02").click(function(){
		window.history.pushState(null, null, "/Slim/content02");
		$("h1").html("Hello, My template content02");
	});
	
	/////main page extend menu///////
	$(".menuicon").click(function(){
		$(".arrow-down, .extension-header").slideToggle();
		$(".shadow-main").toggle();
		//$("#Layer_4 .st0").toggleClass('orange');
		$(this).parent("li").toggleClass('orange');
	});

	/////mobile swip menu/////
	 $('.ham-icon').on('click',function(e){
   		e.preventDefault();
   		$('body').toggleClass('nav-expanded');
   		
   		$('.close-icon').removeClass('hidden');
   		$('.ham-icon').addClass('hidden');
   	});
   	$('.close-icon').on('click',function(e){
   		e.preventDefault();
   		$('body').removeClass('nav-expanded');
   		
   		$('.close-icon').addClass('hidden');
   		$('.ham-icon').removeClass('hidden');
   	});
   	
   	//////main menu animation////
   	//var a =$("#page01");
   	//var b=$("site-logo");
   	//TweenLite.from(a, 1, {"fontSize":"87px", "color":"orange", ease: Linear.easeNone});
   	$(".item").click(function(){
   		var a = $(".item");
   		TweenLite.to(a, 1, {"fontSize":"26px", ease: Linear.easeNone});
   	});
   	
   	
   	
   	
	
});

