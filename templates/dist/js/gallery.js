$(function(){"use strict";$.ajax({url:"https://api.flickr.com/services/rest/",data:{format:"json",method:"flickr.interestingness.getList",api_key:"7617adae70159d09ba78cfec73c13be3"},dataType:"jsonp",jsonp:"jsoncallback"}).done(function(a){$(".loading-icon").hide();for(var e=$("#gallery-container"),t=0;30>t;t++)$("<a/>").append($("<img>").prop("src","http://placehold.it/119x119")).addClass("gallery-item").prop("href","#lightbox").attr("data-toggle","modal").attr("data-slide-to",t).appendTo(e),$(".carousel-indicators").append($("<li/>").attr({"data-target":"#lightbox","data-slide-to":t})),0==t?$(".carousel-inner").append($("<div/>").addClass("item active").append($("<img>").prop("src","http://placehold.it/938x538")).append($("<div/>").addClass("carousel-caption").append(""))):$(".carousel-inner").append($("<div/>").addClass("item").append($("<img>").prop("src","http://placehold.it/938x538")).append($("<div/>").addClass("carousel-caption").append("")))})});