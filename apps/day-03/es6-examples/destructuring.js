console.log('Destructuring assignment demo');

// Object destructuring

// const name = product.name;
// const price = product.price;

function showProduct(prod) {
  let { name: fullName, price, description } = prod;
  let id;

  // let fullName = prod.name;

  console.log('prod:', prod);

  console.log('id:', id);
  console.log('fullName:', fullName);
  console.log('price:', price);
  console.log('description:', description);
}

const product = {
  id: 1,
  name: 'iPhone X',
  price: 50000
};

showProduct(product);

let companies = ['Dell', 'Microsoft', 'Google'];

// let c1 = companies[0];

let [c1, ...c2] = companies;

console.log('c1:', c1);
console.log('c2:', c2);

let companiesCopy = [...companies];