const express = require("express");
const posts = require('./routes/posts')
const app = express();

app.use('/posts', posts);

module.exports = app;