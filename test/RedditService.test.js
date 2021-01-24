const {expect} = require('chai');
const {
    buildTopPostsUrl,
    parsePostsFromRedditJson,
    sanitisePost,
    sanitisePosts,
    formatPosts
} = require('../services/RedditService');
const redditTopPostJson = require('./soccerRedditJson.json');

describe("Reddit Service", () => {
    it("can build reddit urls correctly", () => {
        expect(buildTopPostsUrl('soccer'))
            .to.equal('https://www.reddit.com/r/soccer/top/.json?t=all&limit=10');
    });
    it("can parse posts from reddit jsons", () => {
        const posts = parsePostsFromRedditJson(redditTopPostJson);
        expect(posts)
            .is.instanceOf(Array);
        for (post of posts) {
            expect(post)
                .to.have.property('kind', 't3');
        }
    });
    it("can sanitise posts", () => {
        const postsToSanitise = redditTopPostJson.data.children;
        for (postToSanitise of postsToSanitise) {
            const sanitisedPost = sanitisePost(postToSanitise);
            expect(sanitisedPost)
                .to.not.have.keys(
                    'link_flair_richtext',
                    'secure_media_embed',
                    'all_awardings'
                    );
        };
    });
    it("can format posts", () => {
        const postsToSanitise = redditTopPostJson.data.children;
        const sanitisedPosts = sanitisePosts(postsToSanitise);
        const formattedPosts = formatPosts(sanitisedPosts);
        
        for (formattedPost of formattedPosts) {
            expect(formattedPost).to.have.property('id');
            expect(formattedPost).to.have.property('type');
            expect(formattedPost).to.have.property('attributes');
        }
    })
});
