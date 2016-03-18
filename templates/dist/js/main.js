!function(e,t){"use strict";function i(){e(".mobile-item").each(function(t,i){e(this).attr("topv",e(this).position().top)});var t=e(".mobile-main-menu");t.scroll(function(){var t=parseInt(e(this).scrollTop());e(".mobile-main-ul li").each(function(){t+75>=parseInt(e(this).attr("topv"))&&(e(".mobile-main-ul li").css("opacity","0"),TweenLite.to(e(this).children("a"),.2,{fontSize:"41px"}),TweenLite.to(e(this).siblings().children("a"),.2,{fontSize:"26px"}),e(this).css("opacity","1").prev().css("opacity","0.6").prev().css("opacity","0.3"),e(this).next().css("opacity","0.8").next().css("opacity","0.6").next().css("opacity","0.4").next().css("opacity","0.2"),e(".mobile-indicator-item").removeClass("active-indicator"),e("[indicator-target="+e(this).children("a").attr("id")+"]").addClass("active-indicator"))})}),t.scrollTop(1)}function n(){e(".main-menu ul > li.item").each(function(t,i){var n="#f7a800",a="#ffe0ae",o=e(i).find("> a"),s=(e(o).find(".grey"),new TimelineMax({paused:!0})),r=.2,l=Power2.easeInOut;s.to(o,r,{css:{color:n,scale:1.1},ease:l},"hover"),s.to(e(o).find(".grey"),r,{css:{color:a,scale:1.1},ease:l},"hover"),i.firstClickHoverAnimation=s;var c=new TimelineMax({paused:!0}),h="20px",d=0;e(i).siblings().each(function(t,i){var n=e(i).find("> a");0==d?(c.to(n,.5,{css:{fontSize:h,"line-height":"18px"},ease:l}),d++):c.to(n,.5,{css:{fontSize:h,"line-height":"18px"},ease:l},"-=0.45")}),c.set(e(o).next(),{height:"auto"}),c.from(e(o).next(),.5,{height:"0",ease:l},"-=0.35"),c.to(o,.5,{onComplete:function(){e(o).addClass("orange")}}),i.firstClickFontAnimation=c})}function a(){e(".main-menu ul > li.item").each(function(t,i){var n="#f7a800",a="#ffe0ae",o=e(i).find("> a"),s=(e(o).find(".grey"),new TimelineMax({paused:!0})),r=.2,l=Power2.easeInOut;s.to(o,r,{css:{color:n,scale:1.1},ease:l},"hover"),s.to(e(o).find(".grey"),r,{css:{color:a,scale:1.1},ease:l},"hover"),i.noFirstClickHoverAnimation=s;var c=new TimelineMax({paused:!0}),h="20px",d="#77777a",u="#b9b8ba",f=e(".item").find(".orange");c.to(f.next(),.5,{height:"0",ease:l},"cleanup");"engaging"===e(f).attr("id")||"integrating"===e(f).attr("id")||"spending"===e(f).attr("id");c.to(f,.5,{color:d,ease:l},"cleanup+=0.25"),c.to(f.find(".grey"),.5,{color:u,ease:l},"cleanup+=0.25"),c.to(e(".item .orange"),.5,{css:{"line-height":"18px"},ease:l},"feature"),e(i).siblings().each(function(t,i){var n=e(i).find("> a");e(n).hasClass("orange")&&(c.to(n,.5,{css:{fontSize:h,"line-height":"18px"},ease:l},"feature"),c.to(e(n).next(),.5,{height:"0",ease:l},"feature+=0.25"),e(n).removeClass("orange"))}),c.to(o,.5,{onComplete:function(){e(".item").find(".orange").removeClass("orange")}}),c.to(o,.5,{fontSize:"67px",ease:l},"feature"),c.set(e(o).next(),{height:"auto"}),c.from(e(o).next(),.5,{height:"0",ease:l},"feature+=0.25"),c.to(o,.5,{onComplete:function(){e(o).addClass("orange")}}),i.noFirstClickFontAnimation=c})}e.fn.imageWrapHeights=function(){var t,i,n,a=e(this).parent().prev(),o=e(this).closest(".sub-container"),s=(e(this).parent(),e(this).find(".image-item")),r=e(this).find(".image-container"),l=e(this).find(".image-wrap"),c=function(){if(t=a.outerHeight(),i=o.innerHeight()-10,e(window).width()<640)r.css({height:300}),l.css({height:300}),s.css({height:"auto"});else{var n=a.outerHeight()<250?250:i;r.css({height:n}),l.css({height:n}),e(".image-item").imageScale({fadeInDuration:.25})}};c(),e(window).on("resize orientationchange",function(){var e=a.outerHeight()<250?250:a.outerHeight()+20;r.css({height:e}),l.css({height:e}),n&&clearTimeout(n),n=setTimeout(c,250)})};e(window).load(function(){e(".sub-container").find(".imageVideo").each(function(){e(this).imageWrapHeights()})}),e.removeCookie("previousUrl",{path:"/"}),e.removeCookie("utilityMenuOpen"),e(document).ready(function(){window.isGalleryOpen=!1,n(),a(),e(".main-menu .page-content").find("a").attr("tabindex","-1");var o=!0,s=window.history.location||window.location,r=s.pathname.split("/").pop(),l=-1!==s.pathname.search("/utility/"),c=!1,h=new TimelineMax,d=Power2.easeInOut;if(window.addEventListener("popstate",function(){s.reload()}),e(window).resize(t.changed(function(){t.is("xs")},150)),e(".carousel.slide.subpage .carousel-control, .carousel.slide.popup, .carousel.slide.gallery").on("keyup",function(t){e(this).parent().find(".pressed").removeClass("pressed"),39==t.keyCode?e(this).parent().find(".right").focus().addClass("pressed"):37==t.keyCode&&e(this).parent().find(".left").focus().addClass("pressed")}),""===r||l)""!==r&&l&&(e(".arrow-down, .extension-header").slideDown(),e(".shadow-main").show(),e(".menuicon").addClass("is-active").parent("li").addClass("orange"),e(".div-exlist").find("#utility-"+r).addClass("selected"),e(".div-iconlist").find("#utility-"+r).parent().addClass("orange"),e(".modal#"+r).modal("show"),"gallery-legacy"==r&&showGallery());else{var u=e(".main-menu [href="+r+"]"),f=u.length>0;f||(s.href="/"),u.next().find("a").attr("tabindex","0"),u.next().find(".imgShow-div .pause-button").attr("tabindex","0"),u.addClass("orange"),"whoswho"!=r&&new LazyLoad({container:e(u).parent().find(".imgShow-div")[0],callback_load:function(){e(u).parent().find(".imgShow-div").find(".image-loading-icon").fadeOut(1e3),e(window).resize()}});var p=0;u.parent().siblings().each(function(){0==p?(h.to(e(this).children("a"),.5,{css:{fontSize:"20px"},ease:d}),p++):h.to(e(this).children("a"),.5,{css:{fontSize:"20px"},ease:d},"-=0.45")}),h.add(TweenLite.set(u.next(),{height:"auto"})),h.add(TweenLite.from(u.next(),.5,{height:"0",ease:d}),"-=0.35"),h.add(TweenLite.to(u.next().find("a"),.5,{onComplete:function(){u.next().addClass("is-active")}})),o=!1}e(".ham-icon").on("click",function(t){t.preventDefault(),e(this).toggleClass("is-active"),e("body").toggleClass("nav-expanded")}),e(".tile-item").hover(function(){TweenLite.to(e(this),.1,{scale:1.1})},function(){TweenLite.to(e(this),.1,{scale:1})});var g="#555555",m="#949494",w="#f7a800",v="#ffe0ae";e(".main-menu .item").children("a").hover(function(){return e(this).hasClass("orange")?!1:1==h.isActive()?!1:(TweenLite.to(e(this),.3,{scale:1.1,color:w}),void TweenLite.to(e(this).find(".grey"),.3,{color:v}))},function(){if(e(this).hasClass("orange"))return!1;if(1==h.isActive())return!1;var t=e(this).hasClass("grey");TweenLite.to(e(this),.3,{scale:1,color:t?m:g}),TweenLite.to(e(this).find(".grey"),.3,{color:m})}),e(".main-menu .item").children("a").click(function(){if(e(this).hasClass("orange"))return!1;if(1==h.isActive())return!1;var t=(e(this).parent()[0],this),i="#555555",n="#949494",a=e(".item .orange");if(e.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"+e(this).attr("href")),"whoswho"!=e(t).attr("id")&&new LazyLoad({container:e(t).parent().find(".imgShow-div")[0],callback_load:function(){e(t).parent().find(".imgShow-div").find(".image-loading-icon").fadeOut(),e(window).resize()}}),1==o){h.clear(),h.to(e(this),.25,{scale:1,ease:d});var s=0;e(this).parent().siblings().each(function(){0==s?(h.to(e(this).children("a"),.5,{css:{fontSize:"20px",scale:1},ease:d}),s++):h.to(e(this).children("a"),.5,{css:{fontSize:"20px",scale:1},ease:d},"-=0.45")}),h.add(TweenLite.set(e(this).next(),{height:"auto"}),"feature"),h.add(TweenLite.from(e(this).next(),.5,{height:"0",ease:d}),"feature-=0.35"),h.add(TweenLite.to(e(this).next(),.5,{onComplete:function(){e(t).next().addClass("is-active")}}),"feature"),e(this).addClass("orange"),o=!1}else{h.clear(),h.to(e(this),.25,{scale:1,ease:d}),h.to(a.next(),0,{onComplete:function(){a.next().removeClass("is-active")}},"cleanup"),h.to(a.next(),.5,{height:"0",ease:d},"cleanup+=0.5");var r=a,l="engaging"===e(r).attr("id")||"integrating"===e(r).attr("id")||"spending"===e(r).attr("id");l?h.to(r,.5,{color:n,ease:d},"cleanup+=0.25"):(h.to(r,.5,{color:i,ease:d},"cleanup+=0.25"),h.to(r.find(".grey"),.5,{color:n,ease:d},"cleanup+=0.25")),e(".item .orange").next().find("a").attr("tabindex","-1"),e(".item .orange").next().find(".imgShow-div .pause-button").attr("tabindex","-1"),e(this).parent().siblings().each(function(){e(this).children("a").hasClass("orange")&&(h.to(e(this).children("a"),.5,{fontSize:"20px",scale:1,ease:d},"feature"),h.to(e(this).children("a").next(),.5,{height:"0",scale:1,ease:d},"feature+=0.25"),e(this).children("a").removeClass("orange"))}),e(".item").find(".orange").removeClass("orange"),h.to(e(this),.5,{fontSize:"67px",ease:d},"feature"),h.add(TweenLite.set(e(this).next(),{height:"auto"})),h.add(TweenLite.from(e(this).next(),.5,{height:"0",ease:d}),"feature+=0.25"),h.to(e(this).next(),.5,{onComplete:function(){e(t).next().addClass("is-active")}},"feature"),e(this).addClass("orange")}e(t).next().find("a").attr("tabindex","0"),e(t).next().find(".imgShow-div .pause-button").attr("tabindex","0")}),e(".sub-close-icon").hover(function(){TweenMax.to(e(this),.1,{rotation:90,transformOrigin:"54% 52%",ease:Back.easeOut})},function(){TweenMax.to(e(this),.1,{rotation:0,transformOrigin:"54% 52%",ease:Back.easeOut})}),e(".sub-close-icon").click(function(t){var i="#77777a",n="#949494",a=e(this).parent(".page-content");t.preventDefault(),e.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"),h.clear(),h.to(a,0,{onComplete:function(){a.removeClass("is-active")}},"cleanup+=0.5"),h.to(a,.5,{height:"0",ease:d},"cleanup+=0.5");var s=e(".item .orange"),r="engaging"===e(s).attr("id")||"integrating"===e(s).attr("id")||"spending"===e(s).attr("id");r?h.to(s,.5,{color:n,ease:d},"cleanup+=0.25"):(h.to(s,.5,{color:i,ease:d},"cleanup+=0.25"),h.to(s.find(".grey"),.5,{color:n,ease:d},"cleanup+=0.25")),e(this).parent(".page-content").prev("a").removeClass("orange");var l=0;e(this).parents(".item").siblings().each(function(){0==l?(h.to(e(this).children("a"),.5,{css:{fontSize:"67px"},ease:d}),l++):h.to(e(this).children("a"),.5,{css:{fontSize:"67px"},ease:d},"-=0.45")}),e(this).parent(".page-content").find("a").attr("tabindex","-1"),e(this).parent(".page-content").find(".pause-button").attr("tabindex","-1"),o=!0}),i(),e(window).resize(t.changed(function(){t.is("xs")&&i()},100)),e(".mobile-item").click(function(t){t.preventDefault();var i=e(this).find("a").attr("href");window.history.pushState(null,null,"/"+e(this).children("a").attr("href")),c=!0,e(".main-menu").find("#"+i).click()}),e(".mobile-close").click(function(t){t.preventDefault(),window.history.pushState(null,null,"/"),c=!1;var i=e(this).attr("data-id");e(".main-menu").find("#"+i).parent().find(".page-content .sub-close-icon").click()}),e(".mobile-item-side").click(function(t){t.preventDefault();var i=e(this).find("a").attr("href").replace("utility/",""),n=e(this).hasClass("utility");n?window.history.pushState(null,null,"/utility/"+e(this).find("a").attr("href")):window.history.pushState(null,null,"/"+e(this).find("a").attr("href")),e(".close-icon").addClass("hidden"),e(".ham-icon").removeClass("hidden").removeClass("is-active"),e("body").removeClass("nav-expanded"),n?("gallery-legacy"==i&&(window.isGalleryOpen||showGallery()),e(".modal#"+i).modal("show")):e(".main-menu").find("#"+i).click()}),e(".mobile-pop").click(function(){e(e(this).attr("data-target")).show()}),e(".mobile-pop-close").click(function(t){t.preventDefault(),e(e(this).attr("close-target")).hide()}),e(".carousel-inner").swipe({swipeLeft:function(t,i,n,a,o){e(this).parent().carousel("next")},swipeRight:function(){e(this).parent().carousel("prev")}})})}(jQuery,ResponsiveBootstrapToolkit);