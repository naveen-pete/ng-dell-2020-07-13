// Asynchronous code - promise (ES6/2015)

function getUser(name) {
  console.log('getUser started.');

  return new Promise((resolve, reject) => {
    // ajax request
    setTimeout(() => {

      const user = users.find(u => u.name === name);
      if (user) {
        resolve(user);
      } else {
        reject('No user found.');
      }

      console.log('getUser ended.');
    }, 5000);
  });
}

function getPosts(userId) {
  console.log('getPosts started.');

  return new Promise((resolve, reject) => {
    // ajax request
    setTimeout(() => {

      const postsForUser = posts.filter(p => p.userId === userId);
      if (postsForUser.length > 0) {
        resolve(postsForUser);
      } else {
        reject('No posts found.');
      }

      console.log('getPosts ended.');
    }, 5000);
  });
}

console.log('begin');

const username = 'ram';

getUser(username)
  .then((user) => {
    console.log('user:', user);
    return getPosts(user.id);
  })
  .then((postsForUser => {
    console.log('posts for user:', postsForUser);
  }))
  .catch((error) => {
    console.log('Error:', error);
  });

console.log('do some other operation');

console.log('end');
