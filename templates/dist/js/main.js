"use strict";window.isGalleryOpen=!1;var MainMenu=function(i,t){function a(){i(this).parent().find(".pressed").removeClass("pressed"),39==e.keyCode?i(this).parent().find(".right").focus().addClass("pressed"):37==e.keyCode&&i(this).parent().find(".left").focus().addClass("pressed")}var n="#555555",o="#949494",r="#f7a800",s="#ffe0ae";i(".main-menu .page-content").find("a").attr("tabindex","-1");var d,l=!0,h=window.history.location||window.location,c=h.pathname.split("/").pop(),f=-1!==h.pathname.search("/utility/"),p=new TimelineMax,g=new TimelineMax({repeat:-1,repeatDelay:5,yoyo:!0}),u=["surprising","serving","spending"],m=["branding","engaging","humanchanneling","integrating","orienteering","positioning"],v=0,w=Power2.easeInOut,x=i(".carousel.slide.popup, .carousel.slide.gallery");i.removeCookie("previousUrl",{path:"/"}),i.removeCookie("utilityMenuOpen"),x.on("keyup",a),i(document).ready(function(){if(""===c||f)""!==c&&f&&(i(".arrow-down, .extension-header").slideDown(),i(".shadow-main").show(),i(".menuicon").addClass("is-active").parent("li").addClass("orange"),i(".div-exlist").find("#utility-"+c).addClass("selected"),i(".div-iconlist").find("#utility-"+c).parent().addClass("orange"),i(".modal#"+c).modal("show"),"gallery-legacy"==c&&showGallery());else{var e=i(".main-menu [href="+c+"]"),t=e.length>0;t||(h.href="/"),e.next().find("a").attr("tabindex","0"),e.next().find(".imgShow-div .pause-button").attr("tabindex","0"),e.addClass("orange");var a=0;e.parent().siblings().each(function(){0==a?(p.to(i(this).children("a"),.5,{css:{fontSize:"20px"},ease:w}),a++):p.to(i(this).children("a"),.5,{css:{fontSize:"20px"},ease:w},"-=0.45")}),p.add(TweenLite.set(e.next(),{height:"auto"})),p.add(TweenLite.from(e.next(),.5,{height:"0",ease:w}),"-=0.35"),p.add(TweenLite.to(e.next().find("a"),.5,{onComplete:function(){var t,a,n,o=[];if(e.next().addClass("is-active"),-1!=i.inArray(c,u)){var r="surprising"===c,s=e.parent().find(".text-div").outerHeight()+20;s=250>s?250:s,e.parent().find(".imgShow-div .imageVideo").height(s),t=e.parent().find(".imgShow-div .image-wrap").hide(),a=e.parent().find(".imgShow-div .image-wrap").find(".lazy"),n=e.parent().find(".imgShow-div .imageVideo").find(".lazy-loading"),a.each(function(){var e,t,a=i(this);e=a.attr("data-src"),e&&(t=i.Deferred(),a.one("load",t.resolve).attr("src",e).attr("data-src",""),o.push(t.promise()))}),i.when.apply(i,o).done(function(){var i=e.parent().find(".imgShow-div").find(".imageVideo").length>0;i&&r?setTimeout(function(){e.parent().find(".imgShow-div").find(".imageVideo").imageWrapHeights(),d=e.parent().find(".imgShow-div").find(".imageVideo")[0].timeLineSlider,d.play(),t.fadeIn(1e3),n.fadeOut(1e3)},200):(t.fadeIn(1e3),e.parent().find(".imgShow-div").find(".imageVideo").imageWrapHeights(),d=e.parent().find(".imgShow-div").find(".imageVideo")[0].timeLineSlider,d.play(),n.fadeOut(1e3))})}-1!=i.inArray(c,m)&&(t=e.parent().find(".tile-container").hide(),a=e.parent().find(".tile-container").find(".lazy"),n=e.parent().find(".lazy-loading"),a.each(function(){var e,t,a=i(this);e=a.attr("data-src"),e&&(t=i.Deferred(),a.one("load",t.resolve).attr("src",e).attr("data-src",""),o.push(t.promise()))}),i.when.apply(i,o).done(function(){n.fadeOut(1e3),t.fadeIn(1e3)}))}})),g.clear(),g.add(TweenMax.to(e.next().find(".sub-close-icon .subpage-close-button"),2,{rotation:360,transformOrigin:"50% 50%",ease:Sine.easeInOut})),l=!1}i(".ham-icon").on("click",function(e){e.preventDefault(),i(this).toggleClass("is-active"),i("body").toggleClass("nav-expanded")}),i(".tile-item").not(".tile-disable").hover(function(){TweenLite.to(i(this),.1,{scale:1.1})},function(){TweenLite.to(i(this),.1,{scale:1})}),i(".main-menu .item").children("a").hover(function(){return i(this).hasClass("orange")?!1:1==p.isActive()?!1:(TweenLite.to(i(this),.3,{scale:1.1,color:r}),void TweenLite.to(i(this).find(".grey"),.3,{color:s}))},function(){if(i(this).hasClass("orange"))return!1;if(1==p.isActive())return!1;var e=i(this).hasClass("grey");TweenLite.to(i(this),.3,{scale:1,color:e?o:n}),TweenLite.to(i(this).find(".grey"),.3,{color:o})}),i(".main-menu .item").children("a").click(function(){if(i(this).hasClass("orange"))return!1;if(1==p.isActive())return!1;d&&d.pause(0);var e=(i(this).parent()[0],this),t="#555555",a="#949494",n=i(".item .orange"),o=i(e).attr("id");v=0,i.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"+i(this).attr("href"));var r,s,h,c=[];if(-1!=i.inArray(o,u)){var f="surprising"===o,x=i(e).parent().find(".text-div").outerHeight()+20;x=250>x?250:x,i(e).parent().find(".imgShow-div .imageVideo").height(x),r=i(e).parent().find(".imgShow-div .image-wrap").hide(),s=i(e).parent().find(".imgShow-div .image-wrap").find(".lazy"),h=i(e).parent().find(".imgShow-div .imageVideo").find(".lazy-loading"),s.each(function(){var e,t,a=i(this);e=a.attr("data-src"),e&&(t=i.Deferred(),a.one("load",t.resolve).attr("src",e).attr("data-src",""),c.push(t.promise()))}),i.when.apply(i,c).done(function(){var t=i(e).parent().find(".imgShow-div").find(".imageVideo").length>0;t&&f?setTimeout(function(){i(e).parent().find(".imgShow-div").find(".imageVideo").imageWrapHeights(),d=i(e).parent().find(".imgShow-div").find(".imageVideo")[0].timeLineSlider,d.play(),r.fadeIn(1e3),h.fadeOut(1e3)},200):(r.fadeIn(1e3),i(e).parent().find(".imgShow-div").find(".imageVideo").imageWrapHeights(),d=i(e).parent().find(".imgShow-div").find(".imageVideo")[0].timeLineSlider,d.play(),h.fadeOut(1e3))})}if(-1!=i.inArray(o,m)&&(r=i(e).parent().find(".tile-container").hide(),s=i(e).parent().find(".tile-container").find(".lazy"),h=i(e).parent().find(".lazy-loading"),s.each(function(){var e,t,a=i(this);e=a.attr("data-src"),e&&(t=i.Deferred(),a.one("load",t.resolve).attr("src",e).attr("data-src",""),c.push(t.promise()))}),i.when.apply(i,c).done(function(){h.fadeOut(1e3),r.fadeIn(1e3)})),1==l){p.clear(),p.to(i(this),.25,{scale:1,ease:w});var y=0;i(this).parent().siblings().each(function(){0==y?(p.to(i(this).children("a"),.5,{css:{fontSize:"20px",scale:1},ease:w}),y++):p.to(i(this).children("a"),.5,{css:{fontSize:"20px",scale:1},ease:w},"-=0.45")}),p.add(TweenLite.set(i(this).next(),{height:"auto"}),"feature"),p.add(TweenLite.from(i(this).next(),.5,{height:"0",ease:w}),"feature-=0.35"),p.add(TweenLite.to(i(this).next(),.5,{onComplete:function(){i(e).next().addClass("is-active")}}),"feature"),i(this).addClass("orange"),l=!1}else{p.clear(),p.to(i(this),.25,{scale:1,ease:w}),p.to(n.next(),0,{onComplete:function(){n.next().removeClass("is-active")}},"cleanup"),p.to(n.next(),.5,{height:"0",ease:w},"cleanup+=0.5");var S=n,C="engaging"===S.attr("id")||"integrating"===S.attr("id")||"spending"===S.attr("id");C?p.to(S,.5,{color:a,ease:w},"cleanup+=0.25"):(p.to(S,.5,{color:t,ease:w},"cleanup+=0.25"),p.to(S.find(".grey"),.5,{color:a,ease:w},"cleanup+=0.25")),i(".item .orange").next().find("a").attr("tabindex","-1"),i(".item .orange").next().find(".imgShow-div .pause-button").attr("tabindex","-1"),i(this).parent().siblings().each(function(){i(this).children("a").hasClass("orange")&&(p.to(i(this).children("a"),.5,{fontSize:"20px",scale:1,ease:w},"feature"),p.to(i(this).children("a").next(),.5,{height:"0",scale:1,ease:w},"feature+=0.25"),i(this).children("a").removeClass("orange"))}),i(".item").find(".orange").removeClass("orange"),p.to(i(this),.5,{fontSize:"67px",ease:w},"feature"),p.add(TweenLite.set(i(this).next(),{height:"auto"})),p.add(TweenLite.from(i(this).next(),.5,{height:"0",ease:w}),"feature+=0.25"),p.to(i(this).next(),.5,{onComplete:function(){i(e).next().addClass("is-active")}},"feature"),i(this).addClass("orange")}g.clear(),g.add(TweenMax.to(i(e).next().find(".sub-close-icon .subpage-close-button"),2,{rotation:360,transformOrigin:"50% 50%",ease:Sine.easeInOut})),i(e).next().find("a").attr("tabindex","0"),i(e).next().find(".imgShow-div .pause-button").attr("tabindex","0")}),i(".sub-close-icon").hover(function(){TweenMax.to(i(this).find(".subpage-close-button"),.5,{rotation:90,transformOrigin:"50% 50%",ease:Back.easeOut})},function(){TweenMax.to(i(this).find(".subpage-close-button"),.5,{rotation:0,transformOrigin:"50% 50%",ease:Back.easeOut})}),i(".sub-close-icon").click(function(e){var t="#77777a",a="#949494",n=i(this).parent(".page-content");e.preventDefault(),i.cookie("previousUrl",window.location.href,{path:"/"}),window.history.pushState(null,null,"/"),p.clear(),p.to(n,0,{onComplete:function(){n.removeClass("is-active")}},"cleanup+=0.5"),p.to(n,.5,{height:"0",ease:w},"cleanup+=0.5");var o=i(".item .orange"),r="engaging"===o.attr("id")||"integrating"===o.attr("id")||"spending"===o.attr("id");r?p.to(o,.5,{color:a,ease:w},"cleanup+=0.25"):(p.to(o,.5,{color:t,ease:w},"cleanup+=0.25"),p.to(o.find(".grey"),.5,{color:a,ease:w},"cleanup+=0.25")),i(this).parent(".page-content").prev("a").removeClass("orange");var s=0;i(this).parents(".item").siblings().each(function(){0==s?(p.to(i(this).children("a"),.5,{css:{fontSize:"67px"},ease:w}),s++):p.to(i(this).children("a"),.5,{css:{fontSize:"67px"},ease:w},"-=0.45")}),i(this).parent(".page-content").find("a").attr("tabindex","-1"),i(this).parent(".page-content").find(".pause-button").attr("tabindex","-1"),l=!0,d&&d.clear()})})}(jQuery,ResponsiveBootstrapToolkit);