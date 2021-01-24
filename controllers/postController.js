const {getTopPosts} = require('../services/RedditService');

exports.topPosts = async function (req, res) {
    const subreddit = req.params.subreddit;
    try {
        const topPosts = await getTopPosts(subreddit);
        return res.json({
            data: topPosts
        });
    } catch (err) {
        res.status(500).send(err);
    }
};