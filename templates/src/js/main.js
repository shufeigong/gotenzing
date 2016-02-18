(function ($, viewport) {
    // Reset cookie
    $.removeCookie('previousUrl', {'path': '/'});
    $.removeCookie("utilityMenuOpen");

    $(document).ready(function () {
        initFirstClickMenuAnimation();
        initNoFirstClickMenuAnimation();

        var isFirstClick = true;
        var timeLine = new TimelineMax();

        var easeValue = Power2.easeInOut;

        // Use polyfill for history
        var location = window.history.location || window.location;

        var link = location.pathname.split('/').pop();
        var isUtilityPage = location.pathname.search('/utility/') !== -1;

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
            thisItem.addClass('orange');
            var i = 0;

            thisItem.parent().siblings().each(function () {
                if (i == 0) {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "fontSize": "20px",
                        ease: easeValue
                    }));
                    i++;
                } else {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "fontSize": "20px",
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
            $(".modal#" + link).modal('show');
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
            $('.ham-icon').addClass('hidden');
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

            var elem = $(this).parent()[0];

            if(isFirstClick) {
                elem.firstClickAnimation.play();
            } else {
                elem.noFirstClickAnimation.play();
            }

        }, function () {
            // Prevent to open the same mobile modal
            if ($(this).hasClass('orange')) {
                return false;
            }

            var elem = $(this).parent()[0];

            if(isFirstClick) {
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

            var colorGrey = "#77777a";
            var colorLightGrey = "#b9b8ba";

            $('.mobile-content').find('.modal.mobile-modal.in').modal('hide');

            //change url to be current subpage
            $.cookie("previousUrl", window.location.href, {path: "/"});
            window.history.pushState(null, null, "/" + $(this).attr("href"));

            if (isFirstClick == true) {
                timeLine.clear();
                $(this).addClass('orange');
                var i = 0;
                $(this).parent().siblings().each(function () {
                    if (i == 0) {
                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "20px",
                            ease: easeValue
                        }));
                        i++;
                    } else {
                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "20px",
                            ease: easeValue
                        }), "-=0.45");
                    }
                });

                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");

                isFirstClick = false;
            } else {
                timeLine.clear();

                // Close the content box first
                timeLine.add(TweenLite.to($('.item .orange').next(), 0.5, {"height": "0", ease: easeValue}), "cleanup");

                var orangeClassElement = $('.item .orange');
                var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';


                if(isLightGrey) {
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

                timeLine.add(TweenLite.to($(this), 0.5, {"fontSize": "67px", ease: easeValue}), "feature");
                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "feature+=0.25");

                $(this).addClass('orange');
            }

            // Open mobile content
            var target = $(this).attr('id');
            $('#' + target + '-mobile-page').modal('show');
        });

        $(".sub-close-icon").click(function (e) {
            var colorGrey = "#77777a";
            var colorLightGrey = "#b9b8ba";

            e.preventDefault();
            $.cookie("previousUrl", window.location.href, {path: "/"});
            window.history.pushState(null, null, "/"); //change url to be homepage

            // Clear the timeline
            timeLine.clear();
            timeLine.add(TweenLite.to($(this).parent(".page-content"), 0.5, {"height": "0", ease: easeValue}), "cleanup");

            var orangeClassElement = $('.item .orange');
            var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';

            if(isLightGrey) {
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
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize": "67px", ease: easeValue}));
                    i++;
                } else {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "fontSize": "67px",
                        ease: easeValue
                    }), "-=0.45");
                }

            });

            // Close mobile content as well
            var target = $(this).closest('li.item').find('a').attr('id');
            $('#' + target + '-mobile-page').modal('hide');

            isFirstClick = true;
        });

        // Set push state for utility menu
        $('.div-exlist a').on('click', function () {
            // Return false if the menu is already selected
            if($(this).hasClass('selected')) {
                return false;
            }

            $('.div-exlist a.selected').removeClass('selected');
            $(this).addClass('selected');

            if ($.cookie('utilityMenuOpen') == null) {
                $.cookie("previousUrl", window.location.href, {path: "/"});
                $.cookie("utilityMenuOpen", true);
            }

            window.history.pushState(null, null, $(this).attr("id").replace('utility-', '/utility/'));

            // Open Mobile utility menu content
            var target = $(this).attr("data-id");
            $('#' + target + '-mobile-page').modal('show');
        });

        // Close utility menu content
        $('.utility-close-icon').on('click', function () {
            var target = $(this).closest('.modal-fullscreen').attr('id');
            $('#' + target + '-mobile-page').modal('hide');
        });

        // Set push state for utility social icon menu
        $(".div-iconlist ul li a").not('.menuicon').on('click', function () {

            if ($.cookie('utilityMenuOpen') == null) {
                $.cookie("previousUrl", window.location.href, {path: "/"});
                $.cookie("utilityMenuOpen", true);
            }
            window.history.pushState(null, null, $(this).attr("id").replace('utility-', '/utility/'));

            var target = $(this).attr('data-id');
            $('#' + target + '-mobile-page').modal('show');
        });

        //$(".sub-img-container").imagefill();
        //$(".slide-container").imagefill();
        //$(".pop-img-container").imagefill();
    });

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

            if (hasGreyClass.length > 0) {
                tl.to(menu, duration, {
                    "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
                    ease: easeValue
                });

                tl.to($(menu).find('.grey'), duration, {
                    "css": {"color": colorLightOrange},
                    ease: easeValue
                }, "-=" + duration);
            } else {
                tl.to(menu, duration, {
                    "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
                    ease: easeValue
                });
            }
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
                            "fontSize": smallFontSize
                        },
                        ease: easeValue
                    });
                    i++;
                } else {
                    fontTl.to(sibling, 0.5, {
                        "css": {
                            "fontSize": smallFontSize
                        },
                        ease: easeValue

                    }, "-=0.45");
                }
            });

            fontTl.add(TweenLite.set($(menu).next(), {height: "auto"}));
            fontTl.add(TweenLite.from($(menu).next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");

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

            if (hasGreyClass.length > 0) {
                tl.to(menu, duration, {
                    "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
                    ease: easeValue
                });

                tl.to($(menu).find('.grey'), duration, {
                    "css": {"color": colorLightOrange},
                    ease: easeValue
                }, "-=" + duration);
            } else {
                tl.to(menu, duration, {
                    "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
                    ease: easeValue
                });
            }

            element.noFirstClickAnimation = tl;

            // Menu font animation
            var fontTl = new TimelineMax({paused: true});
            var bigFontSize = '67px';
            var smallFontSize = '20px';
            var colorGrey = "#77777a";
            var colorLightGrey = "#b9b8ba";
            var i = 0;

            // Close the content box first
            //fontTl.add(TweenLite.to($('.item .orange').next(), 0.5, {"height": "0", ease: easeValue}), "cleanup");

            //var orangeClassElement = $('.item .orange');
            //var isLightGrey = $(orangeClassElement).attr('id') === 'engaging' || $(orangeClassElement).attr('id') === 'integrating' || $(orangeClassElement).attr('id') === 'spending';
            //
            //
            //if(isLightGrey) {
            //    fontTl.add(TweenLite.to(orangeClassElement, 0.5, {
            //        "color": colorLightGrey,
            //        ease: easeValue
            //    }), "cleanup+=0.25");
            //} else {
            //    fontTl.add(TweenLite.to(orangeClassElement, 0.5, {
            //        "color": colorGrey,
            //        ease: easeValue
            //    }), "cleanup+=0.25");
            //
            //    fontTl.add(TweenLite.to(orangeClassElement.find('.grey'), 0.5, {
            //        "color": colorLightGrey,
            //        ease: easeValue
            //    }), "cleanup+=0.25");
            //}

            //$(element).siblings().each(function (index, elem) {
            //    var sibling = $(elem).find('> a');
            //
            //    if ($(sibling).hasClass("orange")) {
            //
            //        fontTl.add(TweenLite.to(sibling, 0.5, {
            //            "fontSize": "20px",
            //            ease: easeValue
            //        }), "feature");
            //
            //        fontTl.add(TweenLite.to($(sibling).next(), 0.5, {
            //            "height": "0",
            //            ease: easeValue
            //        }), "feature+=0.25");
            //
            //        $(sibling).removeClass("orange");
            //    }
            //});
            //
            //fontTl.add(TweenLite.to($(this), 0.5, {"fontSize": "67px", ease: easeValue}), "feature");
            //fontTl.add(TweenLite.set($(this).next(), {height: "auto"}));
            //fontTl.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "feature+=0.25");

            element.noFirstClickFontAnimation = fontTl;
        });
    }

})(jQuery, ResponsiveBootstrapToolkit);

