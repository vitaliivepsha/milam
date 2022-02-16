// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
  require('./assets/templates/layouts/product.html');
  require('./assets/templates/layouts/catalog.html');
  require('./assets/templates/layouts/categories.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
var LightGallery = require('_modules/lightgallery');
var Slider = require('_modules/slider');
require('../node_modules/sumoselect/jquery.sumoselect.min');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
  new LightGallery();
  new Slider();

  setTimeout(function() {
    $('body').trigger('scroll');
    $(window).trigger('resize');
  }, 100);

  // fixed header

  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();

    if (scrolled > 200 && scrolled > scrollPrev) {
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
    }
    scrollPrev = scrolled;
  });

  // select

  $('.select').SumoSelect({
    forceCustomRendering: true
  });

  // mobile menu

  var touch = $('.mobile-menu__btn');

  var toggles = document.querySelectorAll('.mobile-menu__btn');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }

  function toggleHandler(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
    });
  }

  $(touch).click(function(e) {
    e.preventDefault();
    $('body').toggleClass('menu-opened').removeClass('login-menu__show');
    return false;
  });

  $(document).on('click', '.mobile-menu__btn', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.mobile-menu__wrapper', function(e) {
    e.stopPropagation();
  });

  // filters
    $('.categories-filters__btn').on('click', function() {
      $('.categories-main__wrapper').toggleClass('opened-filters');
    });

  // lazy load
  var lazyload = function() {
    var scroll = $(window).scrollTop() + $(window).height() * 3;

    $('.lazy').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('src', $(this).data('original'));
      }
    });
    $('.lazy-web').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('srcset', $(this).data('original'));
      }
    });
  };
  $(window).scroll(lazyload);
});
