'use strict';

// link: https://youtu.be/023Psne_-_4?t=10530

// https://github.com/keikaavousi/fake-store-api
const shoppingCart = document.querySelector('.shopping-cart');
const products = document.querySelectorAll('[data-product]');
const productsDOM = document.querySelector('.product-container');
const cartBtns = document.querySelectorAll('[data-button]');
const title = document.querySelectorAll('[data-title]');
const card = document.querySelectorAll('.card');
const cartIconBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const cartDOM = document.querySelector('.cart');
const cartContent = document.querySelector('.cart-content');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
let thisTitle = '';

const url = '../products.json';
let cart = [];
let buttonsDOM = [];

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
  // GET CART BUTTON METHOD
  getCartButtons() {
    const cartButtons = [...document.querySelectorAll('.add-cart-btn')];
    // console.log(cartButtons);
    buttonsDOM = cartButtons;
    cartButtons.forEach((button) => {
      let id = button.dataset.button;
      // console.log(id);
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }
      button.addEventListener('click', (event) => {
        // console.log(event);
        event.target.innerText = 'In Cart';
        event.target.disabled = true;
        // GET PRODUCT FROM PRODUCTS
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        // console.log(cartItem);
        // ADD PRODUCT TO CART
        cart = [...cart, cartItem];
        // console.log(cart);
        // SAVE CART IN LOCAL STORAGE
        Storage.saveCart(cart);
        // SET CART VALUES
        this.setCartValues(cart);
        // DISPLAY CART ITEM
        this.addCartItem(cartItem);
        // SHOW CART
        this.showCart();
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
    // console.log(cartTotal, cartItems);
  }
  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
    <img src=${item.image} alt="product">
    <div>
        <h4>${item.title}</h4>
        <h5>$${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
    </div>
    <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>
    `;
    cartContent.appendChild(div);
    // console.log(cartContent);
  }
  showCart() {
    cartDOM.classList.add('showCart');
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartIconBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  hideCart() {
    cartDOM.classList.remove('showCart');
  }
}

// SAVE PRODUCTS TO LOCAL STORAGE
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

// EVENT LISTENER
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  // SETUP APP
  ui.setupAPP();

  // GET ALL PRODUCTS
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getCartButtons();
    });
});
