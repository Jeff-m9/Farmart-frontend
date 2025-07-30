import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add or increase quantity
  const addToCart = (animal) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === animal.id);
      if (existing) {
        return prev.map((item) =>
          item.id === animal.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...animal, quantity: 1 }];
    });
  };

  // Remove completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item?.quantity || 0;
  };

  // Calculate Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        getQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
