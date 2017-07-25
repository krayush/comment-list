"use strict";
(function (window) {
    // x time ago formatting achieved through this standard code
    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        var resultSeconds = Math.floor(seconds);
        if (resultSeconds < 5) {
            return "Just now";
        }
        if (resultSeconds < 15) {
            return "a few seconds ago";
        }
        return resultSeconds + " seconds ago";
    }
    function findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
    window.commentListUtils = {
        timeSince: timeSince,
        findAncestor: findAncestor
    };
})(window);