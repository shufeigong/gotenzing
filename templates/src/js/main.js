(function($) {
    // Reset cookie
    $.removeCookie('previousUrl', {'path': '/'});
    $.removeCookie("utilityMenuOpen");

    $(document).ready(function () {
        var isFirstClick = true;
        var timeLine = new TimelineLite();

        // Use polyfill for history
        var location = window.history.location || window.location;

        var link = location.pathname.split('/').pop();
        var isUtilityPage = location.pathname.search('/utility/');

        window.addEventListener('popstate', function () {
            location.reload();
        });
        if($(window).width()>640){//normal version relaod page
	        if (link !== "" && isUtilityPage == -1) {
	            var thisItem = $("[href=" + link + "]");
	            thisItem.addClass('orange');
	            var i = 0;
	            thisItem.parent().siblings().each(function () {
	                if (i == 0) {
	                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize": "20px", ease: Power2.easeInOut}));
	                    i++;
	                } else {
	                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
	                        "fontSize": "20px",
	                        ease: Power2.easeInOut
	                    }), "-=0.45");
	                }
	            });
	
	            timeLine.add(TweenLite.set(thisItem.next(), {height: "auto"}));
	            timeLine.add(TweenLite.from(thisItem.next(), 0.5, {"height": "0", ease: Power2.easeInOut}), "-=0.35");
	            isFirstClick = false;
	        } else if (link !== "" && isUtilityPage != -1) {
	            // If the page is utility page with the orange menu down
	            $(".arrow-down, .extension-header").slideDown();
	            $(".shadow-main").show();
	            $(".menuicon").parent("li").addClass('orange');
	
	            $('.div-exlist').find('#utility-' + link).addClass('selected');
	
	            $("#" + link).modal('show');
	        }
        }else{//mobile version reload page
        	
        	$("#"+link+"-mobile-page").addClass("in").css("display","block");	
        }
        /////main page extend menu///////
        $(".menuicon").click(function () {
            $(".arrow-down, .extension-header").slideToggle();
            $(".shadow-main").toggle();
            //$("#Layer_4 .st0").toggleClass('orange');
            $(this).parent("li").toggleClass('orange');
        });

        /////mobile swip menu/////
        $('.ham-icon').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');

            $('.close-icon').removeClass('hidden');
            $('.ham-icon').addClass('hidden');
        });
        $('.close-icon').on('click', function (e) {
            e.preventDefault();
            $('body').removeClass('nav-expanded');

            $('.close-icon').addClass('hidden');
            $('.ham-icon').removeClass('hidden');
        });

        //////main menu animation////
        var easeValue = Power2.easeInOut;

        $(".item").children("a").click(function () {
            $.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/" + $(this).attr("href"));//change url to be current subpage

            if (isFirstClick == true) {
                timeLine.clear();
                $(this).addClass('orange');
                var i = 0;
                $(this).parent().siblings().each(function () {
                    if (i == 0) {
                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "20px",
                            ease: easeValue
                        }));
                        i++;
                    } else {
                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "20px",
                            ease: easeValue
                        }), "-=0.45");
                    }
                });

                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");
                isFirstClick = false;
            } else {

                timeLine.clear();

                $(this).parent().siblings().each(function () {
                    if ($(this).children("a").hasClass("orange")) {

                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "20px",
                            ease: easeValue
                        }), "feature");
                        timeLine.add(TweenLite.to($(this).children("a").next(), 0.5, {
                            "height": "0",
                            ease: easeValue
                        }), "feature+=0.25");

                        $(this).children("a").removeClass("orange");
                    }
                });

                timeLine.add(TweenLite.to($(this), 0.5, {"fontSize": "67px", ease: easeValue}), "feature");
                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "feature+=0.25");

                $(this).addClass('orange');
            }
        });

        $(".sub-close-icon").click(function (e) {
            e.preventDefault();
            $.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/"); //change url to be homepage

            timeLine.clear();

            timeLine.add(TweenLite.to($(this).parent(".page-content"), 0.5, {"height": "0", ease: easeValue}));
            $(this).parent(".page-content").prev("a").removeClass("orange");

            var i = 0;
            $(this).parents(".item").siblings().each(function () {
                if (i == 0) {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize": "67px", ease: easeValue}));
                    i++;
                } else {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "fontSize": "67px",
                        ease: easeValue
                    }), "-=0.45");
                }

            });
            isFirstClick = true;
        });

        // Set push state for utility menu
        $('.div-exlist a').on('click', function () {
            $('.div-exlist a.selected').removeClass('selected');
            $(this).addClass('selected');

            if($.cookie('utilityMenuOpen') == null) {
                $.cookie("previousUrl", window.location.href, {path:"/"});
                $.cookie("utilityMenuOpen", true);
            }
            window.history.pushState(null, null, $(this).attr("id").replace('utility-', '/utility/'));
        });

        
        // Set push state for utility social icon menu
        $(".div-iconlist a").on('click', function(){
    
        	if($.cookie('utilityMenuOpen') == null) {
                $.cookie("previousUrl", window.location.href, {path:"/"});
                $.cookie("utilityMenuOpen", true);
            }
            window.history.pushState(null, null, $(this).attr("id").replace('utility-', '/utility/'));
        	
        	
        });
        
        
        
        
        $(".sub-img-container").imagefill();  
        $(".slide-container").imagefill();
        //$(".pop-img-container").imagefill();

        
//////////////////mobile scroll event//////////////
        //$(".mobile-main-ul li:first").css("opacity", "1").children("a").css("font-size", "41px").parent().next().css("opacity","0.8").next().css("opacity","0.6").next().css("opacity","0.4").next().css("opacity","0.2");
        
        $(".mobile-item").each(function(){
              $(this).attr('topv',$(this).position().top);
        });
        
        $(".mobile-main-menu").scroll(function(){
    		
        	var scroH = parseInt($(this).scrollTop());
        	
    	    	$(".mobile-main-ul li").each(function(){
    	    		if(scroH+75>=parseInt($(this).attr("topv"))){ 
    	    			$(".mobile-main-ul li").css("opacity","0");
    	    			
    	    			$(this).css("opacity","1").children("a").css("font-size", "41px").parent().siblings().children("a").css('font-size','26px');
    	    			
    	    			$(this).prev().css("opacity","0.6").prev().css("opacity", "0.3");
    	    			$(this).next().css("opacity","0.8").next().css("opacity","0.6").next().css("opacity","0.4").next().css("opacity","0.2");
    	    			
    	    			$(".mobile-indicator-item").removeClass("active-indicator");
    	    			
    	    			$("[indicator-target="+$(this).children("a").attr("id")+"]").addClass("active-indicator");
    	    		}
    	    	});
    			
    		});
        
        $(".mobile-main-menu").scrollTop(1);
 
////////mobile click event//////////////
        $("#brading-mobile-img-show").swiperight(function() {  
            $("#brading-mobile-img-show").carousel('prev');  
          });  
         $("#brading-mobile-img-showl").swipeleft(function() {  
            $("#brading-mobile-img-show").carousel('next');  
         });  
         
        //mobile main menu///////////
        $(".mobile-item").click(function(e){
        	e.preventDefault();
        	//$.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/" + $(this).children("a").attr("href"));//change url to be current subpage
            
            $("body").css("overflow-y","hidden");
        	$($(this).children("a").attr("data-target")).addClass("in").css("display","block");
        });
        
        
        $(".mobile-close").click(function(e){
        	e.preventDefault();
        	//$.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/"); //change url to be homepage
            
            //$("body").css("overflow-y","");
        	$($(this).attr("close-target")).removeClass("in").css("display","none");
        });
        
        //mobile site menu///////////
        $(".mobile-item-side").click(function(e){
        	e.preventDefault();
            window.history.pushState(null, null, "/" + $(this).children("a").attr("href"));//change url to be current subpage
            
            $(".mobile-modal").removeClass("in").css("display","none");//make other mobile modal hidden
        	$($(this).children("a").attr("data-target")).addClass("in").css("display","block");//popup this page modal
            $('.close-icon').addClass('hidden');// change page icon and open page
            $('.ham-icon').removeClass('hidden');
            $('body').removeClass('nav-expanded');
            
            
        });
        
        ////mobile pop photo modal////
        $(".mobile-pop").click(function(){
        	$($(this).attr("data-target")).css("display", "block");
        });
        
        $(".mobile-pop-close").click(function(e){
        	e.preventDefault();
        	$($(this).attr("close-target")).css("display", "none");
        });
        

    });
})(jQuery);


