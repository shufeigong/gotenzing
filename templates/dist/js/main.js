!function(e,i){"use strict";function t(){e(".mobile-item").each(function(i,t){e(this).attr("topv",e(this).position().top)});var i=e(".mobile-main-menu");i.scroll(function(){var i=parseInt(e(this).scrollTop());e(".mobile-main-ul li").each(function(){i+75>=parseInt(e(this).attr("topv"))&&(e(".mobile-main-ul li").css("opacity","0"),TweenLite.to(e(this).children("a"),.2,{fontSize:"41px"}),TweenLite.to(e(this).siblings().children("a"),.2,{fontSize:"26px"}),e(this).css("opacity","1").prev().css("opacity","0.6").prev().css("opacity","0.3"),e(this).next().css("opacity","0.8").next().css("opacity","0.6").next().css("opacity","0.4").next().css("opacity","0.2"),e(".mobile-indicator-item").removeClass("active-indicator"),e("[indicator-target="+e(this).children("a").attr("id")+"]").addClass("active-indicator"))})}),i.scrollTop(1)}function n(){e(".main-menu ul > li.item").each(function(i,t){var n="#f7a800",a="#ffe0ae",o=e(t).find("> a"),s=(e(o).find(".grey"),new TimelineMax({paused:!0})),r=67,l=3,c=.2,h=Power2.easeInOut;s.to(o,c,{css:{color:n,fontSize:r+l+"px"},ease:h},"hover"),s.to(e(o).find(".grey"),c,{css:{color:a},ease:h},"hover"),t.firstClickAnimation=s;var d=new TimelineMax({paused:!0}),u="20px",f=0;e(t).siblings().each(function(i,t){var n=e(t).find("> a");0==f?(d.to(n,.5,{css:{fontSize:u,"line-height":"18px"},ease:h}),f++):d.to(n,.5,{css:{fontSize:u,"line-height":"18px"},ease:h},"-=0.45")}),d.set(e(o).next(),{height:"auto"}),d.from(e(o).next(),.5,{height:"0",ease:h},"-=0.35"),d.to(o,.5,{onComplete:function(){e(o).addClass("orange")}}),t.firstClickFontAnimation=d})}function a(){e(".main-menu ul > li.item").each(function(i,t){var n="#f7a800",a="#ffe0ae",o=e(t).find("> a"),s=(e(o).find(".grey"),new TimelineMax({paused:!0})),r=20,l=3,c=.2,h=Power2.easeInOut;s.to(o,c,{css:{color:n,fontSize:r+l+"px"},ease:h},"hover"),s.to(e(o).find(".grey"),c,{css:{color:a},ease:h},"hover"),t.noFirstClickAnimation=s;var d=new TimelineMax({paused:!0}),u="20px",f="#77777a",p="#b9b8ba",g=e(".item").find(".orange");d.to(g.next(),.5,{height:"0",ease:h},"cleanup");"engaging"===e(g).attr("id")||"integrating"===e(g).attr("id")||"spending"===e(g).attr("id");d.to(g,.5,{color:f,ease:h},"cleanup+=0.25"),d.to(g.find(".grey"),.5,{color:p,ease:h},"cleanup+=0.25"),d.to(e(".item .orange"),.5,{css:{"line-height":"18px"},ease:h},"feature"),e(t).siblings().each(function(i,t){var n=e(t).find("> a");e(n).hasClass("orange")&&(d.to(n,.5,{css:{fontSize:u,"line-height":"18px"},ease:h},"feature"),d.to(e(n).next(),.5,{height:"0",ease:h},"feature+=0.25"),e(n).removeClass("orange"))}),d.to(o,.5,{onComplete:function(){e(".item").find(".orange").removeClass("orange")}}),d.to(o,.5,{fontSize:"67px",ease:h},"feature"),d.set(e(o).next(),{height:"auto"}),d.from(e(o).next(),.5,{height:"0",ease:h},"feature+=0.25"),d.to(o,.5,{onComplete:function(){e(o).addClass("orange")}}),t.noFirstClickFontAnimation=d})}e.fn.carouselHeights=function(){var i,t,n,a=e(this).find(".item"),o=[],s=[],r=function(){a.each(function(){o.push(e(this).outerHeight()),s.push(e(this).outerWidth())}),i=Math.max.apply(null,o),t=Math.max.apply(null,s),a.css({height:i})};r(),e(window).on("resize orientationchange",function(){i=0,o.length=0,a.css("height",""),n&&clearTimeout(n),n=setTimeout(r,100)})},e.removeCookie("previousUrl",{path:"/"}),e.removeCookie("utilityMenuOpen"),e(window).load(function(){e(".carousel.subpage, .carousel.mobile").each(function(){e(this).carouselHeights()})}),e(document).ready(function(){window.isGalleryOpen=!1,n(),a(),e(".main-menu .page-content").find("a").attr("tabindex","-1");var o=!0,s=window.history.location||window.location,r=s.pathname.split("/").pop(),l=-1!==s.pathname.search("/utility/"),c=!1,h=new TimelineMax({onComplete:function(){e(".entry-content .main-menu li.item").each(function(){var i=e(this).find("> a").css("font-size");"67px"==i||"70px"==i?e(this).find("> a").css("line-height","60px"):e(this).find("> a").css("line-height","18px")})}}),d=Power2.easeInOut;if(window.addEventListener("popstate",function(){s.reload()}),e(window).resize(i.changed(function(){i.is("xs")},150)),""===r||l)""!==r&&l&&(e(".arrow-down, .extension-header").slideDown(),e(".shadow-main").show(),e(".menuicon").addClass("is-active").parent("li").addClass("orange"),e(".div-exlist").find("#utility-"+r).addClass("selected"),e(".div-iconlist").find("#utility-"+r).parent().addClass("orange"),e(".modal#"+r).modal("show"),"gallery-legacy"==r&&showGallery());else{var u=e("[href="+r+"]"),f=u.length>0;f||(s.href="/"),u.next().find("a").attr("tabindex","0"),u.addClass("orange");var p=0;u.parent().siblings().each(function(){0==p?(h.to(e(this).children("a"),.5,{css:{fontSize:"20px"},ease:d}),p++):h.to(e(this).children("a"),.5,{css:{fontSize:"20px"},ease:d},"-=0.45")}),h.add(TweenLite.set(u.next(),{height:"auto"})),h.add(TweenLite.from(u.next(),.5,{height:"0",ease:d}),"-=0.35"),o=!1}e(".modal#"+r+"-mobile-page").modal("show"),e(".menuicon").click(function(){e(this).toggleClass("is-active"),e(".arrow-down, .extension-header").slideToggle(),e(".shadow-main").toggle(),e(this).parent("li").toggleClass("orange")}),e(".ham-icon").on("click",function(i){i.preventDefault(),e(this).toggleClass("is-active"),e("body").toggleClass("nav-expanded")}),e(".main-menu .item").children("a").hover(function(){if(e(this).hasClass("orange"))return!1;if(1==h.isActive())return!1;var i=e(this).parent()[0];o?i.firstClickAnimation.play():i.noFirstClickAnimation.play()},function(){if(e(this).hasClass("orange"))return!1;if(1==h.isActive())return!1;var i=e(this).parent()[0];o?i.firstClickAnimation.reverse():i.noFirstClickAnimation.reverse()}),e(".main-menu .item").children("a").click(function(){if(e(this).hasClass("orange"))return!1;var i=(e(this).parent()[0],this),t="#77777a",n="#949494";if(e(".mobile-content").find(".modal.mobile-modal.in").modal("hide"),e.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"+e(this).attr("href")),1==o){h.clear();var a=0;e(this).parent().siblings().each(function(){0==a?(h.to(e(this).children("a"),.5,{css:{fontSize:"20px","line-height":"18px"},ease:d}),a++):h.to(e(this).children("a"),.5,{css:{fontSize:"20px","line-height":"18px"},ease:d},"-=0.45")}),h.add(TweenLite.set(e(this).next(),{height:"auto"})),h.add(TweenLite.from(e(this).next(),.5,{height:"0",ease:d}),"-=0.35"),e(this).addClass("orange"),o=!1}else{h.clear(),h.to(e(".item .orange").next(),.5,{height:"0",ease:d},"cleanup");var s=e(".item .orange"),r="engaging"===e(s).attr("id")||"integrating"===e(s).attr("id")||"spending"===e(s).attr("id");r?h.to(s,.5,{color:n,ease:d},"cleanup+=0.25"):(h.to(s,.5,{color:t,ease:d},"cleanup+=0.25"),h.to(s.find(".grey"),.5,{color:n,ease:d},"cleanup+=0.25")),h.to(e(".item .orange"),.5,{css:{"line-height":"18px"},ease:d},"feature"),e(".item .orange").next().find("a").attr("tabindex","-1"),e(this).parent().siblings().each(function(){e(this).children("a").hasClass("orange")&&(h.to(e(this).children("a"),.5,{fontSize:"20px",ease:d},"feature"),h.to(e(this).children("a").next(),.5,{height:"0",ease:d},"feature+=0.25"),e(this).children("a").removeClass("orange"))}),e(".item").find(".orange").removeClass("orange"),h.to(e(this),.5,{css:{"line-height":"60px"},ease:d},"feature"),h.to(e(this),.5,{fontSize:"67px",ease:d},"feature"),h.add(TweenLite.set(e(this).next(),{height:"auto"})),h.add(TweenLite.from(e(this).next(),.5,{height:"0",ease:d}),"feature+=0.25"),e(this).addClass("orange")}if(e(i).next().find("a").attr("tabindex","0"),!c){var l=e(this).attr("id");e("#"+l+"-mobile-page").modal("show")}}),e(".sub-close-icon").click(function(i){var t="#77777a",n="#949494";i.preventDefault(),e.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"),h.clear(),h.to(e(this).parent(".page-content"),.5,{height:"0",ease:d},"cleanup");var a=e(".item .orange"),s="engaging"===e(a).attr("id")||"integrating"===e(a).attr("id")||"spending"===e(a).attr("id");s?h.to(a,.5,{color:n,ease:d},"cleanup+=0.25"):(h.to(a,.5,{color:t,ease:d},"cleanup+=0.25"),h.to(a.find(".grey"),.5,{color:n,ease:d},"cleanup+=0.25")),e(this).parent(".page-content").prev("a").removeClass("orange");var r=0;e(this).parents(".item").siblings().each(function(){0==r?(h.to(e(this).children("a"),.5,{css:{fontSize:"67px","line-height":"60px"},ease:d}),r++):h.to(e(this).children("a"),.5,{css:{fontSize:"67px","line-height":"60px"},ease:d},"-=0.45")}),e(this).parent(".page-content").find("a").attr("tabindex","-1");var l=e(this).closest("li.item").find("a").attr("id");e("#"+l+"-mobile-page").modal("hide"),o=!0}),t(),e(window).resize(i.changed(function(){i.is("xs")&&t()},100)),e(".mobile-item").click(function(i){i.preventDefault();var t=e(this).find("a").attr("href");window.history.pushState(null,null,"/"+e(this).children("a").attr("href")),e("body").css("overflow-y","hidden"),c=!0,e(".main-menu").find("#"+t).click()}),e(".mobile-close").click(function(i){i.preventDefault(),window.history.pushState(null,null,"/"),c=!1;var t=e(this).attr("data-id");e(".main-menu").find("#"+t).parent().find(".page-content .sub-close-icon").click()}),e(".mobile-item-side").click(function(i){i.preventDefault();var t=e(this).find("a").attr("href").replace("utility/",""),n=e(this).hasClass("utility");n?window.history.pushState(null,null,"/utility/"+e(this).find("a").attr("href")):window.history.pushState(null,null,"/"+e(this).find("a").attr("href")),e(".close-icon").addClass("hidden"),e(".ham-icon").removeClass("hidden"),e("body").removeClass("nav-expanded"),n?("gallery-legacy"==t&&(window.isGalleryOpen||showGallery()),e(".modal#"+t).modal("show")):e(".main-menu").find("#"+t).click()}),e(".mobile-pop").click(function(){e(e(this).attr("data-target")).show()}),e(".mobile-pop-close").click(function(i){i.preventDefault(),e(e(this).attr("close-target")).hide()}),e(".carousel-inner").swipe({swipeLeft:function(i,t,n,a,o){e(this).parent().carousel("next")},swipeRight:function(){e(this).parent().carousel("prev")}})})}(jQuery,ResponsiveBootstrapToolkit);