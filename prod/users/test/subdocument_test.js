const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: "Post Title"
      },
      {
        title: "Post Title #2"
      }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === "Post Title");
        done();
      });
  });

  it('can add subdocument to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: "Post Title"
      }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        user.posts.push({
          title: "Post Title #2"
        });
 
        return user.save(); 
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
          assert(user.posts[1].title === "Post Title #2");
          done();
        }
      );
  });

  it('can remove subdocument to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: "Post Title"
      }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        user.posts[0].remove();

        return user.save(); 
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
          assert(user.posts.length === 0);
          done();
        }
      );
  });
});