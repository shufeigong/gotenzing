'use strict';

var UtilityNav = (function () {
  var $utilityElem = $('.div-iconlist ul li a, .div-iconlist ul li button');
  var $utilityExtendedElem = $('.div-exlist a');
  var $utilityCloseButton = $('.utility-close-icon');
  var $menuExtensionButton = $('.menuicon');

  $utilityElem.not('.menuicon').on('click', clickHeaderUtilityMenu);
  $utilityExtendedElem.on('click', clickUtilityMenu);
  $utilityCloseButton.on('click', clickCloseButton);
  $menuExtensionButton.on('click', extendSubMenu);

  function clickUtilityMenu() {
    // Return false if the menu is already selected
    if ($(this).hasClass('selected')) {
      return false;
    }

    clearMenuClass();

    $(this).addClass('selected');

    if ($.cookie('utilityMenuOpen') == null) {
      $.cookie('previousUrl', window.location.href, { path: '/' });
      $.cookie('utilityMenuOpen', true);
    }

    window.history.pushState(null, null, $(this).attr('id').replace('utility-', '/utility/'));

    // Open Mobile utility menu content
    var target = $(this).attr('data-id');

    if (target == 'gallery-legacy') {
      if (!window.isGalleryOpen) {
        showGallery();
      }
    }
  }

  function clickCloseButton() {
    var hasPreviousUrl = $.cookie('previousUrl') != null;
    if (hasPreviousUrl) {
      var previousUrl = $.cookie('previousUrl');
      var isSameDomain = previousUrl.search(document.domain) != -1;
      var path = previousUrl.split('/').pop();

      if (isSameDomain) {
        window.history.pushState(null, null, '/' + path);
      } else {
        // if the previous is not the same domain,
        window.history.pushState(null, null, '/');
        location.reload();
      }
    } else {
      window.history.pushState(null, null, '/');
    }

    clearMenuClass();

    $.removeCookie('utilityMenuOpen');
  }

  function extendSubMenu() {
    var $activeModal = $('.modal.modal-fullscreen.in');

    $(this).toggleClass('is-active');
    $('.arrow-down, .extension-header').slideToggle();
    $('.shadow-main').toggle();

    $(this).parent('li').toggleClass('orange');

    if (!$(this).parent('li').hasClass('orange')) {
      var modalId = $activeModal.attr('id');
      if (modalId !== 'privacy' && modalId !== 'contact') {
        $activeModal.find('.utility-close-icon').click();
      }
    }
  }

  function clickHeaderUtilityMenu() {
    if ($(this).parent().hasClass('orange')) {
      return false;
    }

    clearMenuClass();

    $(this).parent().addClass('orange');
    if ($.cookie('utilityMenuOpen') == null) {
      $.cookie('previousUrl', window.location.href, { path: '/' });
      $.cookie('utilityMenuOpen', true);
    }

    window.history.pushState(null, null, $(this).attr('id').replace('utility-', '/utility/'));
  }

  function clearMenuClass() {
    var $selectedMenu = $('.div-exlist a.selected');
    var $orangeIcon = $('.div-iconlist ul li.orange');

    $selectedMenu.removeClass('selected');
    $orangeIcon.not('.toggle-menu').removeClass('orange');
  }
})();
