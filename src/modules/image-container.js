"use strict";
(function (window) {
// constructor for image container
    function ImageContainer(imageUrl, className, config) {
        var element = new commentListUtils.Element("img", className, "",
            [{key: "src",value: imageUrl || config.standardImage}]);
        return element;
    }
    if(typeof window.commentListUtils === "undefined") {
        window.commentListUtils = {};
    }
    window.commentListUtils.ImageContainer = ImageContainer;
})(window);
