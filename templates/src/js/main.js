
$(document).ready(function () {
	var isFirstClick=true;
	
	var timeLine = new TimelineLite();
	
	
	var link = location.pathname.split('/').pop();
	
	window.addEventListener('popstate', function (e) {location.reload();});
	
	
	if(link!==""){
		var thisItem = $("[href="+link+"]");
		thisItem.addClass('orange');
			   var i=0;
			thisItem.parent().siblings().each(function(){
	  			if(i==0){
	  				timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize":"26px", ease: Power2.easeInOut})); i++;
	  			}else{
	  				timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize":"26px", ease: Power2.easeInOut}), "-=0.45");
	  			}
	  		});
	  		
	  		timeLine.add(TweenLite.set(thisItem.next(),{height:"auto"}));
	  		timeLine.add(TweenLite.from(thisItem.next(), 0.5, {"height":"0", ease: Power2.easeInOut}), "-=0.35");
	  		isFirstClick=false;
	}
	
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
   	
   	
   	
	
   	$(".item").children("a").click(function(){
   		
   		window.history.pushState(null, null, $(this).attr("href"));
   		   		
   		if(isFirstClick==true){
   			timeLine.clear();
   			$(this).addClass('orange');
   			var i=0;
   			$(this).parent().siblings().each(function(){
   				if(i==0){
   	   				timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize":"26px", ease: Power2.easeInOut})); i++;
   	   			}else{
   	   				timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize":"26px", ease: Power2.easeInOut}), "-=0.45");
   	   			}
   	   		});
   	   		
   	   		timeLine.add(TweenLite.set($(this).next(),{height:"auto"}));
   	   		timeLine.add(TweenLite.from($(this).next(), 0.5, {"height":"0", ease: Power2.easeInOut}), "-=0.35");
   	   		isFirstClick=false;
   		}else{
   			
   			timeLine.clear();
   			
   			$(this).parent().siblings().each(function(){
   				if($(this).children("a").hasClass("orange")){
   					
   					timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize":"26px", ease: Power2.easeInOut}),"feature");    
   			        timeLine.add(TweenLite.to($(this).children("a").next(), 0.5, {"height":"0", ease: Power2.easeInOut}), "feature+=0.25");
   			        
   			        $(this).children("a").removeClass("orange");
   				}
   			});
   			
   			timeLine.add(TweenLite.to($(this), 0.5, {"fontSize":"87px", ease: Power2.easeInOut}), "feature");
   			timeLine.add(TweenLite.set($(this).next(),{height:"auto"}));
   			timeLine.add(TweenLite.from($(this).next(), 0.5, {"height":"0", ease: Power2.easeInOut}), "feature+=0.25");
   			
   			$(this).addClass('orange');
   		    
   		    
   		}
   		
   		
   	});
   	
   	$(".sub-close-icon").click(function(e){
   		e.preventDefault();
   		window.history.pushState(null, null, "/"); //change url to be homepage
   		
   		timeLine.clear();
   		
   		timeLine.add(TweenLite.to($(this).parent(".page-content"), 0.5, {"height":"0", ease: Power2.easeInOut}) );
   		$(this).parent(".page-content").prev("a").removeClass("orange");
   		
   		var i=0;
   		$(this).parents(".item").siblings().each(function(){
   			    if(i==0){
   			    	timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize":"87px", ease: Power2.easeInOut})); i++; 
   			    }else{
   			    	timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize":"87px", ease: Power2.easeInOut}), "-=0.45");    
   			    }
   			    
			});
   		
   		isFirstClick=true;
   		
   	});
   	
   	
	
});

