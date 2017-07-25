(function (window) {
    // constructor for creating Top input section
    function InputSection(config) {
        var container = new commentListUtils.Element("div");
        var imageContainer = new commentListUtils.ImageContainer(config.noUserImage, "user-image");
        var input = new commentListUtils.Element("input", "input-section", "", [{
            key: "placeholder",
            value: config.inputPlaceHolder
        }]);
        var clearDiv = new commentListUtils.Element("div", "clear");
        container.appendChild(imageContainer);
        container.appendChild(input);
        container.appendChild(clearDiv);
        return container;
    }
    if(typeof window.commentListUtils === "undefined") {
        window.commentListUtils = {};
    }
    window.commentListUtils.InputSection = InputSection;
})(window);