(function ($, viewport) {
    // Reset cookie
    $.removeCookie('previousUrl', {'path': '/'});
    $.removeCookie("utilityMenuOpen");

    $(document).ready(function () {
        var isFirstClick = true;
        var timeLine = new TimelineMax({
            onComplete: function () {
            }
        });
        var hoverTimeLine = new TimelineMax({
            paused: "true"
        });

        var easeValue = Power2.easeInOut;

        // Use polyfill for history
        var location = window.history.location || window.location;

        var link = location.pathname.split('/').pop();
        var isUtilityPage = location.pathname.search('/utility/');

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
        if (link !== "" && isUtilityPage == -1) {
            var thisItem = $("[href=" + link + "]");
            thisItem.addClass('orange');
            var i = 0;
            thisItem.parent().siblings().each(function () {
                if (i == 0) {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "fontSize": "20px",
                        ease: Power2.easeInOut
                    }));
                    i++;
                } else {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "fontSize": "20px",
                        ease: Power2.easeInOut
                    }), "-=0.45");
                }
            });

            timeLine.add(TweenLite.set(thisItem.next(), {height: "auto"}));
            timeLine.add(TweenLite.from(thisItem.next(), 0.5, {
                "height": "0",
                ease: Power2.easeInOut
            }), "-=0.35");

            isFirstClick = false;

        } else if (link !== "" && isUtilityPage != -1) {
            // If the page is utility page with the orange menu down
            $(".arrow-down, .extension-header").slideDown();
            $(".shadow-main").show();
            $(".menuicon").parent("li").addClass('orange');

            $('.div-exlist').find('#utility-' + link).addClass('selected');

            $("#" + link).modal('show');
        }
        //} else {
        //mobile version reload page
        $("#" + link + "-mobile-page").modal('show');
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

        var oriFontSize = '';
        $(".item").children("a").hover(function () {
            // Prevent to open the same mobile modal
            if ($(this).hasClass('orange')) {
                return false;
            }

            var menu = $(this);
            var currentFontSize = parseFloat($(menu).css('font-size'));
            oriFontSize = currentFontSize;
            var colorOrange = '#f7a800';
            var colorLightOrange = '#ffe0ae';

            var fontSizeAdjustment = 3;
            var duration = 0.5;

            TweenLite.to(menu, duration, {
                "css": {
                    "color": colorOrange,
                    "fontSize": (currentFontSize + fontSizeAdjustment) + "px"
                },
                ease: easeValue
            });

            TweenLite.to($(menu).find('.grey'), duration, {
                "css": {"color": colorLightOrange},
                ease: easeValue
            });

        }, function () {
            // Prevent to open the same mobile modal
            if ($(this).hasClass('orange')) {
                return false;
            }

            var menu = $(this);

            var isLightGrey = $(menu).attr('id') == 'engaging' || $(menu).attr('id') == 'integrating' || $(menu).attr('id') == 'spending';

            var colorGrey = "#77777a";
            var colorLightGrey = "#b9b8ba";

            var duration = 0.5;

            if(isLightGrey) {
                TweenLite.to(menu, duration, {
                    "css": {
                        "color": colorLightGrey,
                        "fontSize": oriFontSize + "px"
                    },
                    ease: easeValue
                });
            } else {
                TweenLite.to(menu, duration, {
                    "css": {
                        "color": colorGrey,
                        "fontSize": oriFontSize + "px"
                    },
                    ease: easeValue
                });
            }

            TweenLite.to($(menu).find('.grey'), duration, {
                "css": {"color": colorLightGrey},
                ease: easeValue
            });
        });

        $(".item").children("a").click(function () {
            // Prevent to open the same mobile modal
            if ($(this).hasClass('orange')) {
                return false;
            }

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
                timeLine.add(TweenLite.to($('.item .orange'), 0.5, {
                    "color": colorGrey,
                    ease: easeValue
                }), "cleanup+=0.25");

                timeLine.add(TweenLite.to($('.item .orange').find('.grey'), 0.5, {
                    "color": colorLightGrey,
                    ease: easeValue
                }), "cleanup+=0.25");

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

            timeLine.add(TweenLite.to($('.item .orange'), 0.5, {
                "color": colorGrey,
                ease: easeValue
            }), "cleanup+=0.25");

            timeLine.add(TweenLite.to($('.item .orange').find('.grey'), 0.5, {
                "color": colorLightGrey,
                ease: easeValue
            }), "cleanup+=0.25");

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

    function initMenuAnimation() {
        $('.main-menu ul > li.item').each(function (index, element) {
            var colorOrange = '#f7a800';
            var colorLightOrange = '#ffe0ae';
            var colorGrey = "#77777a";
            var colorLightGrey = "#b9b8ba";

            var menu = $(element).find('> a');
            var hasGreyClass = $(menu).find('.grey');

            var tl = new TimelineMax({paused: true});
            var currentFontSize = parseFloat($(menu).css('font-size'));
            var fontSizeAdjustment = 3;
            var duration = 0.5;
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
            element.animation = tl;
        });
    }

    function resetMenuAnimation() {
        $('.main-menu ul > li.item').each(function (index, element) {
            element.animation.clear();

            var colorOrange = '#f7a800';
            var colorLightOrange = '#ffe0ae';
            var colorGrey = "#77777a";
            var colorLightGrey = "#b9b8ba";

            var menu = $(element).find('> a');
            var hasGreyClass = $(menu).find('.grey');

            var currentFontSize = parseFloat($(menu).css('font-size'));
            var fontSizeAdjustment = 3;
            var duration = 0.5;
            var easeValue = Power2.easeInOut;
            console.log(currentFontSize);
            if (hasGreyClass.length > 0) {
                element.animation.to(menu, duration, {
                    "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
                    ease: easeValue
                });

                element.animation.to($(menu).find('.grey'), duration, {
                    "css": {"color": colorLightOrange},
                    ease: easeValue
                }, "-=" + duration);
            } else {
                element.animation.to(menu, duration, {
                    "css": {"color": colorOrange, "fontSize": (currentFontSize + fontSizeAdjustment) + "px"},
                    ease: easeValue
                });
            }
        });
    }

})(jQuery, ResponsiveBootstrapToolkit);


