'use strict';
window.mobileButtonClicked = false;

var MobileNav = (function (viewport) {
  var $mobileItem = $('.mobile-item');
  var $mobileSideItme = $('.mobile-item-side');
  var $carouselInner = $('.carousel-inner');

  $mobileItem.on('click', clickMobileMenu);
  $mobileSideItme.on('click', clickMobileSideMenu);

  // Enable swipe for mobile
  enableSwipe();

  $(window).resize(
    viewport.changed(
      function () {
        if (viewport.is('xs')) {
          initMobile();
        }
      }, 100
    )
  ).resize();

  function clickMobileMenu(e) {
    e.preventDefault();
    var target = $(this).find('a').attr('href');

    //change url to be current subpage
    window.history.pushState(null, null, '/' + $(this).children('a').attr('href'));
    window.mobileButtonClicked = true;

    $('.main-menu').find('#' + target).click();
  }

  function clickMobileSideMenu() {
    e.preventDefault();

    var target = $(this).find('a').attr('href').replace('utility/', '');
    var isUtility = $(this).hasClass('utility');

    if (isUtility) {
      //change url to be current subpage
      window.history.pushState(null, null, '/utility/' + $(this).find('a').attr('href'));
    } else {
      //change url to be current subpage
      window.history.pushState(null, null, '/' + $(this).find('a').attr('href'));
    }

    // change page icon and open page
    $('.close-icon').addClass('hidden');
    $('.ham-icon').removeClass('hidden').removeClass('is-active');
    $('body').removeClass('nav-expanded');

    if (!isUtility) {
      $('.main-menu').find('#' + target).click();
    } else {
      if (target == 'gallery-legacy') {
        if (!window.isGalleryOpen) {
          showGallery();
        }
      }

      $('.modal#' + target).modal('show');
    }
  }

  function initMobile() {
    $mobileItem.each(
      function (index, val) {
        $(this).attr('topv', $(this).position().top);
      }
    );

    var $mobileMainMenu = $('.mobile-main-menu');

    $mobileMainMenu.scroll(
      function () {
        var scroH = parseInt($(this).scrollTop());

        $mobileMainMenu.find('.mobile-main-ul li').each(
          function () {
            if (scroH + 75 >= parseInt($(this).attr('topv'))) {
              $mobileMainMenu.find('.mobile-main-ul li').css('opacity', '0');

              TweenMax.to($(this).children('a'), 0.2, { fontSize: '41px' });
              TweenMax.to($(this).siblings().children('a'), 0.2, { fontSize: '26px' });

              $(this).css('opacity', '1').prev().css('opacity', '0.6').prev().css('opacity', '0.3');
              $(this).next().css('opacity', '0.8').next().css('opacity', '0.6').next().css('opacity', '0.4').next().css('opacity', '0.2');

              $('.mobile-indicator-item').removeClass('active-indicator');

              $('[data-indicator-target=' + $(this).children('a').attr('id') + ']').addClass('active-indicator');
            }
          }
        );
      }
    );

    $mobileMainMenu.scrollTop(1);
  }

  function enableSwipe() {
    $carouselInner.swipe(
      {
        //Generic swipe handler for all directions
        swipeLeft: function () {
          $(this).parent().carousel('next');
        },

        swipeRight: function () {
          $(this).parent().carousel('prev');
        },
      }
    );
  }

})(ResponsiveBootstrapToolkit);
