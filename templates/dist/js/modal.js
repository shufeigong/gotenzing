!function(d){d(".modal-fullscreen").on("show.bs.modal",function(a){d(".modal-fullscreen.fade.in").modal("hide");var l=1040+10*d(".modal:visible").length;d(this).css("z-index",l),setTimeout(function(){d(".modal-backdrop").addClass("modal-backdrop-fullscreen"),d(".modal-backdrop").not(".modal-stack").css("z-index",l-1).addClass("modal-stack")},0)}),d(".modal-fullscreen").on("hidden.bs.modal",function(){d(".modal-backdrop").addClass("modal-backdrop-fullscreen")})}(jQuery);