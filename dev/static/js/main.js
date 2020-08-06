document.addEventListener('DOMContentLoaded', () => {
    const shareButtons = document.querySelectorAll('.article__share-btn');
    const moreButton = document.querySelector('.more__btn');
    const popupList = document.querySelector('.more__popup-list');
    const nav = document.querySelector('.nav');
    const hamburgerButton = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav__item');

    // add event listeners to buttons and links
    for (let i = 0; i < shareButtons.length; i++) {
        shareButtons[i].addEventListener('click', showSharedContent);
        shareButtons[i].addEventListener('click', showStats);
    }

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', setActiveLink);
    }

    moreButton.addEventListener('click', toggleMorePopup);
    hamburgerButton.addEventListener('click', toggleMobileMenu);

    // close more popup list if clicked outside of it
    document.addEventListener('click', e => {
        if (!e.target.closest('.user__more')) {
            popupList.classList.remove('active');
        }
    });

    // reset menu state when screen width is more than 769 pixels
    window.addEventListener('resize', e => {
        const width = document.documentElement.clientWidth || screen.width;

        if (width > 768) {
            hamburgerButton.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // handlers
    function showSharedContent(e) {
        const articleNode = e.target.closest('.article');
        const sharedContentNode = articleNode.querySelector('.article__shared-content');

        sharedContentNode.classList.add('show');
    }

    function showStats(e) {
        const shareButton = e.target;
        const shareButtonWrapper = shareButton.parentElement;
        const currentStatsBlock = shareButtonWrapper.nextElementSibling;

        shareButtonWrapper.style.display = 'none';
        currentStatsBlock.classList.add('show');
    }

    function toggleMorePopup(e) {
        popupList.classList.toggle('active');
    }

    function toggleMobileMenu(e) {
        hamburgerButton.classList.toggle('active');
        nav.classList.toggle('active');
    }

    function setActiveLink(e) {
        const currentLink = e.target;

        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove('nav__item--active');
        }

        currentLink.classList.add('nav__item--active');
    }
});


// Polyfills

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// closest IE 11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

// matches IE 11
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();
