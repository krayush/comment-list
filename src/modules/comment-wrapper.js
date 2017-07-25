"use strict";
(function (window) {
    function Comment(list, config, level) {
        var commentSection, children, imageContainer, likesDislikes, clearDiv, userName, time, content, replySection;
        var container = new commentListUtils.Element("div");
        function render() {
            container.innerHTML = "";
            list.forEach(function (item) {
                clearDiv = new commentListUtils.Element("div", "clear");
                likesDislikes = new commentListUtils.LikesDislikes(item, config, level);
                imageContainer = new commentListUtils.ImageContainer(item.userImageUrl, "user-image", config);
                commentSection = new commentListUtils.Element("div", "comment-block")
                children = new commentListUtils.Element("div", "children-comments");
                userName = new commentListUtils.Element("span", "user-name", config.userLinkFormatter(item.userName));
                time = new commentListUtils.Element("span", "comment-time", commentListUtils.timeSince(item.time));
                content = new commentListUtils.Element("div", "content", item.content);
                replySection = new commentListUtils.ReplySection(config, item, render);
                // Appending div to container
                commentSection.appendChild(imageContainer);
                commentSection.appendChild(userName);
                commentSection.appendChild(time);
                commentSection.appendChild(content);
                commentSection.appendChild(likesDislikes);
                if (config.maxLevelDown >= level) {
                    commentSection.appendChild(replySection);
                }
                commentSection.appendChild(clearDiv);

                // Processing children
                if (item.children && item.children.length) {
                    var comment = new commentListUtils.Comment(item.children, config, level + 1);
                    children.appendChild(comment);
                }
                commentSection.appendChild(children);
                container.appendChild(commentSection);
            });
        }
        render();
        return container;
    }
    if(typeof window.commentListUtils === "undefined") {
        window.commentListUtils = {};
    }
    window.commentListUtils.Comment = Comment;
})(window);