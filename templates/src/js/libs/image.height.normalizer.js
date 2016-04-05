// Normalize Heights
$.fn.imageWrapHeights = function () {
  var $this = $(this);
  var $textDiv = $(this).parent().prev();
  var $subContainer = $(this).closest('.sub-container');
  var imageWrap = $(this).find('.image-wrap');
  var $imageContainers = $(this).find('.image-container');
  var images = $(this).find('.image-item');
  var $iframes = $(this).find('iframe');
  var textDivHeight;
  var subContainerHeight;
  var call;
  var height;

  var normalizeHeights = function () {
    textDivHeight = $textDiv.outerHeight();
    subContainerHeight = $subContainer.innerHeight() - 10;
    height = $textDiv.outerHeight() < 250 ? 250 : $textDiv.outerHeight() + 20;

    if ($(window).width() < 640) {
      $this.css({ height: 250 });
      $imageContainers.css({ height: 250 });
      imageWrap.css({ height: 250 });
      $iframes.each(function (index, value) {
        var iframeWidthAdjustment = parseInt($(value).attr('data-width-adjustment'));
        iframeWidthAdjustment /= 2;
        $(value).css({ width: (250 * 16) / 9 + iframeWidthAdjustment, height: 250 });
      });
    } else {
      $this.css({ height: height });
      $imageContainers.css({ height: height });
      imageWrap.css({ height: height });
      $iframes.each(function (index, value) {
        var iframeWidthAdjustment = parseInt($(value).attr('data-width-adjustment'));
        $(value).css({ width: ((height * 16) / 9) + iframeWidthAdjustment, height: height });
      });
    }

    images.imageScale();
  };

  normalizeHeights();

  $(window).on(
    'resize orientationchange', function () {
      var resetValue = $textDiv.outerHeight() < 250 ? 250 : $textDiv.outerHeight() + 20;
      $imageContainers.css({ height: resetValue });
      imageWrap.css({ height: resetValue });

      if (call) {
        clearTimeout(call);
      }

      call = setTimeout(normalizeHeights, 0); // run it again
    }
  );
};
