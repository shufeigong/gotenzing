(function ($, viewport) {
    "use strict";

    // Normalize Heights
    $.fn.imageWrapHeights = function () {
        var textDiv = $(this).parent().prev();
        var subContainer = $(this).closest('.sub-container');
        var imgDiv = $(this).parent();
        var images = $(this).find('.image-item');
        var iframes = $(this).find('iframe');
        var imageContainers = $(this).find('.image-container');
        var imageWrap = $(this).find('.image-wrap');
        var textDivHeight, subContainerHeight;
        var heights = [], call, tallest;

        var normalizeHeights = function () {
            textDivHeight = textDiv.outerHeight();
            subContainerHeight = subContainer.innerHeight() - 10;

            if($(window).width() < 640) {
                imageContainers.css({'height': 300});
                imageWrap.css({'height': 300});
                images.css({'height': 'auto'});

                var height = textDiv.outerHeight() < 250 ? 250 : subContainerHeight;
                iframes.css({'width': (height*16)/9, 'height': height});

            } else {
                var height = textDiv.outerHeight() < 250 ? 250 : subContainerHeight;

                imageContainers.css({'height': height});
                imageWrap.css({'height': height});
                iframes.css({'width': ((height*16)/9) - 30, 'height': height});
            }

            $('.image-item').imageScale({});
        };

        normalizeHeights();

        $(window).on(
            'resize orientationchange', function () {
                var resetValue = textDiv.outerHeight() < 250 ? 250 : textDiv.outerHeight() + 20;
                imageContainers.css({'height': resetValue});
                imageWrap.css({'height': resetValue});

                if (call) {
                    clearTimeout(call);
                }
                call = setTimeout(normalizeHeights, 0); // run it again
            }
        );
    };

    $(window).load(function() {
        /**
         * Normalize image slider height
         */
        $('.sub-container').find('.imageVideo').each(
            function () {
                $(this).imageWrapHeights();
            }
        );
    });

    // Reset cookie
    $.removeCookie('previousUrl', {'path': '/'});
    $.removeCookie("utilityMenuOpen");

    $(document).ready(
        function () {
            window.isGalleryOpen = false;

            // Set tabindex to -1 for all the link
            $('.main-menu .page-content').find('a').attr('tabindex', "-1");

            var isFirstClick = true;

            // Use polyfill for history
            var location = window.history.location || window.location;

            var link = location.pathname.split('/').pop();
            var isUtilityPage = location.pathname.search('/utility/') !== -1;

            var mobileButtonClicked = false;

            var timeLine = new TimelineMax();
            var closeButtonTl = new TimelineMax({
                repeat: -1,
                repeatDelay: 5,
                yoyo: true
            });
            var currentSlider;
            var sliderPages = ['surprising', 'serving', 'spending'];
            var tilePages = ['branding', 'engaging', 'humanchanneling', 'integrating', 'orienteering', 'positioning'];
            var imageCount = {
                surprising: 12,
                seving: 7,
                spending: 9
            };
            var count = 0;

            var easeValue = Power2.easeInOut;

            window.addEventListener(
                'popstate', function () {
                    location.reload();
                }
            );

            $(window).resize(
                viewport.changed(
                    function () {
                        if (viewport.is('xs')) {
                        }
                    }, 150
                )
            );

            $('.carousel.slide.popup, .carousel.slide.gallery').on(
                'keyup', function (e) {
                    $(this).parent().find('.pressed').removeClass('pressed');

                    // Right
                    if (e.keyCode == 39) {
                        $(this).parent().find('.right').focus().addClass('pressed');
                    }

                    // Left
                    else if (e.keyCode == 37) {
                        $(this).parent().find('.left').focus().addClass('pressed');
                    }
                }
            );

            //normal version reload page
            if (link !== "" && !isUtilityPage) {
                var thisItem = $(".main-menu [href=" + link + "]");
                var isPageExist = thisItem.length > 0;

                // If the page doesn't exist, redirect to home page.
                if (!isPageExist) {
                    location.href = '/';
                }

                thisItem.next().find('a').attr('tabindex', "0");
                thisItem.next().find('.imgShow-div .pause-button').attr('tabindex', "0");

                thisItem.addClass('orange');

                // Lazy load If the menu sub content has lazy load images
                var images, lazies, loader;
                var deferreds = [];

                if($.inArray(link, sliderPages) != -1) {
                    images = $(thisItem).parent().find('.imgShow-div .image-wrap').hide();
                    lazies = $(thisItem).parent().find('.imgShow-div .image-wrap').find('.lazy');
                    loader = $(thisItem).parent().find('.imgShow-div .imageVideo').find('.lazy-loading');

                    // loop over each img
                    lazies.each(
                        function () {
                            var self = $(this);
                            var datasrc, d;

                            datasrc = self.attr('data-src');
                            if (datasrc) {
                                d = $.Deferred();

                                self.one('load', d.resolve)
                                    .attr("src", datasrc)
                                    .attr('data-src', '');

                                deferreds.push(d.promise());
                            }
                        }
                    );

                    $.when.apply($, deferreds).done(
                        function () {
                            loader.fadeOut(1000);
                            images.fadeIn(1000);

                            var isSlider = $(thisItem).parent().find('.imgShow-div').find('.imageVideo').length > 0;
                            if(isSlider) {
                                $(thisItem).parent().find('.imgShow-div').find('.imageVideo').imageWrapHeights();

                                currentSlider = $(thisItem).parent().find('.imgShow-div').find('.imageVideo')[0].timeLineSlider;
                                currentSlider.play();
                            }
                        }
                    );
                }

                if($.inArray(link, tilePages) != -1) {
                    images = $(thisItem).parent().find('.tile-container').hide();
                    lazies = $(thisItem).parent().find('.tile-container').find('.lazy');
                    loader = $(thisItem).parent().find('.lazy-loading');

                    // loop over each img
                    lazies.each(
                        function () {
                            var self = $(this);
                            var datasrc, d;

                            datasrc = self.attr('data-src');
                            if (datasrc) {
                                d = $.Deferred();

                                self.one('load', d.resolve)
                                    .attr("src", datasrc)
                                    .attr('data-src', '');

                                deferreds.push(d.promise());
                            }
                        }
                    );

                    $.when.apply($, deferreds).done(
                        function () {
                            loader.fadeOut(1000);
                            images.fadeIn(1000);
                        }
                    );
                }

                var i = 0;

                thisItem.parent().siblings().each(
                    function () {
                        if (i == 0) {
                            timeLine.to(
                                $(this).children("a"), 0.5, {
                                    "css": {
                                        "fontSize": "20px"
                                    },
                                    ease: easeValue
                                }
                            );
                            i++;
                        } else {
                            timeLine.to(
                                $(this).children("a"), 0.5, {
                                    "css": {
                                        "fontSize": "20px"
                                    },
                                    ease: easeValue
                                }, "-=0.45"
                            );
                        }
                    }
                );

                timeLine.add(TweenLite.set(thisItem.next(), {height: "auto"}));
                timeLine.add(
                    TweenLite.from(
                        thisItem.next(), 0.5, {
                            "height": "0",
                            ease: easeValue
                        }
                    ), "-=0.35"
                );
                timeLine.add(
                    TweenLite.to(
                        thisItem.next().find('a'), 0.5, {
                            onComplete: function () {
                                thisItem.next().addClass('is-active');


                            }
                        }
                    )
                );

                closeButtonTl.clear();
                closeButtonTl.add(TweenMax.to(
                     thisItem.next().find('.sub-close-icon .subpage-close-button'), 2, {
                        "rotation": 360,
                        transformOrigin:"50% 50%",
                        ease:Sine.easeInOut
                    }
                ));

                isFirstClick = false;


            } else if (link !== "" && isUtilityPage) {
                // If the page is utility page with the orange menu down
                $(".arrow-down, .extension-header").slideDown();
                $(".shadow-main").show();
                $(".menuicon").addClass('is-active').parent("li").addClass('orange');

                $('.div-exlist').find('#utility-' + link).addClass('selected');
                $('.div-iconlist').find('#utility-' + link).parent().addClass('orange');
                $(".modal#" + link).modal('show');

                $('body').addClass('full-screen-modal-open');

                if (link == 'gallery-legacy') {
                    showGallery();
                }
            } else {
                // It's home
            }

            /////mobile swip menu/////
            $('.ham-icon').on(
                'click', function (e) {
                    e.preventDefault();
                    $(this).toggleClass('is-active');
                    $('body').toggleClass('nav-expanded');
                }
            );

            /**
             * Subpage tile item hover
             */
            $('.tile-item').not('.tile-disable').hover(
                function () {
                    TweenLite.to(
                        $(this), 0.1, {
                            "scale": 1.1
                        }
                    );
                }, function () {
                    TweenLite.to(
                        $(this), 0.1, {
                            "scale": 1
                        }
                    );
                }
            );

            /*
             *  Main menu animation
             */
            var colorGrey = "#555555";
            var colorLightGrey = "#949494";
            var colorOrange = '#f7a800';
            var colorLightOrange = '#ffe0ae';

            $(".main-menu .item").children("a").hover(
                function () {
                    // Prevent to open the same mobile modal
                    if ($(this).hasClass('orange')) {
                        return false;
                    }

                    // Prevent animation conflict
                    if (timeLine.isActive() == true) {
                        return false;
                    }

                    TweenLite.to(
                        $(this), 0.3, {
                            "scale": 1.1,
                            "color": colorOrange
                        }
                    );

                    TweenLite.to(
                        $(this).find('.grey'), 0.3, {
                            "color": colorLightOrange
                        }
                    );
                }, function () {
                    // Prevent to open the same mobile modal
                    if ($(this).hasClass('orange')) {
                        return false;
                    }

                    // Prevent animation conflict
                    if (timeLine.isActive() == true) {
                        return false;
                    }

                    var isLightGrey = $(this).hasClass('grey');

                    TweenLite.to(
                        $(this), 0.3, {
                            "scale": 1,
                            "color": isLightGrey ? colorLightGrey : colorGrey
                        }
                    );

                    TweenLite.to(
                        $(this).find('.grey'), 0.3, {
                            "color": colorLightGrey
                        }
                    );
                }
            );

            $(".main-menu .item").children("a").click(
                function () {
                    // Prevent to open the same mobile modal
                    if ($(this).hasClass('orange')) {
                        return false;
                    }

                    if (timeLine.isActive() == true) {
                        return false;
                    }

                    if(currentSlider) {
                        currentSlider.pause(0);
                    }

                    var elem = $(this).parent()[0];
                    var _this = this;
                    var colorGrey = "#555555";
                    var colorLightGrey = "#949494";
                    var previousItem = $('.item .orange');
                    var link = $(_this).attr('id');
                    count = 0;

                    //change url to be current subpage
                    $.cookie("previousUrl", window.location.href, {path: "/"});
                    window.history.pushState(null, null, "/" + $(this).attr("href"));

                    var images, lazies, loader;
                    var deferreds = [];

                    if($.inArray(link, sliderPages) != -1) {
                        images = $(_this).parent().find('.imgShow-div .image-wrap').hide();
                        lazies = $(_this).parent().find('.imgShow-div .image-wrap').find('.lazy');
                        loader = $(_this).parent().find('.imgShow-div .imageVideo').find('.lazy-loading');

                        // loop over each img
                        lazies.each(
                            function () {
                                var self = $(this);
                                var datasrc, d;

                                datasrc = self.attr('data-src');
                                if (datasrc) {
                                    d = $.Deferred();

                                    self.one('load', d.resolve)
                                        .attr("src", datasrc)
                                        .attr('data-src', '');

                                    deferreds.push(d.promise());
                                }
                            }
                        );

                        $.when.apply($, deferreds).done(
                            function () {
                                loader.fadeOut(1000);
                                images.fadeIn(1000);

                                var isSlider = $(_this).parent().find('.imgShow-div').find('.imageVideo').length > 0;
                                if(isSlider) {
                                    $(_this).parent().find('.imgShow-div').find('.imageVideo').imageWrapHeights();

                                    currentSlider = $(_this).parent().find('.imgShow-div').find('.imageVideo')[0].timeLineSlider;
                                    currentSlider.play();
                                }
                            }
                        );
                    }

                    if($.inArray(link, tilePages) != -1) {
                        images = $(_this).parent().find('.tile-container').hide();
                        lazies = $(_this).parent().find('.tile-container').find('.lazy');
                        loader = $(_this).parent().find('.lazy-loading');

                        // loop over each img
                        lazies.each(
                            function () {
                                var self = $(this);
                                var datasrc, d;

                                datasrc = self.attr('data-src');
                                if (datasrc) {
                                    d = $.Deferred();

                                    self.one('load', d.resolve)
                                        .attr("src", datasrc)
                                        .attr('data-src', '');

                                    deferreds.push(d.promise());
                                }
                            }
                        );

                        $.when.apply($, deferreds).done(
                            function () {
                                loader.fadeOut(1000);
                                images.fadeIn(1000);
                            }
                        );
                    }

                    if (isFirstClick == true) {
                        timeLine.clear();
                        timeLine.to(
                            $(this), 0.25, {
                                "scale": 1,
                                ease: easeValue
                            }
                        );

                        var i = 0;
                        $(this).parent().siblings().each(
                            function () {
                                if (i == 0) {
                                    timeLine.to(
                                        $(this).children("a"), 0.5, {
                                            "css": {
                                                "fontSize": "20px",
                                                "scale": 1
                                            },
                                            ease: easeValue
                                        }
                                    );
                                    i++;
                                } else {
                                    timeLine.to(
                                        $(this).children("a"), 0.5, {
                                            "css": {
                                                "fontSize": "20px",
                                                "scale": 1

                                            },
                                            ease: easeValue
                                        }, "-=0.45"
                                    );
                                }
                            }
                        );

                        timeLine.add(TweenLite.set($(this).next(), {height: "auto"}), 'feature');
                        timeLine.add(
                            TweenLite.from(
                                $(this).next(), 0.5, {
                                    "height": "0",
                                    ease: easeValue
                                }
                            ), "feature-=0.35"
                        );

                        timeLine.add(
                            TweenLite.to(
                                $(this).next(), 0.5, {
                                    onComplete: function () {
                                        $(_this).next().addClass('is-active');
                                    }
                                }
                            ), 'feature'
                        );

                        $(this).addClass('orange');

                        isFirstClick = false;
                    } else {
                        timeLine.clear();
                        timeLine.to(
                            $(this), 0.25, {
                                "scale": 1,
                                ease: easeValue
                            }
                        );

                        // Close the content box first
                        timeLine.to(
                            previousItem.next(), 0, {
                                onComplete: function () {
                                    previousItem.next().removeClass('is-active');
                                }
                            }, 'cleanup'
                        );
                        timeLine.to(
                            previousItem.next(), 0.5, {
                                "height": "0",
                                ease: easeValue
                            }, 'cleanup+=0.5'
                        );

                        var orangeClassElement = previousItem;
                        var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

                        if (isLightGrey) {
                            timeLine.to(
                                orangeClassElement, 0.5, {
                                    "color": colorLightGrey,
                                    "ease": easeValue
                                }, "cleanup+=0.25"
                            );
                        } else {
                            timeLine.to(
                                orangeClassElement, 0.5, {
                                    "color": colorGrey,
                                    "ease": easeValue
                                }, "cleanup+=0.25"
                            );

                            timeLine.to(
                                orangeClassElement.find('.grey'), 0.5, {
                                    "color": colorLightGrey,
                                    "ease": easeValue
                                }, "cleanup+=0.25"
                            );
                        }

                        $('.item .orange').next().find('a').attr('tabindex', "-1");
                        $('.item .orange').next(). find('.imgShow-div .pause-button').attr('tabindex', "-1");

                        $(this).parent().siblings().each(
                            function () {
                                if ($(this).children("a").hasClass("orange")) {

                                    timeLine.to(
                                        $(this).children("a"), 0.5, {
                                            "fontSize": "20px",
                                            "scale": 1,
                                            "ease": easeValue
                                        }, "feature"
                                    );

                                    timeLine.to(
                                        $(this).children("a").next(), 0.5, {
                                            "height": "0",
                                            "scale": 1,
                                            "ease": easeValue
                                        }, "feature+=0.25"
                                    );

                                    $(this).children("a").removeClass("orange");
                                }
                            }
                        );

                        // Remove orange class
                        $('.item').find('.orange').removeClass('orange');

                        timeLine.to($(this), 0.5, {"fontSize": "67px", "ease": easeValue}, "feature");

                        timeLine.add(TweenLite.set($(this).next(), {"height": "auto"}));
                        timeLine.add(
                            TweenLite.from(
                                $(this).next(), 0.5, {
                                    "height": "0",
                                    "ease": easeValue
                                }
                            ), "feature+=0.25"
                        );

                        timeLine.to(
                            $(this).next(), 0.5, {
                                onComplete: function () {
                                    $(_this).next().addClass('is-active');
                                }
                            }, 'feature'
                        );

                        $(this).addClass('orange');
                    }

                    closeButtonTl.clear();
                    closeButtonTl.add(TweenMax.to(
                        $(_this).next().find('.sub-close-icon .subpage-close-button'), 2, {
                            "rotation": 360,
                            transformOrigin:"50% 50%",
                            ease:Sine.easeInOut
                        }
                    ));

                    $(_this).next().find('a').attr('tabindex', "0");
                    $(_this).next().find('.imgShow-div .pause-button').attr('tabindex', "0");

                }
            );

            // Close icon hover state
            $(".sub-close-icon").hover(
                function () {
                    TweenMax.to(
                        $(this).find('.subpage-close-button'), 0.5, {
                            "rotation": 90,
                            transformOrigin:"50% 50%",
                            ease:Back.easeOut
                        }
                    );

                }, function () {
                    TweenMax.to(
                        $(this).find('.subpage-close-button'), 0.5, {
                            "rotation": 0,
                            transformOrigin:"50% 50%",
                            ease:Back.easeOut
                        }
                    );
                }
            );

            // Close icon click
            $(".sub-close-icon").click(
                function (e) {
                    var colorGrey = "#77777a";
                    var colorLightGrey = "#949494";
                    var pageContent = $(this).parent(".page-content");

                    e.preventDefault();
                    $.cookie("previousUrl", window.location.href, {path: "/"});
                    window.history.pushState(null, null, "/"); //change url to be homepage

                    // Clear the timeline
                    timeLine.clear();
                    timeLine.to(
                        pageContent, 0, {
                            onComplete: function () {
                                pageContent.removeClass('is-active');
                            }
                        }, 'cleanup+=0.5'
                    );
                    timeLine.to(
                        pageContent, 0.5, {
                            "height": "0",
                            ease: easeValue
                        }, "cleanup+=0.5"
                    );

                    var orangeClassElement = $('.item .orange');
                    var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

                    if (isLightGrey) {
                        timeLine.to(
                            orangeClassElement, 0.5, {
                                "color": colorLightGrey,
                                ease: easeValue
                            }, "cleanup+=0.25"
                        );
                    } else {
                        timeLine.to(
                            orangeClassElement, 0.5, {
                                "color": colorGrey,
                                ease: easeValue
                            }, "cleanup+=0.25"
                        );

                        timeLine.to(
                            orangeClassElement.find('.grey'), 0.5, {
                                "color": colorLightGrey,
                                ease: easeValue
                            }, "cleanup+=0.25"
                        );
                    }

                    // De-select the menu item
                    $(this).parent(".page-content").prev("a").removeClass("orange");

                    // Return animation
                    var i = 0;
                    $(this).parents(".item").siblings().each(
                        function () {
                            if (i == 0) {
                                timeLine.to(
                                    $(this).children("a"), 0.5, {
                                        "css": {
                                            "fontSize": "67px"
                                        }, ease: easeValue
                                    }
                                );
                                i++;
                            } else {
                                timeLine.to(
                                    $(this).children("a"), 0.5, {
                                        "css": {
                                            "fontSize": "67px"
                                        }, ease: easeValue
                                    }, "-=0.45"
                                );
                            }

                        }
                    );

                    $(this).parent(".page-content").find('a').attr('tabindex', "-1");
                    $(this).parent(".page-content").find('.pause-button').attr('tabindex', "-1");

                    isFirstClick = true;

                    currentSlider.clear();
                }
            );

            /**
             * Mobile Version menu script
             */
            initMobile();
            $(window).resize(
                viewport.changed(
                    function () {
                        if (viewport.is('xs')) {
                            initMobile();
                        }
                    }, 100
                )
            );

            // Mobile main menu click
            $(".mobile-item").click(
                function (e) {
                    e.preventDefault();
                    var target = $(this).find('a').attr('href');

                    //$.cookie("previousUrl", window.location.href, {path:"/"});
                    window.history.pushState(null, null, "/" + $(this).children("a").attr("href"));//change url to be current subpage
                    mobileButtonClicked = true;

                    $('.main-menu').find('#' + target).click();
                }
            );

            // Don't need this anymore
            $(".mobile-close").click(
                function (e) {
                    e.preventDefault();
                    window.history.pushState(null, null, "/"); //change url to be homepage

                    mobileButtonClicked = false;

                    // Close desktop menu content
                    var target = $(this).attr('data-id');
                    $('.main-menu').find('#' + target).parent().find('.page-content .sub-close-icon').click();
                }
            );

            // Mobile side menu
            $(".mobile-item-side").click(
                function (e) {
                    e.preventDefault();

                    var target = $(this).find('a').attr('href').replace('utility/', '');
                    var isUtility = $(this).hasClass('utility');

                    if (isUtility) {
                        //change url to be current subpage
                        window.history.pushState(null, null, "/utility/" + $(this).find("a").attr("href"));
                    } else {
                        //change url to be current subpage
                        window.history.pushState(null, null, "/" + $(this).find("a").attr("href"));
                    }

                    // change page icon and open page
                    $('.close-icon').addClass('hidden');
                    $('.ham-icon').removeClass('hidden').removeClass('is-active');
                    $('body').removeClass('nav-expanded');

                    //mobileButtonClicked = true;

                    if (!isUtility) {
                        $('.main-menu').find('#' + target).click();
                    } else {
                        if (target == 'gallery-legacy') {
                            if (!window.isGalleryOpen) {
                                showGallery();
                            }
                        }

                        $('.modal#' + target).modal('show');
                    }
                }
            );

            ////mobile pop photo modal////
            $(".mobile-pop").click(
                function () {
                    $($(this).attr("data-target")).show();
                }
            );

            $(".mobile-pop-close").click(
                function (e) {
                    e.preventDefault();
                    $($(this).attr("close-target")).hide();
                }
            );

            $(".carousel-inner").swipe(
                {
                    //Generic swipe handler for all directions
                    swipeLeft: function (event, direction, distance, duration, fingerCount) {
                        $(this).parent().carousel('next');
                    },
                    swipeRight: function () {
                        $(this).parent().carousel('prev');
                    }
                }
            );

        }
    );

    function initMobile() {
        $(".mobile-item").each(
            function (index, val) {
                $(this).attr('topv', $(this).position().top);
            }
        );

        var mobileMainMenu = $(".mobile-main-menu");

        mobileMainMenu.scroll(
            function () {
                var scroH = parseInt($(this).scrollTop());

                $(".mobile-main-ul li").each(
                    function () {
                        if (scroH + 75 >= parseInt($(this).attr("topv"))) {
                            $(".mobile-main-ul li").css("opacity", "0");

                            TweenLite.to($(this).children("a"), 0.2, {"fontSize": "41px"});
                            TweenLite.to($(this).siblings().children("a"), 0.2, {"fontSize": "26px"});

                            $(this).css("opacity", "1").prev().css("opacity", "0.6").prev().css("opacity", "0.3");
                            $(this).next().css("opacity", "0.8").next().css("opacity", "0.6").next().css("opacity", "0.4").next().css("opacity", "0.2");

                            $(".mobile-indicator-item").removeClass("active-indicator");

                            $("[indicator-target=" + $(this).children("a").attr("id") + "]").addClass("active-indicator");
                        }
                    }
                );
            }
        );

        mobileMainMenu.scrollTop(1);
    }

})(jQuery, ResponsiveBootstrapToolkit);

