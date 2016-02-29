(function ($, viewport) {
    "use strict";

    // Normalize Bootstrap Carousel Heights
    $.fn.carouselHeights = function() {
        var items = $(this).find('.item'), // grab all slides
            heights = [], // create empty array to store height values
            widths = [],
            tallest, // create variable to make note of the tallest slide
            widest,
            call;
        var normalizeHeights = function() {
            items.each(function() { // add heights to array
                heights.push($(this).outerHeight());
                widths.push($(this).outerWidth());

            });

            tallest = Math.max.apply(null, heights); // cache largest value
            widest = Math.max.apply(null, widths);
            items.css({'height': tallest});
        };
        normalizeHeights();
        $(window).on('resize orientationchange', function() {
            // reset vars
            tallest = 0;
            heights.length = 0;
            items.css('height', ''); // reset height
            if(call){
                clearTimeout(call);
            }
            call = setTimeout(normalizeHeights, 100); // run it again
        });
    };

    // Reset cookie
    $.removeCookie('previousUrl', {'path': '/'});
    $.removeCookie("utilityMenuOpen");


    $(window).load(function() {
        $('.carousel.subpage, .carousel.mobile').each(function(){
            $(this).carouselHeights();
        });

    });

    $(document).ready(function () {
        window.isGalleryOpen = false;

        initFirstClickMenuAnimation();
        initNoFirstClickMenuAnimation();

        // Set tabindex to -1 for all the link
        $('.main-menu .page-content').find('a').attr('tabindex', "-1");

        var isFirstClick = true;

        // Use polyfill for history
        var location = window.history.location || window.location;

        var link = location.pathname.split('/').pop();
        var isUtilityPage = location.pathname.search('/utility/') !== -1;

        var mobileButtonClicked = false;

        var timeLine = new TimelineMax({
            onComplete: function () {
                $(".entry-content .main-menu li.item").each(function () {
                    var fontSize = $(this).find('> a').css('font-size');
                    if (fontSize == '67px' || fontSize == '70px') {
                        $(this).find('> a').css('line-height', '60px');
                    } else {
                        $(this).find('> a').css('line-height', '18px');
                    }
                });
            }
        });

        var easeValue = Power2.easeInOut;

        window.addEventListener('popstate', function () {
            location.reload();
        });

        $(window).resize(
            viewport.changed(function () {
                if (viewport.is('xs')) {
                }
            }, 150)
        );

        //if ($(window).width() > 640) {
        //normal version reload page
        if (link !== "" && !isUtilityPage) {
            var thisItem = $("[href=" + link + "]");
            var isPageExist = thisItem.length > 0;

            // If the page doesn't exist, redirect to home page.
            if(!isPageExist) {
                location.href = '/';
            }

            thisItem.next().find('a').attr('tabindex', "0");
            thisItem.addClass('orange');
            var i = 0;

            thisItem.parent().siblings().each(function () {
                if (i == 0) {
                    timeLine.to($(this).children("a"), 0.5, {
                        "css": {
                            "fontSize": "20px"
                        },
                        ease: easeValue
                    });
                    i++;
                } else {
                    timeLine.to($(this).children("a"), 0.5, {
                        "css": {
                            "fontSize": "20px"
                        },
                        ease: easeValue
                    }, "-=0.45");
                }
            });

            timeLine.add(TweenLite.set(thisItem.next(), {height: "auto"}));
            timeLine.add(TweenLite.from(thisItem.next(), 0.5, {
                "height": "0",
                ease: easeValue
            }), "-=0.35");


            isFirstClick = false;

        } else if (link !== "" && isUtilityPage) {
            // If the page is utility page with the orange menu down
            $(".arrow-down, .extension-header").slideDown();
            $(".shadow-main").show();
            $(".menuicon").addClass('is-active').parent("li").addClass('orange');

            $('.div-exlist').find('#utility-' + link).addClass('selected');
            $('.div-iconlist').find('#utility-' + link).parent().addClass('orange');
            $(".modal#" + link).modal('show');

            if (link == 'gallery-legacy') {
                showGallery();
            }
        } else {
            // If it's home
            //TweenMax.staggerFrom(".item", 0.5, {scale:0, opacity: 0, ease: easeValue}, 0.2);
        }

        //} else {
        //mobile version reload page
        $(".modal#" + link + "-mobile-page").modal('show');
        //}

        // Main page extend menu
        $(".menuicon").click(function () {
            $(this).toggleClass('is-active');
            $(".arrow-down, .extension-header").slideToggle();
            $(".shadow-main").toggle();
            $(this).parent("li").toggleClass('orange');
        });

        /////mobile swip menu/////
        $('.ham-icon').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('is-active');
            $('body').toggleClass('nav-expanded');
        });

        /*
         *  Main menu animation
         */
        $(".main-menu .item").children("a").hover(function () {
            // Prevent to open the same mobile modal
            if ($(this).hasClass('orange')) {
                return false;
            }

            // Prevent animation conflict
            if ( timeLine.isActive() == true ) {
                return false;
            }

            var elem = $(this).parent()[0];


            if (isFirstClick) {
                elem.firstClickAnimation.play();
            } else {
                elem.noFirstClickAnimation.play();
            }

        }, function () {
            // Prevent to open the same mobile modal
            if ($(this).hasClass('orange')) {
                return false;
            }

            // Prevent animation conflict
            if ( timeLine.isActive() == true ) {
                return false;
            }

            var elem = $(this).parent()[0];

            if (isFirstClick) {
                elem.firstClickAnimation.reverse();
            } else {
                elem.noFirstClickAnimation.reverse();
            }
        });

        $(".main-menu .item").children("a").click(function () {
            // Prevent to open the same mobile modal
            if ($(this).hasClass('orange')) {
                return false;
            }

            var elem = $(this).parent()[0];
            var _this = this;
            var colorGrey = "#77777a";
            var colorLightGrey = "#949494";

            $('.mobile-content').find('.modal.mobile-modal.in').modal('hide');

            //change url to be current subpage
            $.cookie("previousUrl", window.location.href, {path: "/"});
            window.history.pushState(null, null, "/" + $(this).attr("href"));

            if (isFirstClick == true) {
                timeLine.clear();
                var i = 0;
                $(this).parent().siblings().each(function () {
                    if (i == 0) {
                        timeLine.to($(this).children("a"), 0.5, {
                            "css": {
                                "fontSize": "20px",
                                "line-height": "18px"
                            },
                            ease: easeValue
                        });
                        i++;
                    } else {
                        timeLine.to($(this).children("a"), 0.5, {
                            "css": {
                                "fontSize": "20px",
                                "line-height": "18px"
                            },
                            ease: easeValue
                        }, "-=0.45");
                    }
                });

                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");
                //elem.firstClickFontAnimation.play();
                $(this).addClass('orange');

                isFirstClick = false;
            } else {
                timeLine.clear();
                // Close the content box first
                timeLine.to($('.item .orange').next(), 0.5, {"height": "0", ease: easeValue}, "cleanup");

                var orangeClassElement = $('.item .orange');
                var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

                if (isLightGrey) {
                    timeLine.to(orangeClassElement, 0.5, {
                        "color": colorLightGrey,
                        ease: easeValue
                    }, "cleanup+=0.25");
                } else {
                    timeLine.to(orangeClassElement, 0.5, {
                        "color": colorGrey,
                        ease: easeValue
                    }, "cleanup+=0.25");

                    timeLine.to(orangeClassElement.find('.grey'), 0.5, {
                        "color": colorLightGrey,
                        ease: easeValue
                    }, "cleanup+=0.25");
                }

                timeLine.to($('.item .orange'), 0.5, {
                    "css": {
                        "line-height": "18px"
                    },
                    ease: easeValue
                }, "feature");

                $('.item .orange').next().find('a').attr('tabindex', "-1");

                $(this).parent().siblings().each(function () {
                    if ($(this).children("a").hasClass("orange")) {

                        timeLine.to($(this).children("a"), 0.5, {
                            "fontSize": "20px",
                            ease: easeValue
                        }, "feature");

                        timeLine.to($(this).children("a").next(), 0.5, {
                            "height": "0",
                            ease: easeValue
                        }, "feature+=0.25");

                        $(this).children("a").removeClass("orange");
                    }
                });

                // Remove orange class
                $('.item').find('.orange').removeClass('orange');

                timeLine.to($(this), 0.5, {"css": {"line-height": "60px"}, ease: easeValue}, "feature");
                timeLine.to($(this), 0.5, {"fontSize": "67px", ease: easeValue}, "feature");

                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "feature+=0.25");

                $(this).addClass('orange');
                //elem.noFirstClickFontAnimation.play();
            }

            $(_this).next().find('a').attr('tabindex', "0");

            // Open mobile content
            if(!mobileButtonClicked) {
                var target = $(this).attr('id');
                $('#' + target + '-mobile-page').modal('show');
            }
        });

        $(".sub-close-icon").click(function (e) {
            var colorGrey = "#77777a";
            var colorLightGrey = "#949494";

            e.preventDefault();
            $.cookie("previousUrl", window.location.href, {path: "/"});
            window.history.pushState(null, null, "/"); //change url to be homepage

            // Clear the timeline
            timeLine.clear();
            timeLine.to($(this).parent(".page-content"), 0.5, {
                "height": "0",
                ease: easeValue
            }, "cleanup");

            var orangeClassElement = $('.item .orange');
            var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

            if (isLightGrey) {
                timeLine.to(orangeClassElement, 0.5, {
                    "color": colorLightGrey,
                    ease: easeValue
                }, "cleanup+=0.25");
            } else {
                timeLine.to(orangeClassElement, 0.5, {
                    "color": colorGrey,
                    ease: easeValue
                }, "cleanup+=0.25");

                timeLine.to(orangeClassElement.find('.grey'), 0.5, {
                    "color": colorLightGrey,
                    ease: easeValue
                }, "cleanup+=0.25");
            }

            // De-select the menu item
            $(this).parent(".page-content").prev("a").removeClass("orange");

            // Return animation
            var i = 0;
            $(this).parents(".item").siblings().each(function () {
                if (i == 0) {
                    timeLine.to($(this).children("a"), 0.5, {
                        "css": {
                            "fontSize": "67px",
                            "line-height": "60px"
                        }, ease: easeValue
                    }
                    );
                    i++;
                } else {
                    timeLine.to($(this).children("a"), 0.5, {
                        "css": {
                            "fontSize": "67px",
                            "line-height": "60px"
                        }, ease: easeValue
                    }, "-=0.45");
                }

            });

            $(this).parent(".page-content").find('a').attr('tabindex', "-1");

            // Close mobile content as well
            var target = $(this).closest('li.item').find('a').attr('id');
            $('#' + target + '-mobile-page').modal('hide');

            isFirstClick = true;
        });


        /**
         * Mobile Version menu script
         */

        initMobile();
        $(window).resize(
            viewport.changed(function () {
                if (viewport.is('xs')) {
                    initMobile();
                }
            }, 100)
        );

        // Mobile click event
        // Mobile main menu
        $(".mobile-item").click(function (e) {
            e.preventDefault();
            var target = $(this).find('a').attr('href');

            //$.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/" + $(this).children("a").attr("href"));//change url to be current subpage
            $("body").css("overflow-y", "hidden");

            mobileButtonClicked = true;

            $('.main-menu').find('#' + target).click();
        });

        $(".mobile-close").click(function (e) {
            e.preventDefault();
            window.history.pushState(null, null, "/"); //change url to be homepage

            mobileButtonClicked = false;

            // Close desktop menu content
            var target = $(this).attr('data-id');
            $('.main-menu').find('#' + target).parent().find('.page-content .sub-close-icon').click();
        });

        // Mobile side menu
        $(".mobile-item-side").click(function (e) {
            e.preventDefault();

            var target = $(this).find('a').attr('href').replace('utility/', '');
            var isUtility = $(this).hasClass('utility');

            if(isUtility) {
                //change url to be current subpage
                window.history.pushState(null, null, "/utility/" + $(this).find("a").attr("href"));
            } else {
                //change url to be current subpage
                window.history.pushState(null, null, "/" + $(this).find("a").attr("href"));
            }

            // change page icon and open page
            $('.close-icon').addClass('hidden');
            $('.ham-icon').removeClass('hidden');
            $('body').removeClass('nav-expanded');


            //mobileButtonClicked = true;

            if(!isUtility) {
                $('.main-menu').find('#' + target).click();
            } else {
                if(target == 'gallery-legacy') {
                    if(!window.isGalleryOpen) {
                        showGallery();
                    }
                }

                $('.modal#'+target).modal('show');
            }
        });

        ////mobile pop photo modal////
        $(".mobile-pop").click(function () {
            $($(this).attr("data-target")).show();
        });

        $(".mobile-pop-close").click(function (e) {
            e.preventDefault();
            $($(this).attr("close-target")).hide();
        });

        $(".carousel-inner").swipe({
            //Generic swipe handler for all directions
            swipeLeft:function(event, direction, distance, duration, fingerCount) {
                $(this).parent().carousel('next');
            },
            swipeRight: function() {
                $(this).parent().carousel('prev');
            }
        });

    });

    function initMobile() {
        $(".mobile-item").each(function (index, val) {
            $(this).attr('topv', $(this).position().top);
        });

        var mobileMainMenu = $(".mobile-main-menu");

        mobileMainMenu.scroll(function () {
            var scroH = parseInt($(this).scrollTop());

            $(".mobile-main-ul li").each(function () {
                if (scroH + 75 >= parseInt($(this).attr("topv"))) {
                    $(".mobile-main-ul li").css("opacity", "0");

                    TweenLite.to($(this).children("a"), 0.2, {"fontSize": "41px"});
                    TweenLite.to($(this).siblings().children("a"), 0.2, {"fontSize": "26px"});

                    $(this).css("opacity", "1").prev().css("opacity", "0.6").prev().css("opacity", "0.3");
                    $(this).next().css("opacity", "0.8").next().css("opacity", "0.6").next().css("opacity", "0.4").next().css("opacity", "0.2");

                    $(".mobile-indicator-item").removeClass("active-indicator");

                    $("[indicator-target=" + $(this).children("a").attr("id") + "]").addClass("active-indicator");
                }
            });
        });

        mobileMainMenu.scrollTop(1);
    }

    function initFirstClickMenuAnimation() {
        $('.main-menu ul > li.item').each(function (index, element) {
            var colorOrange = '#f7a800';
            var colorLightOrange = '#ffe0ae';

            var menu = $(element).find('> a');
            var hasGreyClass = $(menu).find('.grey');

            var tl = new TimelineMax({paused: true});
            var currentFontSize = 67;
            var fontSizeAdjustment = 3;
            var duration = 0.2;
            var easeValue = Power2.easeInOut;

            //if (hasGreyClass.length > 0) {
                tl.to(menu, duration, {
                    "css": {
                        "color": colorOrange,
                        "fontSize": (currentFontSize + fontSizeAdjustment) + "px"
                    },
                    ease: easeValue
                }, "hover");

                tl.to($(menu).find('.grey'), duration, {
                    "css": {
                        "color": colorLightOrange
                    },
                    ease: easeValue
                }, "hover");
            //} else {
            //    tl.to(menu, duration, {
            //        "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
            //        ease: easeValue
            //    });
            //}
            element.firstClickAnimation = tl;

            // Menu font animation
            var fontTl = new TimelineMax({paused: true});
            var bigFontSize = '67px';
            var smallFontSize = '20px';
            var i = 0;

            $(element).siblings().each(function (index, elem) {
                var sibling = $(elem).find('> a');
                if (i == 0) {
                    fontTl.to(sibling, 0.5, {
                        "css": {
                            "fontSize": smallFontSize,
                            "line-height": "18px"
                        },
                        ease: easeValue
                    });
                    i++;
                } else {
                    fontTl.to(sibling, 0.5, {
                        "css": {
                            "fontSize": smallFontSize,
                            "line-height": "18px"
                        },
                        ease: easeValue

                    }, "-=0.45");
                }
            });

            fontTl.set($(menu).next(), {height: "auto"});
            fontTl.from($(menu).next(), 0.5, {"height": "0", ease: easeValue}, "-=0.35");

            fontTl.to(menu, 0.5, {onComplete: function() {
                $(menu).addClass('orange');
            }});

            element.firstClickFontAnimation = fontTl;
        });
    }

    function initNoFirstClickMenuAnimation() {
        $('.main-menu ul > li.item').each(function (index, element) {
            var colorOrange = '#f7a800';
            var colorLightOrange = '#ffe0ae';

            var menu = $(element).find('> a');
            var hasGreyClass = $(menu).find('.grey');

            var tl = new TimelineMax({paused: true});
            var currentFontSize = 20;
            var fontSizeAdjustment = 3;
            var duration = 0.2;
            var easeValue = Power2.easeInOut;

            //if (hasGreyClass.length > 0) {
                tl.to(menu, duration, {
                    "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
                    ease: easeValue
                }, "hover");

                tl.to($(menu).find('.grey'), duration, {
                    "css": {"color": colorLightOrange},
                    ease: easeValue
                }, "hover");
            //} else {
            //    tl.to(menu, duration, {
            //        "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
            //        ease: easeValue
            //    });
            //}

            element.noFirstClickAnimation = tl;

            // Menu font animation
            var fontTl = new TimelineMax({paused: true});
            var bigFontSize = '67px';
            var smallFontSize = '20px';
            var colorGrey = "#77777a";
            var colorLightGrey = "#b9b8ba";
            var i = 0;

            // Close the content box first
            var orangeClassElement = $('.item').find('.orange');

            fontTl.to(orangeClassElement.next(), 0.5, {"height": "0", ease: easeValue}, "cleanup");

            var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

            // Color changes
            //if(isLightGrey) {
            //    fontTl.add(TweenLite.to(orangeClassElement, 0.5, {
            //        "color": colorLightGrey,
            //        ease: easeValue
            //    }), "cleanup+=0.25");
            //} else {
                fontTl.to(orangeClassElement, 0.5, {
                    "color": colorGrey,
                    ease: easeValue
                }, "cleanup+=0.25");

                fontTl.to(orangeClassElement.find('.grey'), 0.5, {
                    "color": colorLightGrey,
                    ease: easeValue
                }, "cleanup+=0.25");
            //}

            fontTl.to($('.item .orange'), 0.5, {
                "css": {
                    "line-height": "18px"
                },
                ease: easeValue
            }, "feature");

            $(element).siblings().each(function (index, elem) {
                var sibling = $(elem).find('> a');

                if ($(sibling).hasClass("orange")) {

                    fontTl.to(sibling, 0.5, {
                        "css": {
                            "fontSize": smallFontSize,
                            "line-height": "18px"
                        },
                        ease: easeValue
                    }, "feature");

                    fontTl.to($(sibling).next(), 0.5, {
                        "height": "0",
                        ease: easeValue
                    }, "feature+=0.25");

                    $(sibling).removeClass("orange");
                }
            });

            fontTl.to(menu, 0.5, {onComplete: function() {
                $('.item').find('.orange').removeClass('orange');
            }});

            fontTl.to(menu, 0.5, {"fontSize": "67px", ease: easeValue}, "feature");
            fontTl.set($(menu).next(), {height: "auto"});
            fontTl.from($(menu).next(), 0.5, {"height": "0", ease: easeValue}, "feature+=0.25");

            fontTl.to(menu, 0.5, {onComplete: function() {
                $(menu).addClass('orange');
            }});

            element.noFirstClickFontAnimation = fontTl;
        });
    }

    function getPageCarousel(url) {
        if(url == '') {
            return false;
        }

        $.ajax({
            url: '/templates/carousels/'+url+'.html'
        })
            .done(function(data) {
                $('#' + url).parent().find('.imgShow-div').html(data);

                $('.carousel.subpage').each(function(){
                    $(this).carouselHeights();
                });
            });
    }

})(jQuery, ResponsiveBootstrapToolkit);

