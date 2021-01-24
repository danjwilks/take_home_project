const express = require("express");
const posts = require('./routes/posts')
const port = process.env.PORT || 3000;
const app = express();

app.use('/posts', posts);

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});