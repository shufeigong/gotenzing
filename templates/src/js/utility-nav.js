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
                showGallery();
            }
        });

        // Close utility menu content
        $('.utility-close-icon').on('click', function () {
            //var target = $(this).closest('.modal-fullscreen').attr('id');
            //$('#' + target + '-mobile-page').modal('hide');
        });

        // Set push state for utility social icon menu
        $(".div-iconlist ul li a").not('.menuicon').on('click', function () {

            if ($.cookie('utilityMenuOpen') == null) {
                $.cookie("previousUrl", window.location.href, {path: "/"});
                $.cookie("utilityMenuOpen", true);
            }
            window.history.pushState(null, null, $(this).attr("id").replace('utility-', '/utility/'));

            var target = $(this).attr('data-id');
            //$('#' + target + '-mobile-page').modal('show');
        });

    });
})(jQuery);