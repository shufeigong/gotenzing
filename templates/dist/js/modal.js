!function(o){o(document).ready(function(){var n,e=o(".modal.carousel.slide.gallery, .modal.carousel.slide.popup"),a=o(".modal.modal-fullscreen"),i=o(".modal.mobile-modal"),l=o(".modal.popup"),t=o(".modal.modal-content-box"),s=o(".carousel.slide.subpage,.carousel.slide.mobile"),d=!0;s.on("slide.bs.carousel",function(n){var e;e=o(n.relatedTarget).find("img[data-original]"),e.attr("src",e.data("original")),e.removeAttr("data-src")}),e.on("slide.bs.carousel",function(n){var e;e=o(n.relatedTarget).find("img[data-original]"),e.attr("src",e.data("original")),e.removeAttr("data-src")}),e.on("slid.bs.carousel",function(e){var a=e.relatedTarget,i=o(a).find(".videoWrapper").length>0;if(i){var l=o(a).find("iframe").get(0);n=$f(l);var t=o(a).find(".video-play-button");d&&(n.api("play"),d=!1),n.addEvent("ready",function(){n.addEvent("pause",function(){t.fadeIn()}),n.addEvent("play",function(){t.fadeOut()})}),t.bind("click",function(){n.api("play")})}else void 0!=n&&n.api("pause")}),e.on("show.bs.modal",function(n){var e=3040+10*o(".modal:visible").length;o(this).css("z-index",e),setTimeout(function(){o(".modal-backdrop").addClass("modal-backdrop-gallery").css("z-index",3035)},0)}),e.on("hide.bs.modal",function(){void 0!=n&&n.api("unload"),d=!0}),a.on("show.bs.modal",function(n){console.log("full show"),o(".modal-fullscreen.fade.in").modal("hide");var e=1040+10*o(".modal:visible").length;o(this).css("z-index",e),o(this).focus(),setTimeout(function(){},0)}),i.on("show.bs.modal",function(n){console.log("mobile show");var e=1040+10*o(".modal:visible").length;o(this).css("z-index",e),setTimeout(function(){},0)}),l.on("show.bs.modal",function(o){console.log("popup mobile show"),setTimeout(function(){},0)}),a.on("shown.bs.modal",function(n){function e(){l=new google.maps.Map(document.getElementById("toronto-map"),{zoom:15,center:{lat:43.644518,lng:-79.395313}}),t=new google.maps.Map(document.getElementById("london-map"),{zoom:15,center:{lat:42.981651,lng:-81.247711}}),s=new google.maps.Marker({map:l,draggable:!0,animation:google.maps.Animation.DROP,position:{lat:43.644518,lng:-79.395313}}),s.addListener("click",a),d=new google.maps.Marker({map:t,draggable:!0,animation:google.maps.Animation.DROP,position:{lat:42.981651,lng:-81.247711}}),d.addListener("click",a),c=new google.maps.InfoWindow({content:"<span>184 York St, London, ON N6A 1B5</span>"}),m=new google.maps.InfoWindow({content:"<span>376 Wellington St W, Toronto, ON M5V 1E7</span>"}),c.open(l,s),m.open(t,d)}function a(){null!==s.getAnimation()?s.setAnimation(null):s.setAnimation(google.maps.Animation.BOUNCE),null!==d.getAnimation()?d.setAnimation(null):d.setAnimation(google.maps.Animation.BOUNCE)}o("body").css("overflow","hidden"),o(this).css("overflow","hidden");var i=n.currentTarget;if("contact"==o(i).attr("id")){e();var l,t,s,d,c,m}}),t.on("shown.bs.modal",function(n){o("body").css("overflow","hidden"),o(this).css("overflow","hidden")}),i.on("shown.bs.modal",function(n){console.log("mobile shown"),o("body").css("overflow","hidden"),o(this).css("overflow","auto")}),a.on("hide.bs.modal",function(o){}),i.on("hide.bs.modal",function(o){console.log("mobile hide")}),a.on("hidden.bs.modal",function(n){o("body").css("overflow","auto")}),i.on("hidden.bs.modal",function(n){o("body").css("overflow","auto")}),l.on("hidden.bs.modal",function(n){o("body").css("overflow","auto")})})}(jQuery);