  import { createContext, useContext, useState, useEffect } from "react";

  const ShoppingCartContext = createContext(null);

  export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("cart")) || [];
      } catch {
        return [];
      }
    });

    // Sync to localStorage whenever cart changes
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(cat) {
      setCart((prev) => {
        const idx = prev.findIndex((item) => item.id === cat.id);
        if (idx > -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
          return updated;
        }
        return [...prev, { ...cat, quantity: 1 }];
      });
    }

    function removeFromCart(index) {
      setCart((prev) => {
        const updated = [...prev];
        if (updated[index].quantity > 1) {
          updated[index] = { ...updated[index], quantity: updated[index].quantity - 1 };
        } else {
          updated.splice(index, 1);
        }
        return [...updated];
      });
    }

    function clearCart() {
      setCart([]);
    }

    const totalItems = cart.reduce((sum, cat) => sum + (cat.quantity || 1), 0);

    return (
      <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
        {children}
      </ShoppingCartContext.Provider>
    );
  }

  // eslint-disable-next-line react-refresh/only-export-components
  export function useCart() {
    const ctx = useContext(ShoppingCartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
  }

