!function(o){o(document).ready(function(){var l=o(".modal.carousel.slide"),d=o(".modal.modal-fullscreen"),e=o(".modal.mobile-modal"),s=o(".modal.mobile-pop-modal");l.on("show.bs.modal",function(l){setTimeout(function(){o(".modal-backdrop").addClass("modal-backdrop-gallery")},0)}),d.on("show.bs.modal",function(l){console.log("full show"),o(".modal-fullscreen.fade.in").modal("hide");var d=1040+10*o(".modal:visible").length;o(this).css("z-index",d),setTimeout(function(){o(".modal-backdrop").addClass("modal-backdrop-fullscreen hidden-xs"),o(".modal-backdrop").not(".modal-stack").css("z-index",d-1).addClass("modal-stack")},0)}),e.on("show.bs.modal",function(l){console.log("mobile show"),o(".modal-mobile.fade.in").modal("hide");var d=1040+10*o(".modal:visible").length;o(this).css("z-index",d),setTimeout(function(){o(".modal-backdrop").addClass("modal-backdrop-mobile visible-xs")},0)}),s.on("show.bs.modal",function(l){console.log("popup mobile show"),o(".mobile-pop-modal.fade.in").modal("hide");var d=1040+10*o(".modal:visible").length;o(this).css("z-index",d),setTimeout(function(){o(".modal-backdrop").addClass("modal-backdrop-mobile visible-xs")},0)}),d.on("shown.bs.modal",function(l){o("body").css("overflow","hidden"),o(this).css("overflow","auto"),o(".modal-fullscreen.fade.in").find("a.close").click(function(l){l.preventDefault();var d=null!=o.cookie("previousUrl");if(d){var e=o.cookie("previousUrl"),s=-1!=e.search(document.domain),a=e.split("/").pop();s?window.history.pushState(null,null,"/"+a):(window.history.pushState(null,null,"/"),location.reload())}else window.history.pushState(null,null,"/");return o(".div-exlist a.selected").removeClass("selected"),o.removeCookie("utilityMenuOpen"),!0})}),e.on("shown.bs.modal",function(l){console.log("mobile shown"),o("body").css("overflow","hidden"),o(this).css("overflow","auto")}),d.on("hide.bs.modal",function(o){}),e.on("hide.bs.modal",function(o){console.log("mobile hide")}),d.on("hidden.bs.modal",function(l){o("body").css("overflow","auto"),o(".modal-backdrop").addClass("modal-backdrop-fullscreen")}),e.on("hidden.bs.modal",function(l){o("body").css("overflow","auto")})})}(jQuery);