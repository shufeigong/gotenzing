(function ($, viewport) {
    "use strict";

    // Normalize Heights
    $.fn.imageWrapHeights = function () {
        var textDiv = $(this).parent().prev();
        var subContainer = $(this).closest('.sub-container');
        var imgDiv = $(this).parent();
        var images = $(this).find('.image-item');
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
            } else {
                var height = textDiv.outerHeight() < 250 ? 250 : subContainerHeight;

                imageContainers.css({'height': height});
                imageWrap.css({'height': height});

                $('.image-item').imageScale(
                    {
                        fadeInDuration: 0.25
                    }
                );
            }
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
                call = setTimeout(normalizeHeights, 250); // run it again
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

            //initFirstClickMenuAnimation();
            //initNoFirstClickMenuAnimation();

            // Set tabindex to -1 for all the link
            $('.main-menu .page-content').find('a').attr('tabindex', "-1");

            var isFirstClick = true;

            // Use polyfill for history
            var location = window.history.location || window.location;

            var link = location.pathname.split('/').pop();
            var isUtilityPage = location.pathname.search('/utility/') !== -1;

            var mobileButtonClicked = false;

            var timeLine = new TimelineMax();

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

            $('.carousel.slide.subpage .carousel-control, .carousel.slide.popup, .carousel.slide.gallery').on(
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

            //if ($(window).width() > 640) {
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
                if(link != 'whoswho') {
                    new LazyLoad(
                        {
                            container: $(thisItem).parent().find('.imgShow-div')[0],
                            callback_load: function () {
                                $(thisItem).parent().find('.imgShow-div').find('.image-loading-icon').fadeOut(1000);

                                $(window).resize();
                            }
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
            $('.tile-item').hover(
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

                    var elem = $(this).parent()[0];
                    var _this = this;
                    var colorGrey = "#555555";
                    var colorLightGrey = "#949494";
                    var previousItem = $('.item .orange');

                    //change url to be current subpage
                    $.cookie("previousUrl", window.location.href, {path: "/"});
                    window.history.pushState(null, null, "/" + $(this).attr("href"));

                    // Lazy load If the menu sub content has lazy load images
                    if($(_this).attr('id') != 'whoswho') {
                        //new Blazy({
                        //    container: '#' + $(_this).attr('id') + '-container',
                        //    success: function(ele) {
                        //        console.log(ele);
                        //        $(_this).parent().find('.imgShow-div').find('.image-loading-icon').fadeOut();
                        //        $(window).resize();
                        //    }
                        //});

                        new LazyLoad(
                            {
                                container: $(_this).parent().find('.imgShow-div')[0],
                                callback_load: function () {
                                    $(_this).parent().find('.imgShow-div').find('.image-loading-icon').fadeOut();
                                    $(window).resize();
                                }
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

                    $(_this).next().find('a').attr('tabindex', "0");
                    $(_this).next().find('.imgShow-div .pause-button').attr('tabindex', "0");

                }
            );

            // Close icon hover state
            $(".sub-close-icon").hover(
                function () {
                    TweenMax.to(
                        $(this), 0.1, {
                            "rotation": 90,
                            transformOrigin:"54% 52%",
                            ease:Back.easeOut
                        }
                    );

                }, function () {
                    TweenMax.to(
                        $(this), 0.1, {
                            "rotation": 0,
                            transformOrigin:"54% 52%",
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

