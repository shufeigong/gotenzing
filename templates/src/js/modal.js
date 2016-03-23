(function ($) {
    $(document).ready(
        function () {
            var modalCarousel = $('.modal.carousel.slide.gallery, .modal.carousel.slide.popup');
            var modalFullscreen = $(".modal.modal-fullscreen");
            var modalPopup = $('.modal.popup');
            var modalContentBox = $('.modal.modal-content-box');
            var player;
            var isFirstCarouselModal = true;
            var closeButtonTl = new TimelineMax(
                {
                    repeat: -1,
                    repeatDelay: 5,
                    yoyo: true
                }
            );

            modalCarousel.on(
                'slide.bs.carousel', function (event) {
                    var target = event.relatedTarget;
                    var lazy = $(target).find('.lazy');
                    var src = lazy.attr('data-src');

                    if (src !== "") {
                        var carousel = $(this).find('.carousel-inner').hide();
                        var carouselIndicators = $(this).find('.carousel-indicators').hide();
                        var loader = $('.modal-body', this).find('.lazy-loading');
                        loader.show();

                        var d = $.Deferred();
                        var datasrc;

                        datasrc = lazy.attr('data-src');
                        if (datasrc) {
                            d = $.Deferred();

                            lazy.one('load', d.resolve)
                                .attr("src", datasrc)
                                .attr('data-src', '');
                        }

                        $.when(d).done(
                            function () {
                                loader.fadeOut(1000);
                                carousel.fadeIn(1000);
                                carouselIndicators.fadeIn(1000);
                            }
                        );
                    }

                }
            );

            modalCarousel.on(
                'slid.bs.carousel', function (event) {
                    // video play button function
                    var target = event.relatedTarget;
                    var isVideo = $(target).find('.videoWrapper').length > 0;
                    var playButton = $(target).find('.video-play-button');

                    // If the content is video
                    if (isVideo) {
                        var iframe = $(target).find('iframe').get(0);

                        player = $f(iframe);
                        player.addEvent(
                            'ready', function () {
                                $(target).find('.videoWrapper .video-play-button').fadeIn();

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
                        if (player != null) {
                            player.api('pause');
                        }
                    }

                }
            );

            modalCarousel.on(
                'show.bs.modal', function (event) {
                    var $this = $(this);
                    var carousel = $(this).find('.carousel-inner').hide();
                    var carouselIndicators = $(this).find('.carousel-indicators').hide();
                    var loader = $('.modal-body', this).find('.lazy-loading');

                    var targetIndex = $(event.relatedTarget).attr('data-slide-to');

                    var item = $('.carousel-inner', this).find('.item').eq(targetIndex);
                    var lazy = $(item).find('.lazy');
                    var d = $.Deferred();
                    var datasrc;

                    datasrc = lazy.attr('data-src');
                    if (datasrc) {
                        d = $.Deferred();

                        lazy.one('load', d.resolve)
                            .attr("src", datasrc)
                            .attr('data-src', '');
                    }

                    $.when(d).done(
                        function () {
                            loader.fadeOut(1000);
                            carousel.fadeIn(1000);
                            carouselIndicators.fadeIn(1000);

                            $this.trigger('slid');
                        }
                    );

                    var zIndex = 3040 + (10 * $('.modal:visible').length);
                    $(this).css('z-index', zIndex);
                    $('body').css('overflow', 'hidden');

                    setTimeout(
                        function () {
                            $(".modal-backdrop").addClass("modal-backdrop-gallery").css('z-index', 3035);
                        }, 0
                    );

                    //var carousel = $(this).find('.carousel-inner').hide();
                    //var carouselIndicators = $(this).find('.carousel-indicators').hide();
                    //
                    //var deferreds = [];
                    //var lazies = $('.carousel-inner', this).find('.lazy');
                    //var loader = $('.modal-body', this).find('.lazy-loading');
                    //
                    //// loop over each img
                    //lazies.each(
                    //    function () {
                    //        var self = $(this);
                    //        var _self = this;
                    //        var datasrc, d;
                    //
                    //        if (self.hasClass('video')) {
                    //            datasrc = self.children('source').attr('data-src');
                    //            if (datasrc) {
                    //                self.children('source')
                    //                    .attr("src", datasrc)
                    //                    .attr('data-src', '');
                    //
                    //                _self.load();
                    //            }
                    //        } else {
                    //            datasrc = self.attr('data-src');
                    //            if (datasrc) {
                    //                d = $.Deferred();
                    //
                    //                self.one('load', d.resolve)
                    //                    .attr("src", datasrc)
                    //                    .attr('data-src', '');
                    //
                    //                deferreds.push(d.promise());
                    //            }
                    //        }
                    //    }
                    //);
                    //
                    //$.when.apply($, deferreds).done(
                    //    function () {
                    //        loader.fadeOut(1000);
                    //        carousel.fadeIn(1000);
                    //        carouselIndicators.fadeIn(1000);
                    //    }
                    //);
                }
            );

            modalCarousel.on(
                'shown.bs.modal', function (event) {
                    // Disable carousel slide interval
                    $('.carousel.fade.in').each(
                        function () {
                            $(this).carousel(
                                {
                                    interval: false
                                }
                            );
                        }
                    );
                }
            );

            modalCarousel.on(
                'hide.bs.modal', function (event) {
                    $('body').css('overflow', 'auto');

                    $(this).find('.carousel-inner').hide();
                    $(this).find('.carousel-indicators').hide();

                    // Reset video player
                    player = null;
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

            modalFullscreen.on(
                'shown.bs.modal', function (event) {
                    $('body').css('overflow', 'hidden');
                    $(this).css({'overflow': 'hidden'});

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

                                        $.data(map, 'center', center);
                                        mapInstances.push(map);
                                    }
                                }
                            );

                        $window.on(
                            'resize', $pluginInstance.debounce(
                                1000, function () {
                                    $.each(
                                        mapInstances, function () {
                                            this.setCenter($.data(this, 'center'));
                                        }
                                    );
                                }
                            )
                        );
                    }

                    $(target).find('.modal-body').css('overflow-y', 'auto');

                    // Set interval animation for close button
                    closeButtonTl.clear();
                    closeButtonTl.add(
                        TweenMax.to(
                            $(target).find('.utility-close-button'), 2, {
                                "rotation": 360,
                                transformOrigin: "50% 50%",
                                ease: Sine.easeInOut
                            }
                        )
                    );

                    $(target).find('.utility-close-icon').hover(
                        function () {
                            TweenMax.to(
                                $(target).find('.utility-close-button'), 0.5, {
                                    "rotation": 90,
                                    transformOrigin: "50% 50%",
                                    ease: Back.easeOut
                                }
                            );

                        }, function () {
                            TweenMax.to(
                                $(target).find('.utility-close-button'), 0.5, {
                                    "rotation": 0,
                                    transformOrigin: "50% 50%",
                                    ease: Back.easeOut
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

                    var target = event.currentTarget;

                    $(target).find('.modal-body').css('overflow-y', 'auto');

                    // Set interval animation for close button
                    closeButtonTl.clear();
                    closeButtonTl.add(
                        TweenMax.to(
                            $(target).find('.utility-close-button'), 2, {
                                "rotation": 360,
                                transformOrigin: "50% 50%",
                                ease: Sine.easeInOut
                            }
                        )
                    );

                    $(target).find('.utility-close-icon').hover(
                        function () {
                            TweenMax.to(
                                $(target).find('.utility-close-button'), 0.5, {
                                    "rotation": 90,
                                    transformOrigin: "50% 50%",
                                    ease: Back.easeOut
                                }
                            );

                        }, function () {
                            TweenMax.to(
                                $(target).find('.utility-close-button'), 0.5, {
                                    "rotation": 0,
                                    transformOrigin: "50% 50%",
                                    ease: Back.easeOut
                                }
                            );
                        }
                    );

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