'use strict';

// link: https://youtu.be/023Psne_-_4?t=13740
// contentful: https://app.contentful.com/spaces/yxaudlzz1cht/content_types/new/fields

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
const clearCartBtn = document.querySelector('.clear-cart');

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
  cartLogic() {
    // use arrow function so 'this' points to the method
    // clear cart button
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });
    // cart functionality
    cartContent.addEventListener('click', (event) => {
      // console.log(event.target);
      if (event.target.classList.contains('remove-item')) {
        let removeItem = event.target;
        // console.log(removeItem);
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        // console.log(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains('fa-chevron-up')) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        // console.log(addAmount);
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains('fa-chevron-down')) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }
  clearCart() {
    // console.log(this);
    let cartItems = cart.map((item) => item.id);
    // console.log(cartItems);
    cartItems.forEach((id) => this.removeItem(id));
    console.log(cartContent.children);
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `Add to Cart`;
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.button === id);
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
      ui.cartLogic();
    });
});
