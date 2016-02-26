(function ($) {
    $(document).ready(function() {
        var modalCarousel = $('.modal.carousel.slide');
        var modalFullscreen = $(".modal.modal-fullscreen");
        var mobileModal = $('.modal.mobile-modal');
        var modalPopup = $('.modal.popup');
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
                    isFirstCarouselModal = false;
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

            setTimeout(function () {
                $(".modal-backdrop").addClass("modal-backdrop-gallery").css('z-index', 3035);
            }, 0);
        });

        modalCarousel.on('hide.bs.modal', function() {
            if(player != undefined) {
                player.api('unload');
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

            //$(".mobile-pop-modal.fade.in").modal('hide');

            //var zIndex = 1040 + (10 * $('.modal:visible').length);
            //$(this).css('z-index', zIndex);
            setTimeout(function () {
                //$(".modal-backdrop").addClass("modal-backdrop-mobile visible-xs");
            }, 0);

        });

        modalFullscreen.on('shown.bs.modal', function (event) {
            $('body').css('overflow', 'hidden');
            $(this).css('overflow', 'hidden');

            var target = event.currentTarget;
            if($(target).attr('id') == 'contact') {
                initMap();

                var torontoMap, londonMap;
                var torontoMarker, londonMarker;

                function initMap() {
                    torontoMap = new google.maps.Map(document.getElementById('toronto-map'), {
                        zoom: 15,
                        center: {
                            lat: 43.644518,
                            lng: -79.395313
                        }
                    });

                    londonMap = new google.maps.Map(document.getElementById('london-map'), {
                        zoom: 15,
                        center: {
                            lat: 42.981651,
                            lng: -81.247711
                        }
                    });

                    torontoMarker = new google.maps.Marker({
                        map: torontoMap,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: {
                            lat: 43.644518,
                            lng: -79.395313
                        }
                    });
                    torontoMarker.addListener('click', toggleBounce);

                    londonMarker = new google.maps.Marker({
                        map: londonMap,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: {
                            lat: 42.981651,
                            lng: -81.247711
                        }
                    });
                    londonMarker.addListener('click', toggleBounce);
                }

                function toggleBounce() {
                    if (torontoMarker.getAnimation() !== null) {
                        torontoMarker.setAnimation(null);
                    } else {
                        torontoMarker.setAnimation(google.maps.Animation.BOUNCE);
                    }

                    if (londonMarker.getAnimation() !== null) {
                        londonMarker.setAnimation(null);
                    } else {
                        londonMarker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                }
            }

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