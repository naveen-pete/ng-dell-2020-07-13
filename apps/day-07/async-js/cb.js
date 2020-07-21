// Asynchronous code - callbacks

function getUser(name, cb) {
  console.log('getUser started.');
  // ajax request
  setTimeout(() => {

    const user = users.find(u => u.name === name);
    if (user) {
      cb(null, user);
    } else {
      cb('No user found.', null);
    }

    console.log('getUser ended.');
  }, 5000);
}

function showUser(user) {
  console.log('user:', user);
}

console.log('begin');

const username = 'ram';
// getUser(username, showUser);  // 4 seconds
getUser(
  username,
  (error, result) => {
    if (error) {
      console.log('Error:', error);
      return;
    }

    console.log('user:', result);
    // getPosts(result.id, (error, result) => {
    //   if(error) {
    //     console.log('Error:', error);
    //     return;
    //   }

    //   console.log('posts for the user:', result);
    // });
  }
);  // 4 seconds

console.log('do some other operation');

console.log('end');

// function sayHi() {
//   console.log('Hi');
//   // return undefined;
// }

// const retVal = sayHi();
// console.log('retVal:', retVal);

// nested callback