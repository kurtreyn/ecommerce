'use strict';

// https://github.com/keikaavousi/fake-store-api
const shoppingCart = document.querySelector('.shopping-cart');
const products = document.querySelectorAll('[data-product]');
const cartBtns = document.querySelectorAll('[data-button]');
const title = document.querySelectorAll('[data-title]');
const card = document.querySelectorAll('.card');
let thisTitle = '';

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
  loadProducts();
}

// console.log(mensClothing);
// console.log(womensClothing);

getProducts();

function loadProducts() {
  // let thisProduct = this.getAttribute('data-product');
  // thisTitle = this.getAttribute('data-title');

  for (let y = 0; y < mensClothing.length; y++) {
    // console.log(mensClothing[y].image);
    let image = mensClothing[y].image;
    let currentTitle = mensClothing[y].title;
    if (currentTitle === mensClothing[y].title) {
    }
  }

  for (let t = 0; t < title.length; t++) {
    let titleVal = title[t].getAttribute('data-title');
    // console.log(titleVal);
  }
}

// function getValue() {
//   for (let i = 0; i < title.length; i++) {
//     // console.log(title[i]);
//     let val = title[i].getAttribute('data-title');
//     // console.log(val);
//   }
// }

// getValue();

// id: 3, id: 16, id: 18, id:19

function clickTest() {
  console.log(`button was clicked`);
}

for (const cartBtn of cartBtns) {
  cartBtn.addEventListener('click', clickTest);
}
