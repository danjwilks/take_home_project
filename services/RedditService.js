const fetch = require("node-fetch");

exports.getTopPosts = async function(subreddit) {
    var result = [];
    for (i = 0; i < 10; i++) {
        result.push({
            id: 'id',
            type: 'type',
            attributes: {
                title: 'title'
            }
        });
    }

    const url = buildTopPostsUrl(subreddit);
    const redditJson = await fetchRedditJson(url);
    const unsanitisedPosts = parsePostsFromRedditJson(redditJson);
    const sanitisedPosts = sanitisePosts(unsanitisedPosts);
    const formattedPost = formatPosts(sanitisedPosts);
    return formattedPost;
};

function formatPosts(sanitisedPosts) {
    var formattedPosts = [];
    for (sanitisedPost of sanitisedPosts) {
        formattedPosts.push({
            id: sanitisedPost.id,
            type: 'post',
            attributes: sanitisedPost
        });
    };
    return formattedPosts;
}

function buildTopPostsUrl(subreddit) {
    const url = `https://www.reddit.com/r/${subreddit}/top/.json?t=all&limit=10`;
    return url;
};

async function fetchRedditJson(url) {
    const response = await fetch(url);
    return response.json();
}

function parsePostsFromRedditJson(redditJson) {
    const unsanitisedPosts = redditJson.data.children;
    return unsanitisedPosts;
}

function sanitisePosts(unsanitisedPosts) {
    var sanitisedPosts = [];
    for (unsanitisedPost of unsanitisedPosts) {
        sanitisedPost = sanitisePost(unsanitisedPost);
        sanitisedPosts.push(sanitisedPost);
    };
    return sanitisedPosts;
};

function sanitisePost(unsanitisedPost) {
    sanitisedPost = {
        title: unsanitisedPost.data.title,
        upvote_ratio: unsanitisedPost.data.upvote_ratio,
        score: unsanitisedPost.data.score,
        over_18: unsanitisedPost.data.over_18,
        id: unsanitisedPost.data.id,
        author: unsanitisedPost.data.author,
        num_comments: unsanitisedPost.data.num_comments,
        permalink: unsanitisedPost.data.permalink
    };
    return sanitisedPost;
};

module.exports.buildTopPostsUrl = buildTopPostsUrl;
module.exports.parsePostsFromRedditJson = parsePostsFromRedditJson;
module.exports.sanitisePosts = sanitisePosts;
module.exports.sanitisePost = sanitisePost;
module.exports.formatPosts = formatPosts;
