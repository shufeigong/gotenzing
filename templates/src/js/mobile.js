(function ($, viewport) {
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

    $(document).ready(function () {
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

            window.history.pushState(null, null, "/" + target);//change url to be current subpage
            $("body").css("overflow-y", "hidden");

            $('.main-menu').find('#' + target).click();
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

            $('.mobile-item').find('.orange').removeClass('orange');
            $('.main-menu').find('#' + target).closest('li').find('.page-content .sub-close-icon').click();

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

            alert(target);
            //return false;
            if(!isUtility) {
                $('.main-menu').find('#' + target).click();
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

        $(".carousel-inner").swipe( {
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
})(jQuery, ResponsiveBootstrapToolkit);