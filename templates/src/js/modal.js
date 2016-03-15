(function ($) {
    $(document).ready(
        function () {
            var modalCarousel = $('.modal.carousel.slide.gallery, .modal.carousel.slide.popup');
            var modalFullscreen = $(".modal.modal-fullscreen");
            var mobileModal = $('.modal.mobile-modal');
            var modalPopup = $('.modal.popup');
            var modalContentBox = $('.modal.modal-content-box');
            var carouselSubpage = $('.carousel.slide.subpage,.carousel.slide.mobile');
            var player;
            var isFirstCarouselModal = true;

            carouselSubpage.on(
                'slide.bs.carousel', function (event) {
                    var lazy;
                    lazy = $(event.relatedTarget).find("img[data-original]");
                    lazy.attr("src", lazy.data('original'));
                    lazy.removeAttr("data-src");
                }
            );

            modalCarousel.on(
                'slide.bs.carousel', function (event) {
                    var lazy;
                    lazy = $(event.relatedTarget).find("img[data-original]");
                    lazy.attr("src", lazy.data('original'));
                    lazy.removeAttr("data-src");
                }
            );

            modalCarousel.on(
                'slid.bs.carousel', function (event) {
                    // video play button function
                    var target = event.relatedTarget;
                    var isVideo = $(target).find('.videoWrapper').length > 0;
                    if (isVideo) {
                        var iframe = $(target).find('iframe').get(0);
                        player = $f(iframe);
                        var playButton = $(target).find('.video-play-button');

                        player.addEvent(
                            'ready', function () {
                                player.addEvent(
                                    'pause', function () {
                                        playButton.fadeIn();

                                    }
                                );
                                player.addEvent(
                                    'play', function () {
                                        playButton.fadeOut();
                                    }
                                );
                            }
                        );

                        if (isFirstCarouselModal) {
                            player.api("play");
                            isFirstCarouselModal = false;
                        }

                        playButton.bind(
                            "click", function () {
                                player.api("play");
                            }
                        );

                    } else {
                        if (player != undefined) {
                            player.api('pause');
                        }
                    }
                }
            );

            modalCarousel.on(
                'show.bs.modal', function (event) {
                    var zIndex = 3040 + (10 * $('.modal:visible').length);
                    $(this).css('z-index', zIndex);

                    setTimeout(
                        function () {
                            $(".modal-backdrop").addClass("modal-backdrop-gallery").css('z-index', 3035);
                        }, 0
                    );
                }
            );

            modalCarousel.on(
                'hide.bs.modal', function () {
                    if (player != undefined) {
                        player.api('unload');
                    }
                    isFirstCarouselModal = true;
                }
            );

            modalFullscreen.on(
                'show.bs.modal', function (event) {
                    console.log('full show');
                    // Close open modal box
                    $(".modal-fullscreen.fade.in").modal('hide');

                    var zIndex = 1040 + (10 * $('.modal:visible').length);
                    $(this).css('z-index', zIndex);

                    $(this).focus();
                }
            );

            mobileModal.on(
                'show.bs.modal', function (event) {
                    console.log('mobile show');

                    var zIndex = 1040 + (10 * $('.modal:visible').length);
                    $(this).css('z-index', zIndex);

                }
            );

            modalPopup.on(
                'show.bs.modal', function (event) {
                    console.log('popup mobile show');
                }
            );

            modalFullscreen.on(
                'shown.bs.modal', function (event) {
                    $('body').css('overflow', 'hidden');
                    $(this).css('overflow', 'hidden');

                    var target = event.currentTarget;
                    if ($(target).attr('id') == 'contact') {

                        var $window         = $(window),
                            mapInstances    = [],
                            $pluginInstance = $('#toronto-map, #london-map').lazyLoadGoogleMaps(
                            {
                                api_key: 'AIzaSyD_VREr-We898pVftz2T3c9EU7kKkylSPs',
                                callback: function (container, map) {
                                    var $container = $(container),
                                        center     = new google.maps.LatLng($container.attr('data-lat'), $container.attr('data-lng'));

                                    map.setOptions({zoom: 15, center: center});
                                    new google.maps.Marker(
                                        {
                                            position: center,
                                            map: map,
                                            animation: google.maps.Animation.DROP,
                                            draggable: true
                                        }
                                    );

                                    $.data( map, 'center', center );
                                    mapInstances.push( map );
                                }
                            }
                        );


                        $window.on('resize',$pluginInstance.debounce( 1000, function()
                        {
                            $.each( mapInstances, function()
                            {
                                this.setCenter( $.data( this, 'center' ) );
                            });
                        }));
                    }


                }
            );

            modalContentBox.on(
                'shown.bs.modal', function (event) {
                    $('body').css('overflow', 'hidden');
                    $(this).css('overflow', 'hidden');

                }
            );

            mobileModal.on(
                'shown.bs.modal', function (event) {
                    console.log('mobile shown');
                    $('body').css('overflow', 'hidden');
                    $(this).css('overflow', 'auto');

                }
            );

            modalFullscreen.on(
                'hide.bs.modal', function (event) {

                }
            );

            mobileModal.on(
                'hide.bs.modal', function (event) {
                    console.log('mobile hide');

                }
            );

            modalFullscreen.on(
                'hidden.bs.modal', function (event) {
                    $('body').css('overflow', 'auto');
                }
            );

            mobileModal.on(
                'hidden.bs.modal', function (event) {
                    $('body').css('overflow', 'auto');
                }
            );

            modalPopup.on(
                'hidden.bs.modal', function (event) {
                    $('body').css('overflow', 'auto');
                }
            );
        }
    );

})(jQuery);