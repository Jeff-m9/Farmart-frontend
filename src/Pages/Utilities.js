import { BASE_URL } from "../utils";

//This code syncs local cart to backend-
export const syncLocalCartToBackend = async () => {
  const token = localStorage.getItem("access_token");
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];

  for (const item of localCart) {
    try {
      await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          animal_id: item.id,
          quantity: item.quantity || 1,
          total_amount: item.price * (item.quantity || 1),
        }),
      });
    } catch (err) {
      console.error("Sync failed for item:", item.name);
    }
  }

  
  localStorage.removeItem("cart");
};
