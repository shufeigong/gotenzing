
$(document).ready(function () {
	var isFirstClick=true;
	var itemArr = new Array();
	var timeLine = new TimelineLite();
	
	var link = location.pathname.split('/').pop();
	
	if(link!==""){
		var thisItem = $("[href="+link+"]");
		thisItem.addClass('orange');
			
			thisItem.parent().siblings().each(function(){
	  			itemArr.push($(this).children("a")); //push all brothers into itemArr
	  		});
			itemArr.push(thisItem);    //push itself into the last element in itemArr
			
	  		for(var i=0; i<itemArr.length-1; i++){
	  			if(i==0){
	  				timeLine.add(TweenLite.to(itemArr[i], 0.5, {"fontSize":"26px", ease: Power2.easeInOut}));
	  			}else{
	  				timeLine.add(TweenLite.to(itemArr[i], 0.5, {"fontSize":"26px", ease: Power2.easeInOut}), "-=0.45");
	  			}
	  		}
	  		
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
   	
   	
   	
	
   	$(".item a").click(function(){
   		
   		window.history.pushState(null, null, $(this).attr("href"));
   		   		
   		if(isFirstClick==true){
   			$(this).addClass('orange');
   			
   			$(this).parent().siblings().each(function(){
   	   			itemArr.push($(this).children("a")); //push all brothers into itemArr
   	   		});
   			itemArr.push($(this));    //push itself into the last element in itemArr
   			
   	   		for(var i=0; i<itemArr.length-1; i++){
   	   			if(i==0){
   	   				timeLine.add(TweenLite.to(itemArr[i], 0.5, {"fontSize":"26px", ease: Power2.easeInOut}));
   	   			}else{
   	   				timeLine.add(TweenLite.to(itemArr[i], 0.5, {"fontSize":"26px", ease: Power2.easeInOut}), "-=0.45");
   	   			}
   	   		}
   	   		
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
   	
   	
   	
   	
	
});

