!function(e,i){e(document).ready(function(){function t(){e(".mobile-item").each(function(i,t){e(this).attr("topv",e(this).position().top)}),e(".mobile-main-menu").scroll(function(){var i=parseInt(e(this).scrollTop());e(".mobile-main-ul li").each(function(){i+75>=parseInt(e(this).attr("topv"))&&(e(".mobile-main-ul li").css("opacity","0"),TweenLite.to(e(this).children("a"),.2,{fontSize:"41px"}),TweenLite.to(e(this).siblings().children("a"),.2,{fontSize:"26px"}),e(this).css("opacity","1").prev().css("opacity","0.6").prev().css("opacity","0.3"),e(this).next().css("opacity","0.8").next().css("opacity","0.6").next().css("opacity","0.4").next().css("opacity","0.2"),e(".mobile-indicator-item").removeClass("active-indicator"),e("[indicator-target="+e(this).children("a").attr("id")+"]").addClass("active-indicator"))})}),e(".mobile-main-menu").scrollTop(1)}var n=new TimelineMax,a=Power2.easeInOut;t(),e(window).resize(i.changed(function(){i.is("xs")&&t()},100)),e(".mobile-item").click(function(i){i.preventDefault();var t=e(this).find("a").attr("href");window.history.pushState(null,null,"/"+e(this).children("a").attr("href")),e("body").css("overflow-y","hidden");var s=e(".main-menu").find("#"+t);n.clear(),s.addClass("orange");var o=0;s.parent().siblings().each(function(){0==o?(n.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:a})),o++):n.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:a}),"-=0.45")}),n.add(TweenLite.set(s.next(),{height:"auto"})),n.add(TweenLite.from(s.next(),.5,{height:"0",ease:a}),"-=0.35")}),e(".mobile-close").click(function(i){i.preventDefault(),window.history.pushState(null,null,"/");var t=e(this).attr("data-id"),s=e(this).hasClass("utility");if(s)e(".modal#"+t).modal("hide");else{var o=e(".main-menu").find("#"+t).parent().find(".sub-close-icon");n.clear(),n.add(TweenLite.to(o.parent(".page-content"),.5,{height:"0",ease:a})),o.parent(".page-content").prev("a").removeClass("orange");var l=0;o.parents(".item").siblings().each(function(){0==l?(n.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"67px",ease:a})),l++):n.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"67px",ease:a}),"-=0.45")})}}),e(".mobile-item-side").click(function(i){i.preventDefault();var t=e(this).hasClass("utility");window.history.pushState(null,null,"/"+e(this).children("a").attr("href")),e(".close-icon").addClass("hidden"),e(".ham-icon").removeClass("hidden"),e("body").removeClass("nav-expanded");var s=e(this).find("a").attr("href").replace("utility/","");if(t)e(".modal#"+s).modal("show");else{!e(".main-menu").find("#"+s).hasClass("orange");var o=e(".main-menu").find("#"+s);n.clear(),o.addClass("orange");var l=0;o.parent().siblings().each(function(){0==l?(n.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:a})),l++):n.add(TweenLite.to(e(this).children("a"),.5,{fontSize:"20px",ease:a}),"-=0.45")}),n.add(TweenLite.set(o.next(),{height:"auto"})),n.add(TweenLite.from(o.next(),.5,{height:"0",ease:a}),"-=0.35")}}),e(".mobile-pop").click(function(){e(e(this).attr("data-target")).css("display","block")}),e(".mobile-pop-close").click(function(i){i.preventDefault(),e(e(this).attr("close-target")).css("display","none")}),jQuery("#brading-mobile-img-show").touchwipe({wipeLeft:function(){jQuery("#brading-mobile-img-show").carousel("next")},wipeRight:function(){jQuery("#brading-mobile-img-show").carousel("prev")},min_move_x:20,preventDefaultEvents:!1})})}(jQuery,ResponsiveBootstrapToolkit);