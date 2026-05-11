import { products, cart } from "./data.js";
import { renderProducts, updateCartUI } from "./ui.js";

const productList = document.getElementById("product-list");

renderProducts(products, productList);
