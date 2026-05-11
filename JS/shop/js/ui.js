export function renderProducts(products, container) {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
    <img src="${product.image}"/>
    <h2>"${product.name}"</h2>
    <p>Price: $${product.price}</p>
    <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
    `;

    container.appendChild(card);
  });
}
export function updateCartUI(cart) {
  document.getElementById("cart-quantity").textContent = cart.getQuantity();
  document.getElementById("cart-details").textContent = cart.getTotal();
}
