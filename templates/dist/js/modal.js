!function(o){o(document).ready(function(){var a,n=o(".modal.carousel.slide.gallery, .modal.carousel.slide.popup"),e=o(".modal.modal-fullscreen"),d=o(".modal.popup"),l=o(".modal.modal-content-box"),i=o(".carousel.slide.subpage,.carousel.slide.mobile"),s=!0;i.on("slide.bs.carousel",function(a){var n;n=o(a.relatedTarget).find("img[data-original]"),n.attr("src",n.data("original")),n.removeAttr("data-original")}),n.on("slide.bs.carousel",function(a){var n;n=o(a.relatedTarget).find("img[data-original]"),n.attr("src",n.data("original")),n.removeAttr("data-original")}),n.on("slid.bs.carousel",function(n){var e=n.relatedTarget,d=o(e).find(".videoWrapper").length>0;if(d){var l=o(e).find("iframe").get(0);a=$f(l);var i=o(e).find(".video-play-button");a.addEvent("ready",function(){a.addEvent("pause",function(){i.fadeIn()}),a.addEvent("play",function(){i.fadeOut()})}),s&&(a.api("play"),s=!1),i.bind("click",function(){a.api("play")})}else void 0!=a&&a.api("pause")}),n.on("show.bs.modal",function(a){var n=3040+10*o(".modal:visible").length;o(this).css("z-index",n),o("body").css("overflow","hidden"),setTimeout(function(){o(".modal-backdrop").addClass("modal-backdrop-gallery").css("z-index",3035)},0)}),n.on("hide.bs.modal",function(){void 0!=a&&a.api("unload"),o("body").css("overflow","auto"),s=!0}),e.on("show.bs.modal",function(a){console.log("full show"),o(".modal-fullscreen.fade.in").modal("hide"),o("body").addClass("full-screen-modal-open");var n=1040+10*o(".modal:visible").length;o(this).css("z-index",n),o(this).focus()}),d.on("show.bs.modal",function(o){console.log("popup mobile show")}),e.on("shown.bs.modal",function(a){o("body").css("overflow","hidden"),o(this).css({overflow:"hidden"});var n=a.currentTarget;if("contact"==o(n).attr("id")){var e=o(window),d=[],l=o("#toronto-map, #london-map").lazyLoadGoogleMaps({api_key:"AIzaSyD_VREr-We898pVftz2T3c9EU7kKkylSPs",callback:function(a,n){var e=o(a),l=new google.maps.LatLng(e.attr("data-lat"),e.attr("data-lng"));n.setOptions({zoom:15,center:l}),new google.maps.Marker({position:l,map:n,animation:google.maps.Animation.DROP,draggable:!0}),o.data(n,"center",l),d.push(n)}});e.on("resize",l.debounce(1e3,function(){o.each(d,function(){this.setCenter(o.data(this,"center"))})}))}o(n).find(".modal-body").css("overflow-y","auto")}),l.on("shown.bs.modal",function(a){o("body").css("overflow","hidden"),o(this).css("overflow","hidden")}),e.on("hide.bs.modal",function(a){o("body").removeClass("full-screen-modal-open"),o(a.currentTarget).find(".modal-body").css("overflow-y","")}),e.on("hidden.bs.modal",function(a){o("body").css("overflow","auto")}),d.on("hidden.bs.modal",function(a){o("body").css("overflow","auto")})})}(jQuery);