// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/product.html');
    require('./assets/templates/layouts/contacts.html');
    require('./assets/templates/layouts/catalog.html');
    require('./assets/templates/layouts/categories.html');
    require('./assets/templates/layouts/categories-chosen.html');
    require('./assets/templates/layouts/404.html');
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
$(function () {
    new Forms();
    new Popup();
    new LightGallery();
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
    }, 100);

    // fixed header

    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
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
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened').removeClass('login-menu__show');
        return false;
    });

    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });

    // filters

    $('.btn-filters').on('click', function () {
        var btn_txt = $(this).find('span');
        btn_txt.html() == 'Скрыть фильтры' ? btn_txt.html('Отобразить фильтры') : btn_txt.html('Скрыть фильтры');
        $('.categories-main').toggleClass('opened-filters');
    });

    $(window).resize(function () {
        var btn_txt = $('.btn-filters').find('span');
        if ($(window).width() < 991) {
            btn_txt.html('Отобразить фильтры');
            $('.categories-main').removeClass('opened-filters');
        }
    });

    $('.btn-filters__mob').on('click', function () {
        $('body').toggleClass('filters-opened');
    });

    $('.mobile-filters__close').click(function () {
        $('body').removeClass('filters-opened');
    });

    $(document).click(function () {
        $('body').removeClass('filters-opened');
    });

    $(document).on('click', '.mobile-filters__wrapper', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.btn-filters__mob', function (e) {
        e.stopPropagation();
    });

    $('.categories-filter__head').on('click', function () {
        $(this).toggleClass('active').next().slideToggle();
    });

    $(window).resize(function () {
        if ($(window).width() > 991) {
            $('body').removeClass('filters-opened');
        }
    });

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});
