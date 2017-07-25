(function (window) {
    // constructor for creating element
    function Element(type, className, content, dataAttrs) {
        var element = document.createElement(type || "div");
        if(className) {
            var classList = className.split(" ");
            classList.forEach(function (classItem) {
                element.classList.add(classItem);
            })
        }

        element.innerHTML = content || "";
        if(dataAttrs && dataAttrs.length) {
            dataAttrs.forEach(function(dataAttr) {
                element.setAttribute(dataAttr.key, dataAttr.value);
            });
        }
        return element;
    }

    if(typeof window.commentListUtils === "undefined") {
        window.commentListUtils = {};
    }
    window.commentListUtils.Element = Element;
})(window);