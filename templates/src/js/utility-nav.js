(function($) {
    'use strict';

    $(document).ready(function() {
        // Set push state for utility menu
        $('.div-exlist a').on('click', function () {
            // Return false if the menu is already selected
            if($(this).hasClass('selected')) {
                return false;
            }

            $('.div-exlist a.selected').removeClass('selected');
            $(".div-iconlist ul li.orange").not('.toggle-menu').removeClass('orange');
            $(this).addClass('selected');

            if ($.cookie('utilityMenuOpen') == null) {
                $.cookie("previousUrl", window.location.href, {path: "/"});
                $.cookie("utilityMenuOpen", true);
            }

            window.history.pushState(null, null, $(this).attr("id").replace('utility-', '/utility/'));
            // Open Mobile utility menu content
            var target = $(this).attr("data-id");

            //$('#' + target + '-mobile-page').modal('show');
            if(target == 'gallery-legacy') {
                if(!window.isGalleryOpen) {
                    showGallery();
                }
            }
        });

        // Close utility menu content
        $('.utility-close-icon').on('click', function () {

            var hasPreviousUrl = $.cookie('previousUrl') != null;
            if (hasPreviousUrl) {
                var previousUrl = $.cookie("previousUrl");
                var isSameDomain = previousUrl.search(document.domain) != -1;
                var path = previousUrl.split('/').pop();

                if (isSameDomain) {
                    window.history.pushState(null, null, "/" + path);
                } else {
                    // if the previous is not the same domain,
                    window.history.pushState(null, null, "/");
                    location.reload();
                }
            } else {
                window.history.pushState(null, null, "/");
            }

            $('.div-exlist a.selected').removeClass('selected');
            $(".div-iconlist ul li.orange").removeClass('orange');

            $.removeCookie("utilityMenuOpen");
        });

        // Set push state for utility social icon menu
        $(".div-iconlist ul li a, .div-iconlist ul li button").not('.menuicon').on('click', function () {
            if($(this).parent().hasClass('orange')) {
                return false;
            }

            $('.div-exlist a.selected').removeClass('selected');
            $(".div-iconlist ul li.orange").not('.toggle-menu').removeClass('orange');
            $(this).parent().addClass('orange');
            if ($.cookie('utilityMenuOpen') == null) {
                $.cookie("previousUrl", window.location.href, {path: "/"});
                $.cookie("utilityMenuOpen", true);
            }
            window.history.pushState(null, null, $(this).attr("id").replace('utility-', '/utility/'));
        });

        // Main page extend menu
        $(".menuicon").click(
            function () {
                $(this).toggleClass('is-active');
                $(".arrow-down, .extension-header").slideToggle();
                $(".shadow-main").toggle();

                $(this).parent("li").toggleClass('orange');

                if(!$(this).parent('li').hasClass('orange')) {
                    var modalId = $('.modal.modal-fullscreen.in').attr('id');
                    if(modalId !== 'privacy' && modalId !== 'contact') {
                        $('.modal.modal-fullscreen.in').find('.utility-close-icon').click();
                    }
                }

            }
        );
    });
})(jQuery);