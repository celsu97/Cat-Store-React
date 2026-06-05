  import { createContext, useContext, useState, useEffect } from "react";

  // Create a context for the shopping cart
  const ShoppingCartContext = createContext(null);

  
  export function CartProvider({ children }) {
    // Initialize the cart state from localStorage, or start with an empty array if not available or if parsing fails.
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

    // Function to add a cat to the cart
    function addToCart(cat) {
      setCart((prev) => {
        const index = prev.findIndex((item) => item.id === cat.id);
        // If the cat is already in the cart, increment its quantity; otherwise, add it as a new item with quantity 1.
        if (index > -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
          return updated;
        }
        return [...prev, { ...cat, quantity: 1 }];
      });
    }

    // Function to remove a cat from the cart
    function removeFromCart(index) {
      setCart((prev) => {
        const updated = [...prev];
        // If the quantity of the item is greater than 1, decrement it. Otherwise, remove the item from the cart.
        if (updated[index].quantity > 1) {
          updated[index] = { ...updated[index], quantity: updated[index].quantity - 1 };
        } else {
          updated.splice(index, 1);
        }
        return [...updated];
      });
    }

    // Function to clear the entire cart
    function clearCart() {
      setCart([]);
    }

    // Calculate the total number of items in the cart by summing the quantities of all items.
    const totalItems = cart.reduce((sum, cat) => sum + (cat.quantity || 1), 0);

    return (
      <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
        {children}
      </ShoppingCartContext.Provider>
    );
  }

  // Custom hook to access the cart context, ensuring it is used within a CartProvider.
  // eslint-disable-next-line react-refresh/only-export-components
  export function useCart() {
    const ctx = useContext(ShoppingCartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
  }

