!function(e,i){"use strict";function t(){e(".mobile-item").each(function(i,t){e(this).attr("topv",e(this).position().top)});var i=e(".mobile-main-menu");i.scroll(function(){var i=parseInt(e(this).scrollTop());e(".mobile-main-ul li").each(function(){i+75>=parseInt(e(this).attr("topv"))&&(e(".mobile-main-ul li").css("opacity","0"),TweenLite.to(e(this).children("a"),.2,{fontSize:"41px"}),TweenLite.to(e(this).siblings().children("a"),.2,{fontSize:"26px"}),e(this).css("opacity","1").prev().css("opacity","0.6").prev().css("opacity","0.3"),e(this).next().css("opacity","0.8").next().css("opacity","0.6").next().css("opacity","0.4").next().css("opacity","0.2"),e(".mobile-indicator-item").removeClass("active-indicator"),e("[indicator-target="+e(this).children("a").attr("id")+"]").addClass("active-indicator"))})}),i.scrollTop(1)}e.fn.imageWrapHeights=function(){var i,t,n,a=e(this).parent().prev(),s=e(this).closest(".sub-container"),o=(e(this).parent(),e(this).find(".image-item")),r=e(this).find("iframe"),d=e(this).find(".image-container"),l=e(this).find(".image-wrap"),c=function(){if(i=a.outerHeight(),t=s.innerHeight()-10,e(window).width()<640){d.css({height:300}),l.css({height:300}),o.css({height:"auto"});var n=a.outerHeight()<250?250:t;r.css({width:16*n/9,height:n})}else{var n=a.outerHeight()<250?250:t;d.css({height:n}),l.css({height:n}),r.css({width:16*n/9-30,height:n})}e(".image-item").imageScale({})};c(),e(window).on("resize orientationchange",function(){var e=a.outerHeight()<250?250:a.outerHeight()+20;d.css({height:e}),l.css({height:e}),n&&clearTimeout(n),n=setTimeout(c,0)})},e(window).load(function(){e(".sub-container").find(".imageVideo").each(function(){e(this).imageWrapHeights()})}),e.removeCookie("previousUrl",{path:"/"}),e.removeCookie("utilityMenuOpen"),e(document).ready(function(){window.isGalleryOpen=!1,e(".main-menu .page-content").find("a").attr("tabindex","-1");var n,a=!0,s=window.history.location||window.location,o=s.pathname.split("/").pop(),r=-1!==s.pathname.search("/utility/"),d=!1,l=new TimelineMax,c=new TimelineMax({repeat:-1,repeatDelay:5,yoyo:!0}),h=["surprising","serving","spending"],f=["branding","engaging","humanchanneling","integrating","orienteering","positioning"],p=0,u=Power2.easeInOut;if(window.addEventListener("popstate",function(){s.reload()}),e(window).resize(i.changed(function(){i.is("xs")},150)),e(".carousel.slide.popup, .carousel.slide.gallery").on("keyup",function(i){e(this).parent().find(".pressed").removeClass("pressed"),39==i.keyCode?e(this).parent().find(".right").focus().addClass("pressed"):37==i.keyCode&&e(this).parent().find(".left").focus().addClass("pressed")}),""===o||r)""!==o&&r&&(e(".arrow-down, .extension-header").slideDown(),e(".shadow-main").show(),e(".menuicon").addClass("is-active").parent("li").addClass("orange"),e(".div-exlist").find("#utility-"+o).addClass("selected"),e(".div-iconlist").find("#utility-"+o).parent().addClass("orange"),e(".modal#"+o).modal("show"),"gallery-legacy"==o&&showGallery());else{var g=e(".main-menu [href="+o+"]"),m=g.length>0;m||(s.href="/"),g.next().find("a").attr("tabindex","0"),g.next().find(".imgShow-div .pause-button").attr("tabindex","0"),g.addClass("orange");var v,w,y,x=[];-1!=e.inArray(o,h)&&(v=e(g).parent().find(".imgShow-div .image-wrap").hide(),w=e(g).parent().find(".imgShow-div .image-wrap").find(".lazy"),y=e(g).parent().find(".imgShow-div .imageVideo").find(".lazy-loading"),w.each(function(){var i,t,n=e(this);i=n.attr("data-src"),i&&(t=e.Deferred(),n.one("load",t.resolve).attr("src",i).attr("data-src",""),x.push(t.promise()))}),e.when.apply(e,x).done(function(){y.fadeOut(1e3),v.fadeIn(1e3);var i=e(g).parent().find(".imgShow-div").find(".imageVideo").length>0;i&&(e(g).parent().find(".imgShow-div").find(".imageVideo").imageWrapHeights(),n=e(g).parent().find(".imgShow-div").find(".imageVideo")[0].timeLineSlider,n.play())})),-1!=e.inArray(o,f)&&(v=e(g).parent().find(".tile-container").hide(),w=e(g).parent().find(".tile-container").find(".lazy"),y=e(g).parent().find(".lazy-loading"),w.each(function(){var i,t,n=e(this);i=n.attr("data-src"),i&&(t=e.Deferred(),n.one("load",t.resolve).attr("src",i).attr("data-src",""),x.push(t.promise()))}),e.when.apply(e,x).done(function(){y.fadeOut(1e3),v.fadeIn(1e3)}));var b=0;g.parent().siblings().each(function(){0==b?(l.to(e(this).children("a"),.5,{css:{fontSize:"20px"},ease:u}),b++):l.to(e(this).children("a"),.5,{css:{fontSize:"20px"},ease:u},"-=0.45")}),l.add(TweenLite.set(g.next(),{height:"auto"})),l.add(TweenLite.from(g.next(),.5,{height:"0",ease:u}),"-=0.35"),l.add(TweenLite.to(g.next().find("a"),.5,{onComplete:function(){g.next().addClass("is-active")}})),c.clear(),c.add(TweenMax.to(g.next().find(".sub-close-icon .subpage-close-button"),2,{rotation:360,transformOrigin:"50% 50%",ease:Sine.easeInOut})),a=!1}e(".ham-icon").on("click",function(i){i.preventDefault(),e(this).toggleClass("is-active"),e("body").toggleClass("nav-expanded")}),e(".tile-item").not(".tile-disable").hover(function(){TweenLite.to(e(this),.1,{scale:1.1})},function(){TweenLite.to(e(this),.1,{scale:1})});var C="#555555",S="#949494",T="#f7a800",k="#ffe0ae";e(".main-menu .item").children("a").hover(function(){return e(this).hasClass("orange")?!1:1==l.isActive()?!1:(TweenLite.to(e(this),.3,{scale:1.1,color:T}),void TweenLite.to(e(this).find(".grey"),.3,{color:k}))},function(){if(e(this).hasClass("orange"))return!1;if(1==l.isActive())return!1;var i=e(this).hasClass("grey");TweenLite.to(e(this),.3,{scale:1,color:i?S:C}),TweenLite.to(e(this).find(".grey"),.3,{color:S})}),e(".main-menu .item").children("a").click(function(){if(e(this).hasClass("orange"))return!1;if(1==l.isActive())return!1;n&&n.pause(0);var i=(e(this).parent()[0],this),t="#555555",s="#949494",o=e(".item .orange"),r=e(i).attr("id");p=0,e.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"+e(this).attr("href"));var d,g,m,v=[];if(-1!=e.inArray(r,h)&&(d=e(i).parent().find(".imgShow-div .image-wrap").hide(),g=e(i).parent().find(".imgShow-div .image-wrap").find(".lazy"),m=e(i).parent().find(".imgShow-div .imageVideo").find(".lazy-loading"),g.each(function(){var i,t,n=e(this);i=n.attr("data-src"),i&&(t=e.Deferred(),n.one("load",t.resolve).attr("src",i).attr("data-src",""),v.push(t.promise()))}),e.when.apply(e,v).done(function(){m.fadeOut(1e3),d.fadeIn(1e3);var t=e(i).parent().find(".imgShow-div").find(".imageVideo").length>0;t&&(e(i).parent().find(".imgShow-div").find(".imageVideo").imageWrapHeights(),n=e(i).parent().find(".imgShow-div").find(".imageVideo")[0].timeLineSlider,n.play())})),-1!=e.inArray(r,f)&&(d=e(i).parent().find(".tile-container").hide(),g=e(i).parent().find(".tile-container").find(".lazy"),m=e(i).parent().find(".lazy-loading"),g.each(function(){var i,t,n=e(this);i=n.attr("data-src"),i&&(t=e.Deferred(),n.one("load",t.resolve).attr("src",i).attr("data-src",""),v.push(t.promise()))}),e.when.apply(e,v).done(function(){m.fadeOut(1e3),d.fadeIn(1e3)})),1==a){l.clear(),l.to(e(this),.25,{scale:1,ease:u});var w=0;e(this).parent().siblings().each(function(){0==w?(l.to(e(this).children("a"),.5,{css:{fontSize:"20px",scale:1},ease:u}),w++):l.to(e(this).children("a"),.5,{css:{fontSize:"20px",scale:1},ease:u},"-=0.45")}),l.add(TweenLite.set(e(this).next(),{height:"auto"}),"feature"),l.add(TweenLite.from(e(this).next(),.5,{height:"0",ease:u}),"feature-=0.35"),l.add(TweenLite.to(e(this).next(),.5,{onComplete:function(){e(i).next().addClass("is-active")}}),"feature"),e(this).addClass("orange"),a=!1}else{l.clear(),l.to(e(this),.25,{scale:1,ease:u}),l.to(o.next(),0,{onComplete:function(){o.next().removeClass("is-active")}},"cleanup"),l.to(o.next(),.5,{height:"0",ease:u},"cleanup+=0.5");var y=o,x="engaging"===e(y).attr("id")||"integrating"===e(y).attr("id")||"spending"===e(y).attr("id");x?l.to(y,.5,{color:s,ease:u},"cleanup+=0.25"):(l.to(y,.5,{color:t,ease:u},"cleanup+=0.25"),l.to(y.find(".grey"),.5,{color:s,ease:u},"cleanup+=0.25")),e(".item .orange").next().find("a").attr("tabindex","-1"),e(".item .orange").next().find(".imgShow-div .pause-button").attr("tabindex","-1"),e(this).parent().siblings().each(function(){e(this).children("a").hasClass("orange")&&(l.to(e(this).children("a"),.5,{fontSize:"20px",scale:1,ease:u},"feature"),l.to(e(this).children("a").next(),.5,{height:"0",scale:1,ease:u},"feature+=0.25"),e(this).children("a").removeClass("orange"))}),e(".item").find(".orange").removeClass("orange"),l.to(e(this),.5,{fontSize:"67px",ease:u},"feature"),l.add(TweenLite.set(e(this).next(),{height:"auto"})),l.add(TweenLite.from(e(this).next(),.5,{height:"0",ease:u}),"feature+=0.25"),l.to(e(this).next(),.5,{onComplete:function(){e(i).next().addClass("is-active")}},"feature"),e(this).addClass("orange")}c.clear(),c.add(TweenMax.to(e(i).next().find(".sub-close-icon .subpage-close-button"),2,{rotation:360,transformOrigin:"50% 50%",ease:Sine.easeInOut})),e(i).next().find("a").attr("tabindex","0"),e(i).next().find(".imgShow-div .pause-button").attr("tabindex","0")}),e(".sub-close-icon").hover(function(){TweenMax.to(e(this).find(".subpage-close-button"),.5,{rotation:90,transformOrigin:"50% 50%",ease:Back.easeOut})},function(){TweenMax.to(e(this).find(".subpage-close-button"),.5,{rotation:0,transformOrigin:"50% 50%",ease:Back.easeOut})}),e(".sub-close-icon").click(function(i){var t="#77777a",s="#949494",o=e(this).parent(".page-content");i.preventDefault(),e.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"),l.clear(),l.to(o,0,{onComplete:function(){o.removeClass("is-active")}},"cleanup+=0.5"),l.to(o,.5,{height:"0",ease:u},"cleanup+=0.5");var r=e(".item .orange"),d="engaging"===e(r).attr("id")||"integrating"===e(r).attr("id")||"spending"===e(r).attr("id");d?l.to(r,.5,{color:s,ease:u},"cleanup+=0.25"):(l.to(r,.5,{color:t,ease:u},"cleanup+=0.25"),l.to(r.find(".grey"),.5,{color:s,ease:u},"cleanup+=0.25")),e(this).parent(".page-content").prev("a").removeClass("orange");var c=0;e(this).parents(".item").siblings().each(function(){0==c?(l.to(e(this).children("a"),.5,{css:{fontSize:"67px"},ease:u}),c++):l.to(e(this).children("a"),.5,{css:{fontSize:"67px"},ease:u},"-=0.45")}),e(this).parent(".page-content").find("a").attr("tabindex","-1"),e(this).parent(".page-content").find(".pause-button").attr("tabindex","-1"),a=!0,n.clear()}),t(),e(window).resize(i.changed(function(){i.is("xs")&&t()},100)),e(".mobile-item").click(function(i){i.preventDefault();var t=e(this).find("a").attr("href");window.history.pushState(null,null,"/"+e(this).children("a").attr("href")),d=!0,e(".main-menu").find("#"+t).click()}),e(".mobile-close").click(function(i){i.preventDefault(),window.history.pushState(null,null,"/"),d=!1;var t=e(this).attr("data-id");e(".main-menu").find("#"+t).parent().find(".page-content .sub-close-icon").click()}),e(".mobile-item-side").click(function(i){i.preventDefault();var t=e(this).find("a").attr("href").replace("utility/",""),n=e(this).hasClass("utility");n?window.history.pushState(null,null,"/utility/"+e(this).find("a").attr("href")):window.history.pushState(null,null,"/"+e(this).find("a").attr("href")),e(".close-icon").addClass("hidden"),e(".ham-icon").removeClass("hidden").removeClass("is-active"),e("body").removeClass("nav-expanded"),n?("gallery-legacy"==t&&(window.isGalleryOpen||showGallery()),e(".modal#"+t).modal("show")):e(".main-menu").find("#"+t).click()}),e(".mobile-pop").click(function(){e(e(this).attr("data-target")).show()}),e(".mobile-pop-close").click(function(i){i.preventDefault(),e(e(this).attr("close-target")).hide()}),e(".carousel-inner").swipe({swipeLeft:function(i,t,n,a,s){e(this).parent().carousel("next")},swipeRight:function(){e(this).parent().carousel("prev")}})})}(jQuery,ResponsiveBootstrapToolkit);