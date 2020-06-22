Turbolinks.setProgressBarDelay(0);

$(document).on('click', '.burger__link', (e) => {
    e.preventDefault();
    let burger = $('.burger__link');
    burger.toggleClass('burger__link--active');
    let menu = $('.menu');
    menu.toggleClass('menu--active');
});