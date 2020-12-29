//= require ./vendor/turbo-7.0.0-beta.1.umd
//= require ./vendor/jquery-1.12.4.min
//= require ./vendor/stimulus-2.0.0.umd
//= require_tree ./controllers

// show the progress bar regardless of delay
Turbo.setProgressBarDelay(0);

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
                // $(el).removeClass('animation--animated');
            }
            $(el).one('webkitAnimationEnd animationend', function () {
                $(this).removeClass('animation--animated').addClass('animation--completed');
            });
        });
    }
    // check animations on scroll
    $(window).scroll(function () {
        animations();
    });
    // check animations on resize
    $(window).resize(function () {
        animations();
    });
    // quick hack to make sure menu list appears
    $(document).on('click', '.burger__link', function () {
        $('.menu').one('webkitTransitionEnd tranisitionend', function () {
            animations();
        });
    });
    // add js class to html
    $('html').addClass('js');
    // check animations on load
    animations();
}

function setRecaptcha() {
    if(!$('#g-recaptcha').length > 0) return;
    grecaptcha.ready(function() {
        // clear the previous recaptcha (if any) to prevent placeholder must be empty error
        $('#g-recaptcha').html('');
        // render the recaptcha
        grecaptcha.render("g-recaptcha", {
            "sitekey": "6LdImLAZAAAAAFRWPNNCeyNy7vUAiawPvQceT_K7",
            "callback": "recaptchaClicked"
        });
    });
}

$(document).on('turbo:load', function () {
    // set animations when document is loaded
    setAnimations();
    // set recaptcha when document is loaded
    setRecaptcha();
});

$(document).on('turbo:before-cache', function () {
    // remove animation complete states before caching
    $('.animation--completed').removeClass('animation--completed');
    // remove any errors
    $('.error').remove();
});