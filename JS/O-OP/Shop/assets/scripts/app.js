class product {
  title;
  imageURl;
  price;
  description;

  constructor(title, imageURl, price, description) {
    this.title = title;
    this.imageURl = imageURl;
    this.price = price;
    this.description = description;
  }
}

class shoppingCart {
  items = [];

  addProduct(product) {
    this.items.push(product);
    this.totalSum = `
    <h2> Total : ${1}</h2>`;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
    <h2>Total: ${0}</h2>
    <button>Order</button>`;
    cartEl.className = "cart";
    this.totalSum = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addtoCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("il");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
              <h2>${this.product.title}</h2>
            <img src="${this.product.imageURl}"/>
            <h3>${this.product.description}</h3>
            <p>${this.product.price}$</p>
            <button>Add Now👟</button>`;

    const addCartBtn = prodEl.querySelector("button");

    addCartBtn.addEventListener("click", this.addtoCart.bind(this));

    return prodEl;
  }
}

class ProductsList {
  products = [
    new product(
      "Samsung Galaxy s25",
      "https://cdn.bug.co.il/images/site/products//2a105714-6e8d-424f-85d4-8f48572788e4.jpg",
      2730,
      "used Galaxy s25",
    ),
    new product(
      "Samsung Galaxy s25+",
      "https://d3m9l0v76dty0.cloudfront.net/system/photos/16146635/large/b3cefa784c10e860b9f52af4b4d0bf16.png",
      3288,
      "used Galaxy s25+",
    ),
    new product(
      "Samsung Galaxy s25 Ultra",
      "https://d3m9l0v76dty0.cloudfront.net/system/photos/16648131/large/04670c4eb69c99db62ebb43cc4c5ba3c.png",
      4599,
      "used Galaxy s25 Ultra",
    ),
    new product(
      "Samsung Galaxy s26",
      "https://img.zap.co.il/pics/5/6/2/4/91444265c.gif",
      3999,
      "used Galaxy Z Fold 6",
    ),
    new product(
      "Samsung Galaxy s25",
      "https://cdn.bug.co.il/images/site/products//2a105714-6e8d-424f-85d4-8f48572788e4.jpg",
      2730,
      "used Galaxy s26",
    ),
    new product(
      "Samsung Galaxy Z Flip 6",
      "https://hrc-shops.co.il/wp-content/uploads/2024/09/Z-FLIP-6-F741-Main-Screen.webp",
      4000,
      "used Galaxy Z Flip 6",
    ),
  ];

  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";

    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }

    return prodList;
  }
}

class Shop {
  render() {
    const app = document.getElementById("app");

    this.cart = new shoppingCart();
    const cartEl = this.cart.render();

    const productsList = new ProductsList();
    const prodListEl = productsList.render();

    app.append(prodListEl);
    app.append(cartEl);
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    shop.render();

    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
