(function ($) {
    $('.modal.carousel.slide').on('show.bs.modal', function (event) {
        setTimeout(function () {
            $(".modal-backdrop").addClass("modal-backdrop-gallery");
        }, 0);
    });

    var modalFullscreen = $(".modal-fullscreen");

    modalFullscreen.on('show.bs.modal', function (event) {
        // Close open modal box
        $(".modal-fullscreen.fade.in").modal('hide');

        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);

        setTimeout(function () {
            $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    modalFullscreen.on('shown.bs.modal', function (event) {
        $('body').css('overflow', 'hidden');
        $(this).css('overflow', 'auto');

        $(".modal-fullscreen.fade.in").find('a.close').click(function(e) {
            e.preventDefault();
            var hasPreviousUrl = $.cookie('previousUrl') != null;
            if (hasPreviousUrl) {
                var previousUrl = $.cookie("previousUrl");
                var isSameDomain = previousUrl.search(document.domain) != -1;
                var path = previousUrl.split('/').pop();

                if (isSameDomain) {
                    window.history.pushState(null, null, "/" + path);
                } else {
                    // if the previous is not the same domain,
                    window.history.pushState(null, null, "/");
                    location.reload();
                }
            } else {
                window.history.pushState(null, null, "/");
            }

            $('.div-exlist a.selected').removeClass('selected');
            $.removeCookie("utilityMenuOpen");

            return true;
        });

    });

    modalFullscreen.on('hide.bs.modal', function (event) {

    });

    modalFullscreen.on('hidden.bs.modal', function (event) {
        $('body').css('overflow', 'auto');
        $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
    });


})(jQuery);