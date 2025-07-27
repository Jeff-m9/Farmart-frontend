// src/Pages/Cart.js

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addToCart = (animal) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === animal.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...animal, quantity: 1 });
  }

  saveCart(cart);
};

const removeFromCart = (animalId) => {
  let cart = getCart();
  cart = cart
    .map((item) =>
      item.id === animalId ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0);
  saveCart(cart);
};

const isInCart = (animalId) => {
  const cart = getCart();
  return cart.some((item) => item.id === animalId);
};

export { getCart, saveCart, addToCart, removeFromCart, isInCart };
