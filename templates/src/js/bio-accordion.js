/**
 * Created by insu on 16-02-02.
 */
(function ($) {
    $(document).ready(function () {
        function toggleSign(e) {
            $(e.target)
                .prev('.panel-heading')
                .find(".accordion-sign")
                .toggleClass('accordion-close accordion-open');
        }

        $('#accordion').on('hide.bs.collapse', toggleSign);
        $('#accordion').on('show.bs.collapse', toggleSign);
    });
})(jQuery);