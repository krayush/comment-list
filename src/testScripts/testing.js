// Note: We are testing 2 apps simultaneously

var a = commentList([{
    id: 1,
    content: "Something just happened hereSomething just happened hereSomething " +
    "just happened hereSomething just happened hereSomething just happened here",
    userId: 12,
    userImageUrl: "",
    userName: "test",
    likes: 5,
    dislikes: 32,
    time: 1500911429715,

    yourLike: "dislike",
    children: [{
        id: 3,
        content: "Something just happened here3Something just happened here3Something just happened " +
        "here3Something just happened here3Something just happened here3",
        userId: 13,
        userImageUrl: "",
        time: 1500909111715,
        likes: 5,
        dislikes: 3,
        userName: "Ayush",
        children: [{
            id: 3,
            content: "Something just happened here3Something just happened here3Something " +
            "just happened here3Something just happened here3Something just happened here3",
            userId: 13,
            userImageUrl: "",
            time: 1500909111715,
            likes: 5,
            dislikes: 3,
            userName: "Ayush",
            children: []
        }, {
            id: 4,
            content: "Something just happened here4",
            userId: 12,
            time: 1500909111715,
            userImageUrl: "",
            userName: "test",
            likes: 5,
            dislikes: 32,
            children: []
        }]
    }, {
        id: 4,
        content: "Something just happened here4",
        userId: 12,
        time: 1500909111715,
        userImageUrl: "",
        likes: 5,
        dislikes: 32,
        userName: "test",
        children: []
    }]
}, {
    id: 2,
    content: "Something again just happened here",
    children: [],
    userId: 12,
    likes: 5,
    dislikes: 32,
    time: 1500909111715,
    userImageUrl: "",
    userName: "test"
}], document.getElementById("app1"), {
    submitAPIHandler: function (data) {
        return new Promise(function (resolve, reject) {
            resolve({
                time: new Date(),
                id: Math.random(),
                children: [],
                likes: 0,
                dislikes: 0,
                userId: 12,
                content: data.content,
                userImageUrl: "",
                userName: "test"
            });
        });
    },
    userLinkFormatter: function (text) {
        return "<a href=''>" + text + "</a>";
    },
    likeHandler: function (data) {
        return new Promise(function (resolve, reject) {
            resolve({
                id: data.id,
                likes: data.likes + 1,
                dislikes: data.yourLike === "dislike" ? data.dislikes - 1: data.dislikes,
                yourLike: "like"
            });
        });
    },
    dislikeHandler: function (data) {
        return new Promise(function (resolve, reject) {
            resolve({
                id: data.id,
                likes: data.yourLike === "like" ? data.likes - 1: data.likes,
                dislikes: data.dislikes + 1,
                yourLike: "dislike"
            });
        });
    },
    revertLikeHandler: function (data) {
        return new Promise(function (resolve) {
            resolve({
                id: data.id,
                likes: data.likes - 1,
                dislikes: data.dislikes,
                yourLike: ""
            });
        });
    },
    revertDislikeHandler: function (data) {
        return new Promise(function (resolve, reject) {
            resolve({
                id: data.id,
                likes: data.likes,
                dislikes: data.dislikes - 1,
                yourLike: ""
            });
        });
    },
    replyCommentHandler: function (data) {
        return new Promise(function (resolve, reject) {
            resolve({
                id: Math.random(),
                content: data.content,
                userId: 12,
                userImageUrl: "",
                userName: "test",
                likes: 0,
                dislikes: 0,
                time: Date.now(),
                yourLike: "",
                children: []
            });
        });
    }
});
a.render();
document.addEventListener("share-post",function (event) {
    console.error(event.detail)
});

/* Testing 2 apps simultaneously */

var b = commentList([{
    id: 1,
    content: "Something just happened hereSomething just happened hereSomething " +
    "just happened hereSomething just happened hereSomething just happened here",
    userId: 12,
    userImageUrl: "",
    userName: "test",
    likes: 5,
    dislikes: 32,
    time: 1500911429715,

    yourLike: "dislike",
    children: [{
        id: 4,
        content: "Something just happened here4",
        userId: 12,
        time: 1500909111715,
        userImageUrl: "",
        likes: 5,
        dislikes: 32,
        userName: "test",
        children: []
    }]
}, {
    id: 2,
    content: "Something again just happened here",
    children: [],
    userId: 12,
    likes: 5,
    dislikes: 32,
    time: 1500909111715,
    userImageUrl: "",
    userName: "test"
}], document.getElementById("app2"), {
    submitAPIHandler: function (data) {
        return new Promise(function (resolve, reject) {
            resolve({
                time: new Date(),
                id: Math.random(),
                children: [],
                likes: 0,
                dislikes: 0,
                userId: 12,
                content: data.content,
                userImageUrl: "",
                userName: "test"
            });
        });
    },
    userLinkFormatter: function (text) {
        return "<a href=''>" + text + "</a>";
    },
    likeHandler: function (data) {
        return new Promise(function (resolve) {
            resolve({
                id: data.id,
                likes: data.likes + 1,
                dislikes: data.yourLike === "dislike" ? data.dislikes - 1: data.dislikes,
                yourLike: "like"
            });
        });
    },
    dislikeHandler: function (data) {
        return new Promise(function (resolve) {
            resolve({
                id: data.id,
                likes: data.yourLike === "like" ? data.likes - 1: data.likes,
                dislikes: data.dislikes + 1,
                yourLike: "dislike"
            });
        });
    },
    revertLikeHandler: function (data) {
        return new Promise(function (resolve) {
            resolve({
                id: data.id,
                likes: data.likes - 1,
                dislikes: data.dislikes,
                yourLike: ""
            });
        });
    },
    revertDislikeHandler: function (data) {
        return new Promise(function (resolve) {
            resolve({
                id: data.id,
                likes: data.likes,
                dislikes: data.dislikes - 1,
                yourLike: ""
            });
        });
    },
    replyCommentHandler: function (data) {
        return new Promise(function (resolve, reject) {
            resolve({
                id: Math.random(),
                content: data.content,
                userId: 12,
                userImageUrl: "",
                userName: "test",
                likes: 0,
                dislikes: 0,
                time: Date.now(),
                yourLike: "",
                children: []
            });
        });
    }
});
b.render();