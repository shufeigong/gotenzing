function vimeoLoadingThumb(o){var e="http://vimeo.com/api/v2/video/"+o+".json?callback=showThumb",t="#vimeo-"+o,c=document.createElement("script");c.type="text/javascript",c.src=e,$(t).before(c)}function showThumb(o){console.log(o);var e="#vimeo-"+o[0].id;$(e).attr("src",o[0].thumbnail_large)}!function(o){o(document).ready(function(){})}(jQuery);