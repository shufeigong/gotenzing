(function ($) {
    $(document).ready(function() {
        var modalCarousel = $('.modal.carousel.slide');
        var modalFullscreen = $(".modal.modal-fullscreen");
        var mobileModal = $('.modal.mobile-modal');
        var modalPopup = $('.modal.mobile-pop-modal');
        var modalContentBox = $('.modal.modal-content-box');
        var player;
        var isFirstCarouselModal = true;

        modalCarousel.on('slid.bs.carousel', function (event) {
            // video play button function
            var target = event.relatedTarget;
            var isVideo = $(target).find('.videoWrapper').length > 0;
            if(isVideo) {
                var iframe = $(target).find('iframe').get(0);
                player = $f(iframe);
                var playButton = $(target).find('.video-play-button');

                if(isFirstCarouselModal) {
                    player.api("play");
                }

                player.addEvent('ready', function() {
                    player.addEvent('pause', function() {
                        playButton.fadeIn();

                    });
                    player.addEvent('play', function() {
                        playButton.fadeOut();
                    });
                });

                playButton.bind("click", function() {
                    player.api("play");
                });

            } else {
                if(player != undefined) {
                    player.api('pause');
                }
            }
        });

        modalCarousel.on('show.bs.modal', function (event) {
            var zIndex = 3040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);

            isFirstCarouselModal = false;

            setTimeout(function () {
                $(".modal-backdrop").addClass("modal-backdrop-gallery").css('z-index', 3035);
            }, 0);
        });

        modalCarousel.on('hide.bs.modal', function() {
            if(player != undefined) {
                player.api('pause').api("seekTo", "0");
            }
            isFirstCarouselModal = true;
        });

        modalFullscreen.on('show.bs.modal', function (event) {
            console.log('full show');
            // Close open modal box
            $(".modal-fullscreen.fade.in").modal('hide');

            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);

            $(this).focus();
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
            $(this).css('overflow', 'hidden');

        });

        modalContentBox.on('shown.bs.modal', function (event) {
            $('body').css('overflow', 'hidden');
            $(this).css('overflow', 'hidden');

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
        });

        mobileModal.on('hidden.bs.modal', function (event) {
            $('body').css('overflow', 'auto');
        });

        modalPopup.on('hidden.bs.modal', function (event) {
            $('body').css('overflow', 'auto');
        });
    });

})(jQuery);