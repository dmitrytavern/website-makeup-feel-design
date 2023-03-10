/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

$(document).ready(function () {
  document.body.classList.add('is-loaded');
  $('.menu').addClass('is-loaded');
});

//  Header

var $header = $('header');
var $headerMenuBtn = $('.header-menu-btn');
var $menu = $('.menu');
var $btnChatContainer = $('#chat-container');
var $btnChat = $('#chat');
var $anchor = $('.footer__contact');
var $anchorMobile = $('.footer__info-copyright');
function scrollPage() {
  if (window.pageYOffset > 0) {
    $header.addClass('is-scroll');
  } else {
    $header.removeClass('is-scroll');
  }

  // Chat

  if ($anchor.length !== 0) {
    if (window.innerWidth >= 768) {
      var footerTop = $anchor.offset().top;
      var btnChatHeight = $btnChat.height();
      $anchor.css('padding-right', $btnChat.outerWidth() + 60);
      if (footerTop <= window.pageYOffset + window.innerHeight - btnChatHeight / 2 - 18) {
        var number = footerTop + btnChatHeight;
        $btnChatContainer.css({
          top: number + 'px'
        });
        $btnChatContainer.addClass('is-absolute');
        $btnChat.addClass('is-fixed');
      } else {
        $btnChatContainer.css({
          top: 'unset'
        });
        $btnChatContainer.removeClass('is-absolute');
        $btnChat.removeClass('is-fixed');
      }
    } else {
      var anchorMobileTop = $anchorMobile.offset().top;
      var anchorMobileHeight = $anchorMobile.outerHeight(); // 36px
      var _btnChatHeight = $btnChat.outerHeight(); // 50px

      $anchor.css('padding-right', 0);
      if (anchorMobileTop <= window.pageYOffset + window.innerHeight - _btnChatHeight + (_btnChatHeight - anchorMobileHeight) / 2) {
        var _number = anchorMobileTop + _btnChatHeight - (_btnChatHeight - anchorMobileHeight) / 2;
        $btnChatContainer.css({
          top: _number + 'px'
        });
        $btnChatContainer.addClass('is-absolute');
        $btnChat.addClass('is-fixed');
      } else {
        $btnChatContainer.css({
          top: 'unset'
        });
        $btnChatContainer.removeClass('is-absolute');
        $btnChat.removeClass('is-fixed');
      }
    }
  }
}
function toggleHeaderMenu() {
  $headerMenuBtn.toggleClass('is-active');
  $header.toggleClass('is-menu-open');
  $menu.toggleClass('is-open');
  document.body.classList.toggle('menu-opened');
}
function closeHeaderMenu() {
  $headerMenuBtn.removeClass('is-active');
  $header.removeClass('is-menu-open');
  $menu.removeClass('is-open');
  document.body.classList.remove('menu-opened');
}
$(window).on('click', function (e) {
  var $target = e.target;
  var click = $('.menu')[0].contains($target);
  var containsClass = $target.classList.contains('header-menu-btn');
  var containsSpan = false;
  if ($target.offsetParent && $target.offsetParent.classList) {
    containsSpan = $target.offsetParent.classList.contains('header-menu-btn');
  }
  console.log($target);
  if (!(click || containsClass || containsSpan)) {
    closeHeaderMenu();
  }
});
$($headerMenuBtn).on('click', toggleHeaderMenu);
$(window).on('resize scroll load', scrollPage);

// Modals

$('.modal').on('show.bs.modal', function () {
  document.body.classList.add('modal-open-main');
  $('.modal-custom-backdrop').addClass('is-open');
});
$('.modal').on('hide.bs.modal', function () {
  document.body.classList.remove('modal-open-main');
  $('.modal-custom-backdrop').removeClass('is-open');
});
$('.modal-custom-backdrop').on('click', function () {
  $('.modal').modal('hide');
});

// Parallax

// Home page > Title in sections
var $homeSectionImages = $('[data-home-section-parallax]');
if ($homeSectionImages.length !== 0) {
  $(window).on('scroll load', function (e) {
    $homeSectionImages.each(function (_, $element) {
      var downLine = window.pageYOffset + window.innerHeight - 250; // Screen bottom - 250px
      var topEl = $element.getBoundingClientRect().top + window.pageYOffset; // Global offset

      // If the parallax element is on the screen or above the screen
      if (topEl <= downLine) {
        var step = (downLine - topEl) * 0.1;
        $($element).css('transform', "translateY(-".concat(step, "px)"));
      } else {
        $($element).css('transform', 'translateY(0)');
      }
    });
  });
}

// Services page > Page image
var $servicesPageImage = $('[data-services-parallax]');
if ($servicesPageImage.length !== 0) {
  $(window).on('scroll load', function (e) {
    var $el = $($servicesPageImage)[0];
    var step = window.pageYOffset * 0.12;
    $($el).css('transform', "translateY(".concat(step, "px)"));
  });
}

// Sliders

// Home cases slider
var $homeCaseSlider = $('.home-cases__slider.swiper-container');
if ($homeCaseSlider.length !== 0) {
  var sliderHomeCases = new Swiper('.home-cases__slider.swiper-container', {
    init: false,
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__bullet',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'slider__arrow_disabled'
    }
  });
  sliderHomeCases.on('init slideChange', function (slider) {
    var $homeCaseDescriptionBlock = $('#home-cases-slide-description');
    if ($homeCaseDescriptionBlock.length !== 0) {
      var $nameBlock = $homeCaseDescriptionBlock.find('[data-name]');
      var $descBlock = $homeCaseDescriptionBlock.find('[data-description]');
      var $linkBlock = $homeCaseDescriptionBlock.find('[data-link]');
      var slides = slider.slides;
      var $current = slides[slider.activeIndex];
      var $dataName = $($current).attr('data-name');
      var $dataDesc = $($current).attr('data-description');
      var $dataLink = $($current).attr('data-link');
      $nameBlock.html($dataName);
      $descBlock.html($dataDesc);
      $linkBlock.attr('href', $dataLink);
    }
  });
  sliderHomeCases.init();
}

// Case inner slider
var $caseSlider = $('.swiper-container.case-detail-slider__slider');
if ($caseSlider.length !== 0) {
  new Swiper('.case-detail-slider__slider.swiper-container', {
    loop: false,
    slidesPerView: 1.3,
    spaceBetween: 20,
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__bullet',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'slider__arrow_disabled'
    },
    breakpoints: {
      1023: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  });
}

// Case inner page
var $caseColorBoxes = $('.case-coloristics__color-box');
if ($caseColorBoxes.length !== 0) {
  $(window).on('resize load', function () {
    $caseColorBoxes.height($caseColorBoxes.width() + 'px');
  });
}

// Forms

var $contactsPageTextarea = $('textarea.input-block__input');
if ($contactsPageTextarea.length !== 0) {
  autosize($contactsPageTextarea);
}
$('form input, form textarea').on('focus', function () {
  $(this).removeClass('is-error');
});
function activateError(el, name) {
  $("".concat(el, " [name=\"").concat(name, "\"]")).addClass('is-error');
}
function checkInputRequired(el, name) {
  return $("".concat(el, " [name=\"").concat(name, "\"]")).attr('data-required');
}
function changeModalTab($el, tabName) {
  $el.find('.modal__tab').removeClass('is-active');
  $el.find(".modal__tab[data-name=\"".concat(tabName, "\"]")).addClass('is-active');
}
function checkFormData(el, data) {
  var error = false;
  var _iterator = _createForOfIteratorHelper(data),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
        name = _step$value.name,
        value = _step$value.value;
      if (value === '') {
        if (checkInputRequired(el, name) !== undefined) {
          error = true;
          activateError(el, name);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return error;
}
function normalizeFormData(data) {
  var obj = {};
  var _iterator2 = _createForOfIteratorHelper(data),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _step2.value,
        name = _step2$value.name,
        value = _step2$value.value;
      obj[name] = value;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return obj;
}
var $contactPageForm = $('#contacts-page-form');
if ($contactPageForm.length !== 0) {
  $contactPageForm.submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    if (!checkFormData('#contacts-page-form', data)) {
      var normData = normalizeFormData(data);
      $.ajax({
        url: 'callback.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
          site: normData.name,
          email: normData.email,
          message: normData.message
        }
      }).done(function () {
        console.log('Success Send');
      }).fail(function () {
        var $errorText = $contactPageForm.find('.form-error-text');
        $errorText.html('Has Error');
        $errorText.addClass('is-active');
        setTimeout(function () {
          $errorText.removeClass('is-active');
        }, 3000);
      });
    }
  });
}

// Form in order modal
var $modalOrder = $('#modal-order');
var $modalOrderForm = $('#modal-order-form');
if ($modalOrderForm.length !== 0) {
  $modalOrderForm.submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    if (!checkFormData('#modal-order', data)) {
      var normData = normalizeFormData(data);

      // REMOVE IN PRODUCTION VERSION
      changeModalTab($modalOrder, 'success');
      // END REMOVE

      $.ajax({
        url: 'callback.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
          name: normData.name,
          email: normData.email,
          collection: normData.collection
        }
      }).done(function () {
        changeModalTab($modalOrder, 'success');
      }).fail(function () {
        var $errorText = $modalOrderForm.find('.form-error-text');
        $errorText[0].innerHTML = 'Has Error';
        $errorText.addClass('is-active');
        setTimeout(function () {
          $modalOrderForm.find('.form-error-text').removeClass('is-active');
        }, 3000);
      });
    }
  });
}

// View collection
var $collectionBlock = $('.collections');
var $collectionList = $('.collections__list');
if ($collectionBlock.length !== 0) {
  // If need to load new image, run recalculate function
  var collectionInterface = Macy({
    container: '.collections__list',
    margin: 19,
    columns: 3,
    breakAt: {
      1025: {
        margin: 13,
        columns: 2
      }
    }
  });
  $(window).on("resize", function () {
    collectionInterface.recalculate(true, true);
  });
}

// Service collection
var $collectionModals = $('.collection__modal');
var $collectionModalOrder = $('#modal-order-collection');
var $collectionModalOrderForm = $('#modal-order-collection-form');
function collectionModalsCheckAlign() {
  var $collectionModalShow = $('.collection__modal.show');
  var $wrapper = $collectionModalShow.find('.collection-modal__wrapper');
  var $inner = $collectionModalShow.find('.collection-modal__inner');
  if ($wrapper.height() < $inner.height()) {
    $($wrapper).addClass('collection-modal__wrapper_disable-align');
  } else {
    $($wrapper).removeClass('collection-modal__wrapper_disable-align');
  }
}
$collectionModals.on('shown.bs.modal', function () {
  document.body.classList.add('collection-modal-open');
  collectionModalsCheckAlign();
  window.addEventListener('resize', collectionModalsCheckAlign, false);
  if (!$(this).hasClass('collection-modal_init')) {
    var $slider = $(this).find('.collection-modal__slider').get(0);
    new Swiper($slider, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: '.slider__pagination',
        bulletClass: 'slider__bullet',
        bulletActiveClass: 'is-active',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'slider__arrow_disabled'
      }
    });
    $(this).addClass('collection-modal_init');
  }
});
$collectionModals.on('hide.bs.modal', function () {
  document.body.classList.remove('collection-modal-open');
  window.removeEventListener('resize', collectionModalsCheckAlign, false);
});
$collectionModalOrder.on('shown.bs.modal', function () {
  var $collectionModalShow = $('.collection__modal.show');
  var collectionSend = $collectionModalShow.attr('data-send');
  if (collectionSend === 'false') {
    // Set form tab in modal
    changeModalTab($collectionModalOrder, 'form');
    var $collectionFormInputs = $collectionModalOrder.find('input');
    var $collectionFormCollectionInput = $collectionModalOrder.find('input[name="collection"]');
    var collectionId = $collectionModalShow.attr('data-id-collection');
    $collectionFormInputs.val('');
    $collectionFormCollectionInput.val(collectionId);
  } else {
    // Set success tab in modal
    changeModalTab($collectionModalOrder, 'success');
  }
});
if ($collectionModalOrderForm.length !== 0) {
  $collectionModalOrderForm.submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    if (!checkFormData('#modal-order-collection', data)) {
      var normData = normalizeFormData(data);

      // REMOVE FROM PRODUCTION VERSION!

      var $collectionModalShow = $('.collection__modal.show');
      $collectionModalShow.attr('data-send', 'true');
      changeModalTab($collectionModalOrder, 'success');

      // END REMOVE

      $.ajax({
        url: 'callback.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
          name: normData.name,
          email: normData.email,
          collection: normData.collection
        }
      }).done(function () {
        var $collectionModalShow = $('.collection__modal.show');
        $collectionModalShow.attr('data-send', 'true');
        changeModalTab($collectionModalOrder, 'success');
      }).fail(function () {
        var $errorText = $collectionModalOrderForm.find('.form-error-text');
        $errorText[0].innerHTML = 'Has Error';
        $errorText.addClass('is-active');
        setTimeout(function () {
          $collectionModalOrderForm.find('.form-error-text').removeClass('is-active');
        }, 3000);
      });
    }
  });
}
/******/ })()
;