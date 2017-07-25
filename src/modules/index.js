"use strict";
(function (window) {
    // constructor for comment list
    function CommentList(list, element, config) {
        this.list = list;
        this.element = element;
        this.config = Object.assign({
            standardImage: "images/test-user.png",
            noUserImage: "images/no-name-user.png",
            inputPlaceHolder: "Join the discussion",
            replyPlaceHolder: "Enter reply",
            maxLevelDown: 2,
            userLinkFormatter: function (text) {
                return text;
            }
        }, config);
    }

    CommentList.prototype.destroy = function() {
        this.element.innerHTML = "";
    };
    CommentList.prototype.render = function () {
        var self = this;
        var config = this.config;
        var comment = new commentListUtils.Comment(this.list, config, 1);
        var inputSection = new commentListUtils.InputSection(config);

        // comments-widget wrapper
        var mainContainer = new commentListUtils.Element("div", "comments-widget");
        this.element.appendChild(mainContainer);

        // Rendering Input container
        var container = new commentListUtils.Element("div", "input-container");
        container.append(inputSection);
        mainContainer.appendChild(container);

        // Rendering comment list container
        container = new commentListUtils.Element("div", "comment-list-container");
        container.appendChild(comment);
        mainContainer.appendChild(container);

        // Adding Event Listener to main input
        addEnterEventToInput(mainContainer, function(e) {
            var content = e.target.value;
            content = content.trim();
            if(content) {
                if (typeof config.submitAPIHandler === "function") {
                    config.submitAPIHandler({
                        content: content
                    }).then(function (resp) {
                        self.list.unshift(resp);
                        self.destroy();
                        self.render();
                    });
                } else {
                    console.log("Don't know what to do with this comment");
                }
            }
        });
    };
    function addEnterEventToInput(element, callback) {
        element.querySelector(".input-section").addEventListener("keypress", function (e) {
            var keyCode = e.which;
            if (keyCode == 13 && typeof callback === "function") {
                callback(e);
            }
        });
    }
    window.commentList = function (list, element, config) {
        var commentList = new CommentList(list, element, config);
        return commentList;
    };
})(window);