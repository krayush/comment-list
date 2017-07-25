(function (window) {
    // constructor for likes and dislikes section
    function LikesDislikes(item, config, level) {
        var container = new commentListUtils.Element("div", "like-dislike-container");
        function render() {
            container.innerHTML = "";
            var likes = new commentListUtils.Element("span",
                item.yourLike === "like" ? 'liked': "like",
                (item.likes || 0) + " - " + (item.yourLike === "like" ? 'Liked': "Like"));
            var dislikes = new commentListUtils.Element("span",
                item.yourLike === "dislike" ? 'disliked': "dislike",
                (item.dislikes || 0) + " - "+(item.yourLike === "dislike" ? 'Disliked': "Dislike"));

            var reply = new commentListUtils.Element("span", "reply", "Reply");
            var share = new commentListUtils.Element("span", "share", "Share");

            container.appendChild(likes);
            container.appendChild(dislikes);
            if(config.maxLevelDown >= level) {
                container.appendChild(reply);
            }
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
    if(typeof window.commentListUtils === "undefined") {
        window.commentListUtils = {};
    }
    window.commentListUtils.LikesDislikes = LikesDislikes;
})(window);