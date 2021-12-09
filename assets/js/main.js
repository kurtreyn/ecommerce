'use strict';

// https://github.com/keikaavousi/fake-store-api
const shoppingCart = document.querySelector('.shopping-cart');
const products = document.querySelectorAll('[data-product]');
const cartBtns = document.querySelectorAll('[data-button]');
const title = document.querySelectorAll('[data-title]');

const url = `https://fakestoreapi.com/products`;
const mensClothing = [];
const womensClothing = [];

async function getProducts() {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  data.forEach((dat) => {
    // console.log(`${dat.category}`);

    Object.entries(dat).forEach(([key, value]) => {
      // console.log(`${key} ${value}`);
      if (dat.category === `men's clothing`) {
        mensClothing.push(dat);
      } else if (dat.category === `women's clothing`) {
        womensClothing.push(dat);
      }
    });
  });

  for (let i = 0; i < mensClothing.length; i++) {
    console.log(mensClothing[i]);

    // let title = mensClothing[i].title;
    // console.log(title);
  }
}

getProducts();

// function getValue() {
//   for (let p = 0; p < products.length; p++) {
//     let productVal = products[p].getAttribute('data-product');
//     // console.log(productVal);
//     if (products[p].value === 'jacket') {
//       title.innerText = '';
//     }
//   }
// }

// getValue();

// id: 3, id: 16, id: 18, id:19

// console.log(mensClothing);
// console.log(womensClothing);

function clickTest() {
  console.log(`button was clicked`);
}

for (const cartBtn of cartBtns) {
  cartBtn.addEventListener('click', clickTest);
}
