!function(o){o(".modal.carousel.slide").on("show.bs.modal",function(l){setTimeout(function(){o(".modal-backdrop").addClass("modal-backdrop-gallery")},0)});var l=o(".modal-fullscreen");l.on("show.bs.modal",function(l){o(".modal-fullscreen.fade.in").modal("hide");var e=1040+10*o(".modal:visible").length;o(this).css("z-index",e),setTimeout(function(){o(".modal-backdrop").addClass("modal-backdrop-fullscreen"),o(".modal-backdrop").not(".modal-stack").css("z-index",e-1).addClass("modal-stack")},0)}),l.on("shown.bs.modal",function(l){o("body").css("overflow","hidden"),o(this).css("overflow","auto"),o(".modal-fullscreen.fade.in").find("a.close").click(function(l){l.preventDefault();var e=null!=o.cookie("previousUrl");if(e){var a=o.cookie("previousUrl"),d=-1!=a.search(document.domain),s=a.split("/").pop();d?window.history.pushState(null,null,"/"+s):(window.history.pushState(null,null,"/"),location.reload())}else window.history.pushState(null,null,"/");return o(".div-exlist a.selected").removeClass("selected"),o.removeCookie("utilityMenuOpen"),!0})}),l.on("hide.bs.modal",function(o){}),l.on("hidden.bs.modal",function(l){o("body").css("overflow","auto"),o(".modal-backdrop").addClass("modal-backdrop-fullscreen")})}(jQuery);