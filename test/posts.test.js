const { expect } = require('chai');
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
    // following the JSON:API spec. Array can be empty.
    it("has array of resource objects within top level of data", (done) => {
        request(app)
            .get('/posts/top/ttd')
            .end((err, res) => {
                if (err) {return done(err);};
                expect(res.body.data).to.be.instanceof(Array);
                for (resourceObject in res.body.data) {
                    expect(resourceObject).to.be.have.property('id');
                    expect(resourceObject).to.be.have.property('type');
                }
                done();
            });
    });
});