(function ($) {
    $(document).ready(
        function () {
            var modalCarousel = $('.modal.carousel.slide.gallery, .modal.carousel.slide.popup');
            var modalFullscreen = $(".modal.modal-fullscreen");
            var modalPopup = $('.modal.popup');
            var modalContentBox = $('.modal.modal-content-box');
            var carouselSubpage = $('.carousel.slide.subpage,.carousel.slide.mobile');
            var player;
            var isFirstCarouselModal = true;
            var closeButtonTl = new TimelineMax({
                repeat: -1,
                repeatDelay: 5,
                yoyo: true
            });

            carouselSubpage.on(
                'slide.bs.carousel', function (event) {
                    var lazy;
                    lazy = $(event.relatedTarget).find("img[data-original]");
                    lazy.attr("src", lazy.data('original'));
                    lazy.removeAttr("data-original");
                }
            );

            modalCarousel.on(
                'slide.bs.carousel', function (event) {
                    var lazy;
                    lazy = $(event.relatedTarget).find("img[data-original]");
                    lazy.attr("src", lazy.data('original'));
                    lazy.removeAttr("data-original");

                    lazy.on('load',function(){
                        lazy.removeClass('lazy').addClass('lazy-loaded');
                    });

                }
            );

            modalCarousel.on(
                'slid.bs.carousel', function (event) {
                    // video play button function
                    var target = event.relatedTarget;
                    var isVideo = $(target).find('.videoWrapper').length > 0;

                    // If the content is video
                    if (isVideo) {
                        var iframe = $(target).find('iframe').get(0);
                        var isVideoLoaded = $(iframe).hasClass('lazy-loaded');

                        if(!isVideoLoaded) {
                            $(target).find('.videoWrapper').find('iframe[data-src]').lazyLoadXT();
                        }

                        player = $f(iframe);
                        var playButton = $(target).find('.video-play-button');

                        player.addEvent(
                            'ready', function () {
                                $(target).find('.videoWrapper .video-loading-icon').fadeOut();
                                $(target).find('.videoWrapper .video-play-button').fadeIn();

                                //if (isFirstCarouselModal) {
                                //    player.api("play");
                                //    isFirstCarouselModal = false;
                                //}

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

                                player.api("play");

                            }
                        );


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

                    $('body').css('overflow', 'hidden');

                    setTimeout(
                        function () {
                            $(".modal-backdrop").addClass("modal-backdrop-gallery").css('z-index', 3035);
                        }, 0
                    );
                }
            );

            modalCarousel.on(
                'hide.bs.modal', function () {
                    // Reset video player
                    if (player != undefined) {
                        player.api('unload');
                    }

                    $('body').css('overflow', 'auto');

                    isFirstCarouselModal = true;
                }
            );

            modalFullscreen.on(
                'show.bs.modal', function (event) {
                    console.log('full show');
                    // Close open modal box
                    $(".modal-fullscreen.fade.in").modal('hide');

                    $('body').addClass('full-screen-modal-open');

                    var zIndex = 1040 + (10 * $('.modal:visible').length);
                    $(this).css('z-index', zIndex);

                    $(this).focus();
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
                    $(this).css({'overflow':'hidden'});

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

                    $(target).find('.modal-body').css('overflow-y', 'auto');

                    // Set interval animation for close button
                    closeButtonTl.clear();
                    closeButtonTl.add(TweenMax.to(
                        $(target).find('.utility-close-button'), 2, {
                            "rotation": 360,
                            transformOrigin:"50% 50%",
                            ease:Sine.easeInOut
                        }
                    ));

                    $(target).find('.utility-close-icon').hover(
                        function () {
                            TweenMax.to(
                                $(target).find('.utility-close-button'), 0.5, {
                                    "rotation": 90,
                                    transformOrigin:"50% 50%",
                                    ease:Back.easeOut
                                }
                            );

                        }, function () {
                            TweenMax.to(
                                $(target).find('.utility-close-button'), 0.5, {
                                    "rotation": 0,
                                    transformOrigin:"50% 50%",
                                    ease:Back.easeOut
                                }
                            );
                        }
                    );

                }
            );

            modalContentBox.on(
                'shown.bs.modal', function (event) {
                    $('body').css('overflow', 'hidden');
                    $(this).css('overflow', 'hidden');

                }
            );

            modalFullscreen.on(
                'hide.bs.modal', function (event) {
                    $('body').removeClass('full-screen-modal-open');

                    $(event.currentTarget).find('.modal-body').css('overflow-y', '');

                    closeButtonTl.clear();
                }
            );

            modalFullscreen.on(
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