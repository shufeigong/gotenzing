(function ($, viewport) {
    $(document).ready(function () {
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
            viewport.changed(function() {
                if(viewport.is('xs')) {
                    initMobile();
                }
            }, 100)
        );

        ////////mobile click event//////////////
        //mobile main menu///////////
        $(".mobile-item").click(function (e) {
            e.preventDefault();
            //$.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/" + $(this).children("a").attr("href"));//change url to be current subpage

            $("body").css("overflow-y", "hidden");
            $($(this).children("a").attr("data-target")).addClass("in").css("display", "block");

            var target = $(this).find('a').attr('href');

            // Open desktop menu content
            if(!$('.main-menu').find('#' + target).hasClass('orange')) {
                $('.main-menu').find('#' + target).click();
            }
        });

        $(".mobile-close").click(function (e) {
            e.preventDefault();
            //$.cookie("previousUrl", window.location.href, {path:"/"});
            window.history.pushState(null, null, "/"); //change url to be homepage

            //$("body").css("overflow-y","");
            $($(this).attr("close-target")).removeClass("in").css("display", "none");

            // Close desktop menu content
            var target = $(this).attr('data-id');
            $('.main-menu').find('#' + target).parent().find('.sub-close-icon').click();

        });

        //mobile site menu///////////
        $(".mobile-item-side").click(function (e) {
            e.preventDefault();
            window.history.pushState(null, null, "/" + $(this).children("a").attr("href"));//change url to be current subpage

            $(".mobile-modal").removeClass("in").css("display", "none");//make other mobile modal hidden
            $($(this).children("a").attr("data-target")).addClass("in").css("display", "block");//popup this page modal
            $('.close-icon').addClass('hidden');// change page icon and open page
            $('.ham-icon').removeClass('hidden');
            $('body').removeClass('nav-expanded');

        });

        ////mobile pop photo modal////
        $(".mobile-pop").click(function () {
            $($(this).attr("data-target")).css("display", "block");
        });

        $(".mobile-pop-close").click(function (e) {
            e.preventDefault();
            $($(this).attr("close-target")).css("display", "none");

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

    });
})(jQuery, ResponsiveBootstrapToolkit);