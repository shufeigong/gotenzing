(function ($, viewport) {
    // Reset cookie
    $.removeCookie('previousUrl', {'path': '/'});
    $.removeCookie("utilityMenuOpen");
    window.isGalleryOpen = false;

    $(document).ready(function () {
        initFirstClickMenuAnimation();
        initNoFirstClickMenuAnimation();

        // Set tabindex to -1 for all the link
        $('.main-menu .page-content').find('a').attr('tabindex', "-1");

        var isFirstClick = true;
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

        // Use polyfill for history
        var location = window.history.location || window.location;

        var link = location.pathname.split('/').pop();
        var isUtilityPage = location.pathname.search('/utility/') !== -1;

        var mobileButtonClicked = false;

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
            thisItem.next().find('a').attr('tabindex', "0");
            thisItem.addClass('orange');
            var i = 0;

            thisItem.parent().siblings().each(function () {
                if (i == 0) {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "css": {
                            "fontSize": "20px"
                        },
                        ease: easeValue
                    }));
                    i++;
                } else {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "css": {
                            "fontSize": "20px"
                        },
                        ease: easeValue
                    }), "-=0.45");
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
            $(".menuicon").parent("li").addClass('orange');

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
            $(".arrow-down, .extension-header").slideToggle();
            $(".shadow-main").toggle();
            $(this).parent("li").toggleClass('orange');
        });

        /////mobile swip menu/////
        $('.ham-icon').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');

            $('.close-icon').removeClass('hidden');
            $('.ham-icon').removeClass('visible-xs').addClass('hidden');
        });
        $('.close-icon').on('click', function (e) {
            e.preventDefault();
            $('body').removeClass('nav-expanded');

            $('.close-icon').addClass('hidden');
            $('.ham-icon').removeClass('hidden');
        });

        /*
         *  Main menu animation
         */

        $(".item").children("a").hover(function () {
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

        $(".item").children("a").click(function () {
            // Prevent to open the same mobile modal
            if ($(this).hasClass('orange')) {
                return false;
            }

            var elem = $(this).parent()[0];
            var _this = this;
            var colorGrey = "#77777a";
            var colorLightGrey = "#b9b8ba";

            $('.mobile-content').find('.modal.mobile-modal.in').modal('hide');

            //change url to be current subpage
            $.cookie("previousUrl", window.location.href, {path: "/"});
            window.history.pushState(null, null, "/" + $(this).attr("href"));

            if (isFirstClick == true) {
                timeLine.clear();
                var i = 0;
                $(this).parent().siblings().each(function () {
                    if (i == 0) {
                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "css": {
                                "fontSize": "20px",
                                "line-height": "18px"
                            },
                            ease: easeValue
                        }));
                        i++;
                    } else {
                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "css": {
                                "fontSize": "20px",
                                "line-height": "18px"
                            },
                            ease: easeValue
                        }), "-=0.45");
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
                timeLine.add(TweenLite.to($('.item .orange').next(), 0.5, {"height": "0", ease: easeValue}), "cleanup");

                var orangeClassElement = $('.item .orange');
                var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

                if (isLightGrey) {
                    timeLine.add(TweenLite.to(orangeClassElement, 0.5, {
                        "color": colorLightGrey,
                        ease: easeValue
                    }), "cleanup+=0.25");
                } else {
                    timeLine.add(TweenLite.to(orangeClassElement, 0.5, {
                        "color": colorGrey,
                        ease: easeValue
                    }), "cleanup+=0.25");

                    timeLine.add(TweenLite.to(orangeClassElement.find('.grey'), 0.5, {
                        "color": colorLightGrey,
                        ease: easeValue
                    }), "cleanup+=0.25");
                }

                timeLine.add(TweenLite.to($('.item .orange'), 0.5, {
                    "css": {
                        "line-height": "18px"
                    },
                    ease: easeValue
                }), "feature");

                $('.item .orange').next().find('a').attr('tabindex', "-1");

                $(this).parent().siblings().each(function () {
                    if ($(this).children("a").hasClass("orange")) {

                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "20px",
                            ease: easeValue
                        }), "feature");

                        timeLine.add(TweenLite.to($(this).children("a").next(), 0.5, {
                            "height": "0",
                            ease: easeValue
                        }), "feature+=0.25");

                        $(this).children("a").removeClass("orange");
                    }
                });

                // Remove orange class
                $('.item').find('.orange').removeClass('orange');

                timeLine.add(TweenLite.to($(this), 0.5, {"css": {"line-height": "60px"}, ease: easeValue}), "feature");
                timeLine.add(TweenLite.to($(this), 0.5, {"fontSize": "67px", ease: easeValue}), "feature");

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
            var colorLightGrey = "#b9b8ba";

            e.preventDefault();
            $.cookie("previousUrl", window.location.href, {path: "/"});
            window.history.pushState(null, null, "/"); //change url to be homepage

            // Clear the timeline
            timeLine.clear();
            timeLine.add(TweenLite.to($(this).parent(".page-content"), 0.5, {
                "height": "0",
                ease: easeValue
            }), "cleanup");

            var orangeClassElement = $('.item .orange');
            var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

            if (isLightGrey) {
                timeLine.add(TweenLite.to(orangeClassElement, 0.5, {
                    "color": colorLightGrey,
                    ease: easeValue
                }), "cleanup+=0.25");
            } else {
                timeLine.add(TweenLite.to(orangeClassElement, 0.5, {
                    "color": colorGrey,
                    ease: easeValue
                }), "cleanup+=0.25");

                timeLine.add(TweenLite.to(orangeClassElement.find('.grey'), 0.5, {
                    "color": colorLightGrey,
                    ease: easeValue
                }), "cleanup+=0.25");
            }

            // De-select the menu item
            $(this).parent(".page-content").prev("a").removeClass("orange");

            // Return animation
            var i = 0;
            $(this).parents(".item").siblings().each(function () {
                if (i == 0) {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "css": {
                            "fontSize": "67px",
                            "line-height": "60px"
                        }, ease: easeValue
                    }
                    ));
                    i++;
                } else {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "css": {
                            "fontSize": "67px",
                            "line-height": "60px"
                        }, ease: easeValue
                    }), "-=0.45");
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

            var target = $(this).find('a').attr('href').replace('utility/', '');

            mobileButtonClicked = true;
            $('.main-menu').find('#' + target).click();

            if(!isUtility) {
                // Open desktop menu content
                //if (!$('.main-menu').find('#' + target).hasClass('orange')) {
                //    //$('.main-menu').find('#' + target).click();
                //}
                //
                //var mainMenuItem = $('.main-menu').find('#' + target);
                //timeLine.clear();
                //mainMenuItem.addClass('orange');
                //
                //var i = 0;
                //mainMenuItem.parent().siblings().each(function () {
                //    if (i == 0) {
                //        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                //            "fontSize": "20px",
                //            ease: easeValue
                //        }));
                //        i++;
                //    } else {
                //        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                //            "fontSize": "20px",
                //            ease: easeValue
                //        }), "-=0.45");
                //    }
                //});
                //
                //timeLine.add(TweenLite.set(mainMenuItem.next(), {height: "auto"}));
                //timeLine.add(TweenLite.from(mainMenuItem.next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");



            } else {
                //$('.modal#'+target).modal('show');
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

        $(".carousel-inner.gallerypage").swipe( {
            //Generic swipe handler for all directions
            swipeLeft:function(event, direction, distance, duration, fingerCount) {
                $(this).parent().carousel('prev');
            },
            swipeRight: function() {
                $(this).parent().carousel('next');
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:0
        });

    });

    function initMobile() {
        $(".mobile-item").each(function (index, val) {
            $(this).attr('topv', $(this).position().top);
        });

        $(".mobile-main-menu").scroll(function () {
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

        $(".mobile-main-menu").scrollTop(1);
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

            fontTl.add(TweenLite.set($(menu).next(), {height: "auto"}));
            fontTl.add(TweenLite.from($(menu).next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");

            fontTl.add(TweenLite.to(menu, 0.5, {onComplete: function() {
                $(menu).addClass('orange');
            }}));

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

            fontTl.add(TweenLite.to(orangeClassElement.next(), 0.5, {"height": "0", ease: easeValue}), "cleanup");

            var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

            // Color changes
            //if(isLightGrey) {
            //    fontTl.add(TweenLite.to(orangeClassElement, 0.5, {
            //        "color": colorLightGrey,
            //        ease: easeValue
            //    }), "cleanup+=0.25");
            //} else {
                fontTl.add(TweenLite.to(orangeClassElement, 0.5, {
                    "color": colorGrey,
                    ease: easeValue
                }), "cleanup+=0.25");

                fontTl.add(TweenLite.to(orangeClassElement.find('.grey'), 0.5, {
                    "color": colorLightGrey,
                    ease: easeValue
                }), "cleanup+=0.25");
            //}

            fontTl.add(TweenLite.to($('.item .orange'), 0.5, {
                "css": {
                    "line-height": "18px"
                },
                ease: easeValue
            }), "feature");

            $(element).siblings().each(function (index, elem) {
                var sibling = $(elem).find('> a');

                if ($(sibling).hasClass("orange")) {

                    fontTl.add(TweenLite.to(sibling, 0.5, {
                        "css": {
                            "fontSize": smallFontSize,
                            "line-height": "18px"
                        },
                        ease: easeValue
                    }), "feature");

                    fontTl.add(TweenLite.to($(sibling).next(), 0.5, {
                        "height": "0",
                        ease: easeValue
                    }), "feature+=0.25");

                    $(sibling).removeClass("orange");
                }
            });

            fontTl.add(TweenLite.to(menu, 0.5, {onComplete: function() {
                $('.item').find('.orange').removeClass('orange');
            }}));

            fontTl.add(TweenLite.to(menu, 0.5, {"fontSize": "67px", ease: easeValue}), "feature");
            fontTl.add(TweenLite.set($(menu).next(), {height: "auto"}));
            fontTl.add(TweenLite.from($(menu).next(), 0.5, {"height": "0", ease: easeValue}), "feature+=0.25");

            fontTl.add(TweenLite.to(menu, 0.5, {onComplete: function() {
                $(menu).addClass('orange');
            }}));

            element.noFirstClickFontAnimation = fontTl;
        });
    }

})(jQuery, ResponsiveBootstrapToolkit);

