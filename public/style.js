


// burger menu
document.addEventListener('DOMContentLoaded', function () {
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const burgerMenu = document.getElementById('burgerMenu');

    burgerMenuBtn.addEventListener('click', function () {
        burgerMenu
            .classList
            .toggle('navbar-links-personal');
        burgerMenu
            .classList
            .toggle("hide");
    });
});

// deferStyles.js

function loadCSS(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document
        .head
        .appendChild(link);
}

// Load non-critical CSS asynchronously
loadCSS('/bootstrap.min.css'); // Update with the correct path to your bootstrap.min.css
loadCSS('/style.css');
