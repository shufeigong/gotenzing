function vimeoLoadingThumb(id){
    var url = "http://vimeo.com/api/v2/video/" + id + ".json?callback=showThumb";

    var id_img = "#vimeo-" + id;
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = url;

    $(id_img).before(script);
}

function showThumb(data){
    console.log(data);
    var id_img = "#vimeo-" + data[0].id;
    $(id_img).attr('src',data[0].thumbnail_large);
}

(function($) {
    $(document).ready(function() {
        //vimeoLoadingThumb(142881734);
        //vimeoLoadingThumb(87009438);
        //vimeoLoadingThumb(55531909);
        //vimeoLoadingThumb(141903598);
    });
})(jQuery);