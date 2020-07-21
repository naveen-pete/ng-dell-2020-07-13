import { users, posts } from './data';

const getUser = function (userName, cb) {
  console.log('callback - getUser() started.');
  setTimeout(() => {
    const user = users.find(
      u => u.name === userName
    );

    if (!user) {
      cb('Could not find user.', null);
    } else {
      cb(null, user);
    }

  }, 3000);
};

const getPosts = (userId, cb) => {
  console.log('getPosts() started.');
  setTimeout(() => {
    const postsForUser = posts.filter(
      p => p.userId === userId
    );

    if (postsForUser.length <= 0) {
      cb('Could not find posts for user', null);
    } else {
      cb(null, postsForUser);
    }

  }, 3000);
};

export function doWork() {
  getUser('hari', (err, user) => {
    if (err) {
      console.log('getUser() Error:', err);
      return;
    }

    console.log('user:', user);
    getPosts(user.id, (err, posts) => {
      if (err) {
        console.log('getPosts() Error:', err);
        return;
      }

      console.log('posts for user:', posts);
    });
  });
}
