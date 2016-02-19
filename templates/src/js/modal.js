(function ($) {
    $(document).ready(function() {
        var modalCarousel = $('.modal.carousel.slide');
        var modalFullscreen = $(".modal.modal-fullscreen");
        var mobileModal = $('.modal.mobile-modal');
        var modalPopup = $('.modal.mobile-pop-modal');

        modalCarousel.on('show.bs.modal', function (event) {
            var zIndex = 3040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function () {
                $(".modal-backdrop").addClass("modal-backdrop-gallery hidden-xs");
            }, 0);
        });

        modalFullscreen.on('show.bs.modal', function (event) {
            console.log('full show');
            // Close open modal box
            //$(".modal-fullscreen.fade.in, .mobile-modal.fade.in").modal('hide');

            var zIndex = 2040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function () {
                //$(".modal-backdrop").addClass("modal-backdrop-fullscreen hidden-xs");
                //$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });

        mobileModal.on('show.bs.modal', function (event) {
            console.log('mobile show');

            //$(".modal-mobile.fade.in, .modal-fullscreen.fade.in").modal('hide');

            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function () {
                //$(".modal-backdrop").addClass("modal-backdrop-mobile visible-xs");
            }, 0);
        });

        modalPopup.on('show.bs.modal', function (event) {
            console.log('popup mobile show');

            $(".mobile-pop-modal.fade.in").modal('hide');

            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function () {
                $(".modal-backdrop").addClass("modal-backdrop-mobile visible-xs");
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

        mobileModal.on('shown.bs.modal', function (event) {
            console.log('mobile shown');
            $('body').css('overflow', 'hidden');
            $(this).css('overflow', 'auto');

        });

        modalFullscreen.on('hide.bs.modal', function (event) {

        });

        mobileModal.on('hide.bs.modal', function (event) {
            console.log('mobile hide');

        });

        modalFullscreen.on('hidden.bs.modal', function (event) {
            $('body').css('overflow', 'auto');
            $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
        });

        mobileModal.on('hidden.bs.modal', function (event) {
            $('body').css('overflow', 'auto');
        });

        modalPopup.on('hidden.bs.modal', function (event) {
            $('body').css('overflow', 'auto');
        });
    });

})(jQuery);