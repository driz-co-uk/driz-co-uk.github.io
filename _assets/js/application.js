//= require ./vendor/turbolinks-5.2.0.min
//= require ./vendor/jquery-1.12.4.min
//= require ./vendor/waypoints-4.0.1.min
//= require ./vendor/inview-4.0.1.min
//= require_tree ./vendor
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

function setAnimations() {
    $('.animation').each(function () {
        new Waypoint.Inview({
            element: $(this),
            enter: function () {
                if(!$(this.element).hasClass('animation--completed'))
                    $(this.element).addClass('animation--animated');
            }
        });
        $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animation--animated').addClass('animation--completed');
        });
    });
}

$(document).on('turbolinks:load', function () {
    setAnimations();
});

$(document).on('turbolinks:before-render', function () {
    $('.animation--completed').removeClass('animation--completed');
});