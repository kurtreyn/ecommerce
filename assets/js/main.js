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

  for (let x = 0; x < data.length; x++) {
    // console.log(data[x]);
    if (data[x].category === `men's clothing`) {
      mensClothing.push(data[x]);
    } else if (data[x].category === `women's clothing`) {
      womensClothing.push(data[x]);
    }
  }
}

// console.log(mensClothing);
// console.log(womensClothing);

getProducts();

function getValue() {
  for (let i = 0; i < title.length; i++) {
    // console.log(title[i]);
    let val = title[i].getAttribute('data-title');
    // console.log(val);
  }
}

getValue();

// id: 3, id: 16, id: 18, id:19

// console.log(mensClothing);
// console.log(womensClothing);

function clickTest() {
  console.log(`button was clicked`);
}

for (const cartBtn of cartBtns) {
  cartBtn.addEventListener('click', clickTest);
}
