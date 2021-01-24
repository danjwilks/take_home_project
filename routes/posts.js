const express = require('express')
const router = express.Router()

router.get('/top/:subreddit', (req, res) =>{
    res.status(200).send();
});

module.exports = router;