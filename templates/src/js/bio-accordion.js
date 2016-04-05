/**
 * Created by insu on 16-02-02.
 */
var BioAccount = (function ($) {
  $(document).ready(function() {
    var $accordion = $('#accordion');

    $accordion.on('hide.bs.collapse', toggleSign);
    $accordion.on('show.bs.collapse', toggleSign);

    function toggleSign(e) {
      $(e.target)
        .prev('.panel-heading')
        .find('.accordion-sign')
        .toggleClass('accordion-close accordion-open');
    }

  });
})(jQuery);
