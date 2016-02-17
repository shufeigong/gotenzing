(function ($, viewport) {
    $(document).ready(function () {
        var timeLine = new TimelineMax();
        var easeValue = Power2.easeInOut;

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

        initMobile();
        $(window).resize(
            viewport.changed(function () {
                if (viewport.is('xs')) {
                    initMobile();
                }
            }, 100)
        );

        /*
         * Mobile click event
         */

        //mobile main menu
        $(".mobile-item").click(function (e) {
            e.preventDefault();
            var target = $(this).find('a').attr('href');

            //$.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/" + $(this).children("a").attr("href"));//change url to be current subpage
            $("body").css("overflow-y", "hidden");
            //$($(this).children("a").attr("data-target")).addClass("in").css("display", "block");

            //$('#' + target).modal('show');
            //$($(this).children("a").attr("data-target")).modal('show');
            // Open desktop menu content

            var mainMenuItem = $('.main-menu').find('#' + target);
            timeLine.clear();
            mainMenuItem.addClass('orange');
            mainMenuItem.attr('style', '');

            var i = 0;
            mainMenuItem.parent().siblings().each(function () {
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

            timeLine.add(TweenLite.set(mainMenuItem.next(), {height: "auto"}));
            timeLine.add(TweenLite.from(mainMenuItem.next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");
        });

        $(".mobile-close").click(function (e) {
            e.preventDefault();
            //$.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/"); //change url to be homepage

            //$("body").css("overflow-y","");
            //$($(this).attr("close-target")).removeClass("in").css("display", "none");

            // Close desktop menu content
            var target = $(this).attr('data-id');
            var isUtility = $(this).hasClass('utility');

            if(isUtility) {
                //$('.entry-content').find('#' + target).find('.utility-close-icon').modal('hide');
                $('.modal#' + target).modal('hide');
            } else {
                // Clear the timeline
                var menuItem = $('.main-menu').find('#' + target).parent().find('.sub-close-icon');

                timeLine.clear();
                timeLine.add(TweenLite.to(menuItem.parent(".page-content"), 0.5, {"height": "0", ease: easeValue}));

                // De-select the menu item
                menuItem.parent(".page-content").prev("a").removeClass("orange");

                // Return animation
                var i = 0;
                menuItem.parents(".item").siblings().each(function () {
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

                //$('.main-menu').find('#' + target).parent().find('.sub-close-icon').click().length;
            }
        });

        // Mobile side menu
        $(".mobile-item-side").click(function (e) {
            e.preventDefault();

            var isUtility = $(this).hasClass('utility');

            //change url to be current subpage
            window.history.pushState(null, null, "/" + $(this).children("a").attr("href"));

            //make other mobile modal hidden
            //$(".mobile-modal").removeClass("in").css("display", "none");

            //popup this page modal
            //$($(this).find("a").attr("data-target")).addClass("in").css("display", "block");

            // change page icon and open page
            $('.close-icon').addClass('hidden');
            $('.ham-icon').removeClass('hidden');
            $('body').removeClass('nav-expanded');

            var target = $(this).find('a').attr('href').replace('utility/', '');

            if(!isUtility) {
                // Open desktop menu content
                if (!$('.main-menu').find('#' + target).hasClass('orange')) {
                    //$('.main-menu').find('#' + target).click();
                }

                var mainMenuItem = $('.main-menu').find('#' + target);
                timeLine.clear();
                mainMenuItem.addClass('orange');

                var i = 0;
                mainMenuItem.parent().siblings().each(function () {
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

                timeLine.add(TweenLite.set(mainMenuItem.next(), {height: "auto"}));
                timeLine.add(TweenLite.from(mainMenuItem.next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");

            } else {
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

        /////////////jquery touch swipe/////////
        jQuery("#brading-mobile-img-show").touchwipe({
            wipeLeft: function () {
                jQuery("#brading-mobile-img-show").carousel("next");
            },
            wipeRight: function () {
                jQuery("#brading-mobile-img-show").carousel("prev")
            },
            min_move_x: 20,
            preventDefaultEvents: false
        });

        jQuery('#lightbox-mobile-pop-gallery-page').touchwipe({
            wipeLeft: function () {
                jQuery('#lightbox-mobile-pop-gallery-page').carousel("next");
            },
            wipeRight: function () {
                jQuery('#lightbox-mobile-pop-gallery-page').carousel("prev")
            },
            min_move_x: 20,
            preventDefaultEvents: false
        });

    });
})(jQuery, ResponsiveBootstrapToolkit);