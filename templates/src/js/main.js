(function ($, viewport) {
    // Reset cookie
    $.removeCookie('previousUrl', {'path': '/'});
    $.removeCookie("utilityMenuOpen");

    $(document).ready(function () {
        var isFirstClick = true;
        var timeLine = new TimelineMax();

        // Use polyfill for history
        var location = window.history.location || window.location;

        var link = location.pathname.split('/').pop();
        var isUtilityPage = location.pathname.search('/utility/');

        window.addEventListener('popstate', function () {
            location.reload();
        });

        function reloadPage() {
            if ($(window).width() > 640) {
                //normal version relaod page
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
            } else {//mobile version reload page
                $("#" + link + "-mobile-page").addClass("in").css("display", "block");
            }
        }

        reloadPage();

        // Execute code each time window size changes
        $(window).resize(
            viewport.changed(function() {
                //console.log('Current breakpoint: ', viewport.current());
            }, 150)
        );

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
            $.cookie("previousUrl", window.location.href, {path: "/"});
            window.history.pushState(null, null, "/" + $(this).attr("href"));
            //change url to be current subpage

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

                timeLine.add(TweenLite.to($(this), 0.5, {"fontSize": "67px", ease: easeValue}), "feature");
                timeLine.add(TweenLite.set($(this).next(), {height: "auto"}));
                timeLine.add(TweenLite.from($(this).next(), 0.5, {"height": "0", ease: easeValue}), "feature+=0.25");

                $(this).addClass('orange');
            }

            // Open mobile content
            var target = $(this).attr('id');
            if(!$('#' + target + '-mobile-page').hasClass('in')) {
                $('#' + target + '-mobile').parent().click();
            }
        });

        $(".sub-close-icon").click(function (e) {
            e.preventDefault();
            $.cookie("previousUrl", window.location.href, {path: "/"});
            window.history.pushState(null, null, "/"); //change url to be homepage

            // Clear the timeline
            timeLine.clear();
            timeLine.add(TweenLite.to($(this).parent(".page-content"), 0.5, {"height": "0", ease: easeValue}));

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
            $('#' + target + '-mobile-page').css("display", "none");

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
        });

        // Set push state for utility social icon menu
        $(".div-iconlist a").on('click', function () {

            if ($.cookie('utilityMenuOpen') == null) {
                $.cookie("previousUrl", window.location.href, {path: "/"});
                $.cookie("utilityMenuOpen", true);
            }
            window.history.pushState(null, null, $(this).attr("id").replace('utility-', '/utility/'));
        });

        $(".sub-img-container").imagefill();
        $(".slide-container").imagefill();
        //$(".pop-img-container").imagefill();

    });
})(jQuery, ResponsiveBootstrapToolkit);


