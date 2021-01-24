const {getTopPosts} = require('../services/RedditService');

exports.topPosts = async function (req, res) {
    const subreddit = req.params.subreddit;
    const result = await getTopPosts(subreddit);

    if (result.success) {
        return res.json({
            data: result.topPosts
        })
    } else {
        res.status(result.err.status).send(result.err);
    }
};