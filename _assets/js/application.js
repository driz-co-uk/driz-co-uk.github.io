document.addEventListener("DOMContentLoaded", function () {
    updateGreeting();
    updateYear();
    setInterval(function () {
        updateGreeting();
        updateYear();
    }, 1000);
});

const updateGreeting = function () {
    let today = new Date();
    let hours = today.getHours();
    let greeting = "Hello";
    if (hours < 12) {
        greeting = 'Morning';
    } else if (hours < 17) {
        greeting = 'Afternoon';
    } else if (hours < 20) {
        greeting = 'Evening';
    } else {
        greeting = 'Evening';
    }
    let element = document.getElementsByClassName('greeting')[0];
    element.innerHTML = greeting;
}

const updateYear = function () {
    let today = new Date();
    let year = today.getFullYear();
    let element = document.getElementsByClassName('year')[0];
    element.innerHTML = year;
}