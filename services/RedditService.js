const fetch = require("node-fetch");
const {post} = require("../app");

exports.getTopPosts = async function(subreddit) {
    var result = [];
    for (i = 0; i < 10; i++) {
        result.push({
            id: 'id',
            type: 'type',
            attributes: 'attributes'
        });
    }
    return result;
};
