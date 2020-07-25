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