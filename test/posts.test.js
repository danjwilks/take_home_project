const {expect} = require('chai');
const request = require('supertest');
const app = require('../app');

describe("posts route", () => {
    it("handles the request", (done) => {
        request(app).get('/posts/top/soccer')
            .expect(200)
            .end(done);
    });
    it("handles requests to different subreddits", (done) => {
        request(app).get('/posts/top/liverpoolfc')
            .expect(200)
            .end(done);
    });
    it("handles invalid subreddit requests", (done) => {
        const notFound = request(app)
            .get('/posts/top/thisSubDoesNotExist9999')
            .expect(404)
            .end(done);
    });
    // following the JSON:API spec
    it("has data property within top level of response body", (done) => {
        request(app)
            .get('/posts/top/ttd')
            .end((err, res) => {
                if (err) {return done(err);};
                expect(res.body).to.have.property('data');
                done();
            });
    });
    // following the JSON:API spec.
    it("has array of resource objects within top level of data", (done) => {
        request(app)
            .get('/posts/top/soccer')
            .end((err, res) => {
                if (err) {return done(err);};
                expect(res.body.data).to.be.instanceof(Array);
                // /r/soccer has more than 10 posts
                expect(res.body.data.length).to.equal(10);
                for (resourceObject of res.body.data) {
                    expect(resourceObject).to.have.property('id');
                    expect(resourceObject).to.have.property('type');
                    expect(resourceObject).to.have.property('attributes');
                }
                done();
            });
    });
    it("has each resource object has reddit post properties", (done) => {
        request(app)
            .get('/posts/top/soccer')
            .end((err, res) => {
                if (err) {return done(err);};
                for (post of res.body.data) {
                    expect(post.attributes).to.have.property('title');
                    // expect(post.attributes).to.have.property('type');
                }
                done();
            });
    });
});