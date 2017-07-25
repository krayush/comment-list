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
            userLinkFormatter: function (text) {
                return text;
            }
        }, config);
    }
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

    // constructor for creating Top input section
    function InputSection(config) {
        var container = new Element("div");
        var imageContainer = new ImageContainer(config.noUserImage, "user-image");
        var input = new Element("input", "input-section", "", [{
            key: "placeholder",
            value: config.inputPlaceHolder
        }]);
        var clearDiv = new Element("div", "clear");
        container.appendChild(imageContainer);
        container.appendChild(input);
        container.appendChild(clearDiv);
        return container;
    }

    // constructor for image container
    function ImageContainer(imageUrl, className, config) {
        var element = new Element("img", className, "",
            [{key: "src",value: imageUrl || config.standardImage}]);
        return element;
    }

    function ReplySection(config, list, render) {
        var container = new Element("div", "reply-container hide");
        var input = new Element("input", "", "", [{
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

    // constructor for likes and dislikes section
    function LikesDislikes(item, config) {
        var container = new Element("div", "like-dislike-container");
        function render() {
            container.innerHTML = "";
            var likes = new Element("span",
                item.yourLike === "like" ? 'liked': "like",
                (item.likes || 0) + " - " + (item.yourLike === "like" ? 'Liked': "Like"));
            var dislikes = new Element("span",
                item.yourLike === "dislike" ? 'disliked': "dislike",
                (item.dislikes || 0) + " - "+(item.yourLike === "dislike" ? 'Disliked': "Dislike"));
            var reply = new Element("span", "reply", "Reply");
            var share = new Element("span", "share", "Share");

            container.appendChild(likes);
            container.appendChild(dislikes);
            container.appendChild(reply);
            container.appendChild(share);
        }
        function likeHandler() {
            if(config.likeHandler) {
                config.likeHandler(item).then(function (resp) {
                    item = Object.assign(item, resp);
                    render();
                });
            } else {
                console.log("likeHandler not registered");
            }
        }
        function dislikeHandler() {
            if(config.dislikeHandler) {
                config.dislikeHandler(item).then(function (resp) {
                    item = Object.assign(item, resp);
                    render();
                });
            } else {
                console.log("dislikeHandler not registered");
            }
        }
        function likedHandler() {
            if(config.revertLikeHandler) {
                config.revertLikeHandler(item).then(function (resp) {
                    item = Object.assign(item, resp);
                    render();
                });
            } else {
                console.log("revertLikeHandler not registered");
            }
        }
        function dislikedHandler() {
            if(config.revertDislikeHandler) {
                config.revertDislikeHandler(item).then(function (resp) {
                    item = Object.assign(item, resp);
                    render();
                });
            } else {
                console.log("revertDislikeHandler not registered");
            }
        }
        function replyHandler(e) {
            var parent = commentListUtils.findAncestor(e.target, "comment-block");
            parent.querySelector(".reply-container").classList.remove("hide");
        }
        // Handling event via event delegation to avoid re-attaching events
        function addEventListenerForLikeDislikeSection() {
            container.addEventListener("click", function (e) {
                var className = e.target.className;
                switch(className) {
                    case "share":
                        var event = new CustomEvent("share-post", { detail: item });
                        document.dispatchEvent(event);
                        break;
                    case "like":
                        likeHandler();
                        break;
                    case "dislike":
                        dislikeHandler();
                        break;
                    case "liked":
                        likedHandler();
                        break;
                    case "disliked":
                        dislikedHandler();
                        break;
                    case "reply":
                        replyHandler(e);
                        break;
                }
            });
        }
        addEventListenerForLikeDislikeSection();
        render();
        return container;
    }

    function Comment(list, config) {
        var commentSection, children, imageContainer, likesDislikes, clearDiv, userName, time, content, replySection;
        var container = new Element("div");
        function render() {
            container.innerHTML = "";
            list.forEach(function(item) {
                clearDiv = new Element("div", "clear");
                likesDislikes = new LikesDislikes(item, config);
                imageContainer = new ImageContainer(item.userImageUrl, "user-image", config);
                commentSection = new Element("div", "comment-block")
                children = new Element("div", "children-comments");
                userName = new Element("span", "user-name", config.userLinkFormatter(item.userName));
                time = new Element("span", "comment-time", commentListUtils.timeSince(item.time));
                content = new Element("div", "content", item.content);
                replySection = new ReplySection(config, item, render);
                // Appending div to container
                commentSection.appendChild(imageContainer);
                commentSection.appendChild(userName);
                commentSection.appendChild(time);
                commentSection.appendChild(content);
                commentSection.appendChild(likesDislikes);
                commentSection.appendChild(replySection);

                commentSection.appendChild(clearDiv);

                // Processing children
                if(item.children && item.children.length) {
                    var comment = new Comment(item.children, config);
                    children.appendChild(comment);
                }
                commentSection.appendChild(children);
                container.appendChild(commentSection);
            });
        }
        render();
        return container;
    }

    CommentList.prototype.destroy = function() {
        this.element.innerHTML = "";
    };
    CommentList.prototype.render = function () {
        var self = this;
        var config = this.config;
        var comment = new Comment(this.list, config);
        var inputSection = new InputSection(config);

        // comments-widget wrapper
        var mainContainer = new Element("div", "comments-widget");
        this.element.appendChild(mainContainer);

        // Rendering Input container
        var container = new Element("div", "input-container");
        container.append(inputSection);
        mainContainer.appendChild(container);

        // Rendering comment list container
        container = new Element("div", "comment-list-container");
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