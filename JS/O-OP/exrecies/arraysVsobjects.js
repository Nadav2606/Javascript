// const products1 = [
//   {
//     id: 1,
//     product: "Samsung Galaxy s25+",
//     price: 2730,
//     imageURl:
//       "https://cdn.bug.co.il/images/site/products//2a105714-6e8d-424f-85d4-8f48572788e4.jpg",
//   },

//   {
//     id: 2,
//     product: "Samsung Galaxy s25+",
//     price: 3288,
//     imageURl:
//       "https://gfx3.senetic.com/akeneo-catalog/0/7/2/f/072f44f57fa547b82f10debcb078c49e16c2446c_1766148_SM_S931BLBGEUE_image1.jpg",
//   },

//   {
//     id: 3,
//     product: "Samsung Galaxy s25 Ultra",
//     price: 4599,
//     imageURl:
//       "https://d3m9l0v76dty0.cloudfront.net/system/photos/16648131/large/04670c4eb69c99db62ebb43cc4c5ba3c.png",
//   },

//   {
//     id: 4,
//     product: "Samsung Galaxy z Fold 6",
//     price: 3999,
//     imageURl: "https://img.zap.co.il/pics/5/6/2/4/91444265c.gif",
//   },

//   {
//     id: 5,
//     product: "Samsung Galaxy Flip 6",
//     price: 4000,
//     imageURl:
//       "https://hrc-shops.co.il/wp-content/uploads/2024/09/Z-FLIP-6-F741-Main-Screen.webp",
//   },
// ];

// products1.forEach((prod) => {
//   const prodDiv = document.createElement("div");
//   prodDiv.innerHTML = `
//     <img src="${prod.imageURl}"/>
//     <h2>${prod.product}</h2>
//     <p>${prod.price}</p>`;

//   document.body.append(prodDiv);
// });

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

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodEl = document.createElement("il");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
              <h2>${this.product.title}</h2>
            <img src="${this.product.imageURl}"/>
            <h3>${this.product.description}</h3>
            <p>${this.product.price}</p>`;

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
      "Samsung Galaxy Z Fold 6",
      "https://img.zap.co.il/pics/5/6/2/4/91444265c.gif",
      3999,
      "used Galaxy s25",
    ),
    new product(
      "Samsung Galaxy s25",
      "https://cdn.bug.co.il/images/site/products//2a105714-6e8d-424f-85d4-8f48572788e4.jpg",
      2730,
      "used Galaxy Z Fold 6",
    ),
    new product(
      "Samsung Galaxy Z Flip 6",
      "https://hrc-shops.co.il/wp-content/uploads/2024/09/Z-FLIP-6-F741-Main-Screen.webp",
      4000,
      "used Galaxy Z Flip 6",
    ),
  ];

  render() {
    const app = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";

    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }

    app.append(prodList);
  }
}

const productsList = new ProductsList();
productsList.render();
