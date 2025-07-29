import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Helper: Get cart from localStorage
const getLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

// Helper: Save cart to localStorage
const saveLocalCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getLocalCart());

  // Save to localStorage on any cart change
  useEffect(() => {
    saveLocalCart(cart);
  }, [cart]);

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

  // Sync with backend
  const syncCartWithBackend = async () => {
    try {
      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });
      alert("✅ Cart synced to backend!");
    } catch (err) {
      console.error("Sync failed", err);
      alert("❌ Sync failed.");
    }
  };

  // Load cart from backend (overwrites local)
  const fetchBackendCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart");
      if (!res.ok) throw new Error("Backend fetch failed");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Backend fetch error", err);
    }
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
        syncCartWithBackend,
        fetchBackendCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
