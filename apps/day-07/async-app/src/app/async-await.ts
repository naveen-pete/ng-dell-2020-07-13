import { users, posts } from './data';

const getUser = (userName) => {
  return new Promise((resolve, reject) => {
    console.log('async/await - getUser() started.');
    setTimeout(() => {
      const user = users.find(
        u => u.name === userName
      );

      if (!user) {
        reject('Could not find user.');
      } else {
        resolve(user);
      }

    }, 3000);
  });
};

const getPosts = (userId) => {
  return new Promise((resolve, reject) => {
    console.log('getPosts() started.');
    setTimeout(() => {
      const postsForUser = posts.filter(
        p => p.userId === userId
      );

      if (postsForUser.length <= 0) {
        reject('Could not find posts for user');
      } else {
        resolve(postsForUser);
      }

    }, 3000);
  });
}

export const doWork = async () => {
  try {
    const user: any = await getUser('krish');
    console.log('user:', user);

    const posts: any = await getPosts(user.id);
    console.log('posts for user:', posts);
  } catch (err) {
    console.log('Error:', err);
  }
};