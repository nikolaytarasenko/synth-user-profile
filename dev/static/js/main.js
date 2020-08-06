document.addEventListener('DOMContentLoaded', e => {
    const shareButtons = document.querySelectorAll('.article__share-btn');
    const moreButton = document.querySelector('.more__btn');
    const popupList = document.querySelector('.more__popup-list');

    // add event listeners to buttons
    for (let i = 0; i < shareButtons.length; i++) {
        shareButtons[i].addEventListener('click', showSharedContent);
        shareButtons[i].addEventListener('click', showStats);
    }

    moreButton.addEventListener('click', toggleMorePopup);

    // close more popup list if clicked outside of it
    document.addEventListener('click', e => {
        if (!e.target.closest('.user__more')) {
            popupList.classList.remove('active');
        }
    });

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
