"use strict";
(function (window) {
    function ReplySection(config, list, render) {
        var container = new commentListUtils.Element("div", "reply-container hide");
        var input = new commentListUtils.Element("input", "", "", [{
            key: "type",
            value: "text"
        }, {
            key: "placeholder",
            value: config.replyPlaceHolder
        }]);
        var enterCallback = function (e) {
            var text = e.target.value;
            if(typeof config.replyCommentHandler === "function") {
                config.replyCommentHandler({
                    parentId: list.id,
                    content: text
                }).then(function (resp) {
                    list.children.unshift(resp);
                    render();
                });
            } else {
                console.log("revertDislikeHandler not registered");
            }
        };
        container.appendChild(input);
        input.addEventListener("keypress", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                enterCallback(e);
            }
        });
        return container;
    }

    if(typeof window.commentListUtils === "undefined") {
        window.commentListUtils = {};
    }
    window.commentListUtils.ReplySection = ReplySection;
})(window);

