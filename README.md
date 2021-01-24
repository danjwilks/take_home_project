# Frameworks used
- express
- node
- mocha
- supertest
- chai

# Instructions on how to launch the application locally
- download project
- cd into project directory
- run `npm install`
- run `node index.js`
- open http://localhost:3000/ within your browser
- use endpoint /posts/top/:subreddit to access top posts


# Overview of how the application works
A RESTful API that follows [JSON:API spec](https://jsonapi.org/).
Complete with tests.

There is an endpoint: /posts/top/:subreddit. 
The route is handled by a route handler posts.js. This 
route handler uses a post controller to retrieve the 
top posts. The post controller uses a Reddit service 
object to handle the request to reddit to get the 
resulting posts. Data sanitisation and formatting is 
done at this level.

Tests are found within the test folder. There are 
integration tests and unit tests.

# Project Running on Heroku
- https://stark-citadel-61133.herokuapp.com/
