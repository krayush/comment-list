# comment-list

## Introduction

A widget for implementing comments plugin

## Prerequisites (only for testing / preview)

1. Install Node
2. ```npm install```
 
## Directory Structore

The `/` project directory contains all code used in the application along with all tests of such code.
```
/
  |- src/
  |- dist/
  |- images/
  |- .gitignore
  |- gruntfile.js
  |- package.json
  |- README.md

```

## Build & development

Run `npm run build` for building and `npm run start` for preview.

**Note: Please check testing.js for full fledged implementation**

## Usage
```
var list = commentList([{
    id: 1,
    content: "Something just happened "
    userId: 12,
    userImageUrl: "",
    userName: "test",
    likes: 5,
    dislikes: 32,
    time: 1500911429715,
    yourLike: "dislike",
    children: [{
    }]
}], document.getElementById("app1"), {});
         
```

- Registering likes/dislikes handlers
```

var list = commentList([{
    id: 1,
    content: "Something just happened "
    userId: 12,
    userImageUrl: "",
    userName: "test",
    likes: 5,
    dislikes: 32,
    time: 1500911429715,
    yourLike: "dislike",
    children: [{
    }]
}], document.getElementById("app1"), {
    likeHandler: function (data) {
        return new Promise(function (resolve, reject) {
            
        });
    },
    dislikeHandler: function (data) {
        return new Promise(function (resolve, reject) {
            
        });
    },
    revertLikeHandler: function (data) {
        return new Promise(function (resolve) {
            
        });
    },
    revertDislikeHandler: function (data) {
        return new Promise(function (resolve, reject) {
            
        });
    },
});

```

- Registering to Share

```
element.addEventListener("share-post",function (event) {
    console.error(event.detail) // Getting the data
});
```

- Changing default images path

Inside the config (3rd parameter, all we need to do is override the config)
Below is the basic config structure

```

{
    standardImage: "images/test-user.png",
    noUserImage: "images/no-name-user.png",
    inputPlaceHolder: "Join the discussion",
    userLinkFormatter: function (text) {
        return text;
    },
    maxLevelDown: 4
}

```

- Changing maximum nesting level of allowing comments
```
maxLevelDown: 4
```

- Reply Handler

```$xslt
replyCommentHandler: function (data) {
    return new Promise(function (resolve, reject) {
        
    });
}
```