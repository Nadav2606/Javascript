export const products = [
  { id: 1, name: "New-b1", price: 299, image: "./assets/images/shoe-1.jpg" },
  { id: 2, name: "New-b2", price: 349, image: "assets/images/shoe-2.jpg" },
  { id: 3, name: "New-b3", price: 399, image: "assets/images/shoe-3.jpg" },
  { id: 4, name: "New-b4", price: 449, image: "assets/images/shoe-4.jpg" },
  { id: 5, name: "New-b5", price: 499, image: "assets/images/shoe-5.jpg" },
  { id: 6, name: "Adidas", price: 250, image: "assets/images/shoe-6.jpg" },
  { id: 7, name: "Adidas+", price: 150, image: "assets/images/adidas-1.avif" },
  { id: 8, name: "Adidas++", price: 350, image: "assets/images/adidas-2.webp" },
];

export const cart = {
  items: [],
  add(product) {
    this.items.push(product);
  },
  remove(index) {
    this.items.splice(index, 1);
  },
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price);
  },

  getQuantity() {
    return this.items.length;
  },
};
