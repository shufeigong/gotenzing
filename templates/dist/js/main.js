!function(e){e.removeCookie("previousUrl",{path:"/"}),e.removeCookie("utilityMenuOpen"),e(document).ready(function(){var i=!0,t=new TimelineLite,n=window.history.location||window.location,a=n.pathname.split("/").pop(),s=n.pathname.search("/utility/");if(window.addEventListener("popstate",function(){n.reload()}),e(window).width()>640)if(""!==a&&-1==s){var o=e("[href="+a+"]");o.addClass("orange");var l=0;o.parent().siblings().each(function(){0==l?(t.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:Power2.easeInOut})),l++):t.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:Power2.easeInOut}),"-=0.45")}),t.add(TweenLite.set(o.next(),{height:"auto"})),t.add(TweenLite.from(o.next(),.5,{height:"0",ease:Power2.easeInOut}),"-=0.35"),i=!1}else""!==a&&-1!=s&&(e(".arrow-down, .extension-header").slideDown(),e(".shadow-main").show(),e(".menuicon").parent("li").addClass("orange"),e(".div-exlist").find("#utility-"+a).addClass("selected"),e("#"+a).modal("show"));else e("#"+a+"-mobile-page").addClass("in").css("display","block");e(".menuicon").click(function(){e(".arrow-down, .extension-header").slideToggle(),e(".shadow-main").toggle(),e(this).parent("li").toggleClass("orange")}),e(".ham-icon").on("click",function(i){i.preventDefault(),e("body").toggleClass("nav-expanded"),e(".close-icon").removeClass("hidden"),e(".ham-icon").addClass("hidden")}),e(".close-icon").on("click",function(i){i.preventDefault(),e("body").removeClass("nav-expanded"),e(".close-icon").addClass("hidden"),e(".ham-icon").removeClass("hidden")});var d=Power2.easeInOut;e(".item").children("a").click(function(){if(e.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"+e(this).attr("href")),1==i){t.clear(),e(this).addClass("orange");var n=0;e(this).parent().siblings().each(function(){0==n?(t.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:d})),n++):t.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:d}),"-=0.45")}),t.add(TweenLite.set(e(this).next(),{height:"auto"})),t.add(TweenLite.from(e(this).next(),.5,{height:"0",ease:d}),"-=0.35"),i=!1}else t.clear(),e(this).parent().siblings().each(function(){e(this).children("a").hasClass("orange")&&(t.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:d}),"feature"),t.add(TweenLite.to(e(this).children("a").next(),.5,{height:"0",ease:d}),"feature+=0.25"),e(this).children("a").removeClass("orange"))}),t.add(TweenLite.to(e(this),.5,{fontSize:"67px",ease:d}),"feature"),t.add(TweenLite.set(e(this).next(),{height:"auto"})),t.add(TweenLite.from(e(this).next(),.5,{height:"0",ease:d}),"feature+=0.25"),e(this).addClass("orange")}),e(".sub-close-icon").click(function(n){n.preventDefault(),e.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"),t.clear(),t.add(TweenLite.to(e(this).parent(".page-content"),.5,{height:"0",ease:d})),e(this).parent(".page-content").prev("a").removeClass("orange");var a=0;e(this).parents(".item").siblings().each(function(){0==a?(t.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"67px",ease:d})),a++):t.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"67px",ease:d}),"-=0.45")}),i=!0}),e(".div-exlist a").on("click",function(){e(".div-exlist a.selected").removeClass("selected"),e(this).addClass("selected"),null==e.cookie("utilityMenuOpen")&&(e.cookie("previousUrl",window.location.href,{path:"/"}),e.cookie("utilityMenuOpen",!0)),window.history.pushState(null,null,e(this).attr("id").replace("utility-","/utility/"))}),e(".div-iconlist a").on("click",function(){null==e.cookie("utilityMenuOpen")&&(e.cookie("previousUrl",window.location.href,{path:"/"}),e.cookie("utilityMenuOpen",!0)),window.history.pushState(null,null,e(this).attr("id").replace("utility-","/utility/"))}),e(".sub-img-container").imagefill(),e(".slide-container").imagefill(),e(".mobile-item").each(function(){e(this).attr("topv",e(this).position().top)}),e(".mobile-main-menu").scroll(function(){var i=parseInt(e(this).scrollTop());e(".mobile-main-ul li").each(function(){i+75>=parseInt(e(this).attr("topv"))&&(e(".mobile-main-ul li").css("opacity","0"),e(this).css("opacity","1").children("a").css("font-size","41px").parent().siblings().children("a").css("font-size","26px"),e(this).prev().css("opacity","0.6").prev().css("opacity","0.3"),e(this).next().css("opacity","0.8").next().css("opacity","0.6").next().css("opacity","0.4").next().css("opacity","0.2"),e(".mobile-indicator-item").removeClass("active-indicator"),e("[indicator-target="+e(this).children("a").attr("id")+"]").addClass("active-indicator"))})}),e(".mobile-main-menu").scrollTop(1),e(".mobile-item").click(function(i){i.preventDefault(),window.history.pushState(null,null,"/"+e(this).children("a").attr("href")),e(e(this).children("a").attr("data-target")).addClass("in").css("display","block")}),e(".mobile-close").click(function(i){i.preventDefault(),window.history.pushState(null,null,"/"),e(e(this).attr("close-target")).removeClass("in").css("display","none")}),e(".mobile-item-side").click(function(i){i.preventDefault(),window.history.pushState(null,null,"/"+e(this).children("a").attr("href")),e(".mobile-modal").removeClass("in").css("display","none"),e(e(this).children("a").attr("data-target")).addClass("in").css("display","block"),e(".close-icon").addClass("hidden"),e(".ham-icon").removeClass("hidden"),e("body").removeClass("nav-expanded")})})}(jQuery);