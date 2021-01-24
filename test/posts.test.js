const request = require('supertest');
const app = require('../app');

describe("posts route", () => {
    it("gets the top posts", (done) => {
        request(app).get('/posts/top/soccer')
            .expect(200, done);
    });
});