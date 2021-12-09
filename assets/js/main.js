'use strict';

const shoppingCart = document.querySelector('.shopping-cart');
// const products = document.querySelectorAll('[data-product]');
const cartBtns = document.querySelectorAll('[data-button]');
// https://github.com/keikaavousi/fake-store-api

function clickTest() {
  console.log(`button was clicked`);
}

for (const cartBtn of cartBtns) {
  cartBtn.addEventListener('click', clickTest);
}

function loadProducts() {
  fetch(`https://fakestoreapi.com/products`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        const description = data[i].category;
        console.log(description);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
loadProducts();
