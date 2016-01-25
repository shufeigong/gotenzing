(function($){
    $(".modal-fullscreen").on('show.bs.modal', function (event) {
        $('body').css('overflow', 'hidden');
        $(this).css('overflow', 'auto');

        // Close open modal box
        $(".modal-fullscreen.fade.in").modal('hide');
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);

        setTimeout(function() {
            $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
    $(".modal-fullscreen").on('hidden.bs.modal', function (event) {
        $('body').css('overflow', 'auto');
        $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
    });
})(jQuery);