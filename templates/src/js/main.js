(function($) {
    // Reset cookie
    $.removeCookie('previousUrl', {'path': '/'});

    $(document).ready(function () {
        var isFirstClick = true;
        var timeLine = new TimelineLite();

        // Use polyfill for history
        var location = window.history.location || window.location;

        var link = location.pathname.split('/').pop();
        var isUtilityPage = location.pathname.search('/utility/');

        window.addEventListener('popstate', function () {
            location.reload();
        });

        if (link !== "" && isUtilityPage == -1) {
            var thisItem = $("[href=" + link + "]");
            thisItem.addClass('orange');
            var i = 0;
            thisItem.parent().siblings().each(function () {
                if (i == 0) {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize": "26px", ease: Power2.easeInOut}));
                    i++;
                } else {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "fontSize": "26px",
                        ease: Power2.easeInOut
                    }), "-=0.45");
                }
            });

            timeLine.add(TweenLite.set(thisItem.next(), {height: "auto"}));
            timeLine.add(TweenLite.from(thisItem.next(), 0.5, {"height": "0", ease: Power2.easeInOut}), "-=0.35");
            isFirstClick = false;
        } else if (link !== "" && isUtilityPage != -1) {
            // If the page is utility page with the orange menu down
            $(".arrow-down, .extension-header").slideDown();
            $(".shadow-main").show();
            $(".menuicon").parent("li").addClass('orange');

            $('.div-exlist a[href="#' + link+ '"]').addClass('selected');

            $("#" + link).modal('show');
        }

        /////main page extend menu///////
        $(".menuicon").click(function () {
            $(".arrow-down, .extension-header").slideToggle();
            $(".shadow-main").toggle();
            //$("#Layer_4 .st0").toggleClass('orange');
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

        //////main menu animation////
        var easeValue = Power2.easeInOut;

        $(".item").children("a").click(function () {
            $.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/" + $(this).attr("href"));

            if (isFirstClick == true) {
                timeLine.clear();
                $(this).addClass('orange');
                var i = 0;
                $(this).parent().siblings().each(function () {
                    if (i == 0) {
                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "26px",
                            ease: easeValue
                        }));
                        i++;
                    } else {
                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "26px",
                            ease: easeValue
                        }), "-=0.45");
                    }
                });

                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "-=0.35");
                isFirstClick = false;
            } else {

                timeLine.clear();

                $(this).parent().siblings().each(function () {
                    if ($(this).children("a").hasClass("orange")) {

                        timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                            "fontSize": "26px",
                            ease: easeValue
                        }), "feature");
                        timeLine.add(TweenLite.to($(this).children("a").next(), 0.5, {
                            "height": "0",
                            ease: easeValue
                        }), "feature+=0.25");

                        $(this).children("a").removeClass("orange");
                    }
                });

                timeLine.add(TweenLite.to($(this), 0.5, {"fontSize": "87px", ease: easeValue}), "feature");
                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "feature+=0.25");

                $(this).addClass('orange');
            }
        });

        $(".sub-close-icon").click(function (e) {
            e.preventDefault();
            $.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/"); //change url to be homepage

            timeLine.clear();

            timeLine.add(TweenLite.to($(this).parent(".page-content"), 0.5, {"height": "0", ease: easeValue}));
            $(this).parent(".page-content").prev("a").removeClass("orange");

            var i = 0;
            $(this).parents(".item").siblings().each(function () {
                if (i == 0) {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {"fontSize": "87px", ease: easeValue}));
                    i++;
                } else {
                    timeLine.add(TweenLite.to($(this).children("a"), 0.5, {
                        "fontSize": "87px",
                        ease: easeValue
                    }), "-=0.45");
                }

            });
            isFirstClick = true;
        });

        // Set push state for utility menu
        $('.div-exlist a').on('click', function () {
            if($('.modal-backdrop-fullscreen').length) {
                return false;
            }

            $('.div-exlist a.selected').removeClass('selected');
            $(this).addClass('selected');

            $.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, $(this).attr("href").replace('#', '/utility/'));
        });

    });
})(jQuery);


