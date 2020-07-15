console.log('arrow functions');

// ES5 - function statement syntax
// function sum(a, b) {
//   return a + b;
// }

// ES5 - function expression syntax
// var sum = function (a, b) {
//   return a + b;
// };

// ES6 / ES2015 - arrow function syntax #1
// var sum = (a, b) => {
//   return a + b;
// };

// ES6 / ES2015 - arrow function syntax #2
var sum = (a, b) => a + b;

// ES6 / ES2015 - arrow function syntax #3
var square = n => n * n;

var sayHi = () => console.log('hi');

var c = sum(20, 30);
console.log('sum:', c);

var d = square(5);
console.log('square:', d);

sayHi();
