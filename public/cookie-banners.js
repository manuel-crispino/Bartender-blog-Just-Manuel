document.addEventListener('DOMContentLoaded', function () {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Check if the user has already accepted cookies
    const userAcceptedCookies = localStorage.getItem('userAcceptedCookies');

    if (userAcceptedCookies) {
        cookieBanner.style.display = 'none';
    }

    const hideCookieBanner = () => {
        // Set a flag in localStorage to remember the user's consent
        localStorage.setItem('userAcceptedCookies', 'true');
        cookieBanner.style.display = 'none';
    };

    acceptCookiesButton.addEventListener('click', hideCookieBanner);
});
