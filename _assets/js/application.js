//= require ./vendor/turbolinks-5.2.0.min
//= require ./vendor/jquery-1.12.4.min
//= require ./vendor/stimulus-1.1.1.umd
//= require_tree ./controllers

// show the progress bar regardless of delay
Turbolinks.setProgressBarDelay(0);

// burger menu
$(document).on('click', '.burger__link', (e) => {
    e.preventDefault();
    let burger = $('.burger__link');
    burger.toggleClass('burger__link--active');
    let menu = $('.menu');
    menu.toggleClass('menu--active');
    let body = $('body');
    body.toggleClass('show-menu');
});

$.fn.visible = function (partial) {
    let $this = $(this),
        $window = $(window),
        viewTop = $window.scrollTop(),
        viewBottom = viewTop + $window.height(),
        top = $this.offset().top,
        bottom = top + $this.height(),
        compareTop = partial === true ? bottom : top,
        compareBottom = partial === true ? top : bottom;
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};

function setAnimations() {
    function animations() {
        $('.animation').each(function (i, el) {
            if ($(el).visible(true)) {
                if (!$(el).hasClass('animation--completed'))
                    $(el).addClass('animation--animated');
            } else {
                //$(el).removeClass('animation--animated');
            }
            $(el).one('webkitAnimationEnd animationend', function () {
                $(this).removeClass('animation--animated').addClass('animation--completed');
            });
        });
    }
    $(window).scroll(function () {
        animations();
    });
    $(window).resize(function () {
        animations();
    });
    animations();
}

$(document).on('turbolinks:load', function () {
    setAnimations();
});

$(document).on('turbolinks:before-cache', function () {
    $('.animation--completed').removeClass('animation--completed');
});