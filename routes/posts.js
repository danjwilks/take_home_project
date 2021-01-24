const express = require('express')
const router = express.Router()

const post_controller = require('../controllers/postController');

router.get('/top/:subreddit', post_controller.topPosts);

module.exports = router;