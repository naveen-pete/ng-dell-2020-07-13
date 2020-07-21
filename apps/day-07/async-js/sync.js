// Synchronous code
function getUser(name) {
  const user = users.find(u => u.name === name);
  return user;
}

console.log('begin');

const username = 'ram';
const result = getUser(username);  // 4 seconds
console.log('result:', result);

console.log('do some other operation');

console.log('end');
