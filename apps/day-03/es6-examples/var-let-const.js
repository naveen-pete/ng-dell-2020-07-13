console.log('var vs let vs const');

let a = 30;
console.log('start a:', a);  // 10

a = 50;

// if(condition)
{
  let a = 40;
  a = 100;
  console.log('inside a:', a);  // 20
}

console.log('end a:', a);  // 10


// ES5 - Scope
// 1. Global
// 2. Function

// ES6 - Scope (let / const)
// 1. Global
// 2. Function
// 3. Block-level
