'use strict';
const shoppingCart = document.querySelector('.shopping-cart');
const products = document.querySelectorAll('[data-product]');
const cartBtns = document.querySelectorAll('[data-button]');

function clickTest() {
  console.log(`button was clicked`);
}

for (const cartBtn of cartBtns) {
  cartBtn.addEventListener('click', clickTest);
}
