'use strict';

// https://youtu.be/023Psne_-_4?t=6376

// https://github.com/keikaavousi/fake-store-api
const shoppingCart = document.querySelector('.shopping-cart');
const products = document.querySelectorAll('[data-product]');
const productsDOM = document.querySelector('.product-container');
const cartBtns = document.querySelectorAll('[data-button]');
const title = document.querySelectorAll('[data-title]');
const card = document.querySelectorAll('.card');
let thisTitle = '';

const url = '../products.json';
const mensClothing = [];
const womensClothing = [];

// GET PRODUCTS
class Products {
  async getProducts() {
    try {
      let result = await fetch(url);
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price, description } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, description, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// DISPLAY PRODUCTS
class UI {
  displayProducts(products) {
    // console.log(products);
    let result = '';
    products.forEach((product) => {
      result += `
      <div
          class="
            col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3
            text-center
            products
          "
        >
      <div class="card h-100">
      <img
        src=${product.image}
        class="card-img-top"
        alt="purse"
      />
      <div class="card-body d-flex flex-column" data-product="purse">
        <h5 class="card-title" data-title="purse">${product.title}</h5>
        <p class="card-text">
          ${product.description}
        </p>
        <h6>$${product.price}</h6>
        <button
          type="button"
          class="btn add-cart-btn mt-auto"
          data-button=${product.id}
        >
          add to cart
        </button>
      </div>
    </div>
    </div>
      `;
    });
    productsDOM.innerHTML = result;
  }
}

// LOCAL STORAGE
class Storage {
  // -
}

// EVENT LISTENER
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  products.getProducts().then((products) => ui.displayProducts(products));
});
