$(document).ready(function () {
	//$("#page01").click(function(){
	//	window.history.pushState(null, null, "/Slim/content01");
	//    $("h1").html("Hello, My template content01");
	//});
	
	//$("#page02").click(function(){
	//	window.history.pushState(null, null, "/Slim/content02");
	//	$("h1").html("Hello, My template content02");
	//});
	
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
   	
   	var isFirstClick=true;
   	var itemArr = new Array();
	var timeLine = new TimelineLite();
	
   	$(".item").click(function(){
   	
   		if(isFirstClick==true){
   			$(this).children("a").addClass('orange');
   			
   			$(this).siblings().each(function(){
   	   			itemArr.push($(this).children("a")); //push all brothers into itemArr
   	   		});
   			itemArr.push($(this).children("a"));    //push itself into the last element in itemArr
   			
   	   		for(var i=0; i<itemArr.length-1; i++){
   	   			if(i==0){
   	   				timeLine.add(TweenLite.to(itemArr[i], 0.5, {"fontSize":"26px", ease: Power2.easeInOut}));
   	   			}else{
   	   				timeLine.add(TweenLite.to(itemArr[i], 0.5, {"fontSize":"26px", ease: Power2.easeInOut}), "-=0.45");
   	   			}
   	   		}
   	   		isFirstClick=false;
   		}else{
   			$(this).children("a").addClass('orange');
   			$(this).siblings().children("a").removeClass("orange");
   			
   		    for(var i=0; i<itemArr.length; i++){
   		    	if(itemArr[i].css("font-size")=="87px"){
   		    		TweenLite.to(itemArr[i], 0.5, {"fontSize":"26px", ease: Power2.easeInOut})
   		    	}
   		    }
   		    TweenLite.to($(this).children("a"), 0.5, {"fontSize":"87px", ease: Power2.easeInOut})
   		    
   		    
   		}
   		
   		
   	});
   	
   	
   	
   	
	
});

