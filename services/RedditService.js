const fetch = require("node-fetch");

// gets and return sanitised json of the top
// reddit posts specified by subreddit param
exports.getTopPosts = async function(subreddit) {
    try {
        const url = buildTopPostsUrl(subreddit);
        const redditJson = await fetchRedditJson(url);
        const unsanitisedPosts = parsePostsFromRedditJson(redditJson);
        const sanitisedPosts = sanitisePosts(unsanitisedPosts);
        const formattedPosts = formatPosts(sanitisedPosts);
        return {success : true, topPosts : formattedPosts}
    } catch (error) {
        let err = error;
        // if the error is due to the fetch, return the error
        // assosiated with the fetch. Otherwise error must be
        // due to an internal issue.
        if (!error.isFetch) {
            err = new Error('Internal Error');
            err.status = 500;    
        }
        return {success: false, err: err}
    }
};

// format the post objects to follow the JSON:API spec
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

// returns url for the top 10 posts of all time within
// givem subreddit.
function buildTopPostsUrl(subreddit) {
    const url = `https://www.reddit.com/r/${subreddit}/top/.json?t=all&limit=10`;
    return url;
};

async function fetchRedditJson(url) {
    const response = await fetch(url);
    const json = await response.json();
    if (typeof json.error !== 'undefined') {
        let err = new Error(json.message);
        err.status = json.error;
        err.isFetch = true;
        throw err;
    }
    return json;
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
