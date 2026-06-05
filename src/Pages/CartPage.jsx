import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useCart } from "../Context/CartContext";
import CartItem from "../Components/CartItemComp";
import FormComp from "../Components/FormComp";
import { Link } from "react-router-dom";

// CartPage component that displays the items in the shopping cart, along with options to clear the cart, continue shopping, or proceed to checkout.
export default function CartPage() {
  const { cart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  // Function to handle clearing the cart with a confirmation prompt.
  function handleClear() {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      clearCart();
    }
  }

  return (
    <Container className="py-4 text-center" style={{ maxWidth: 800 }}>
      <h1 className="Title">Shopping Cart</h1>

      {/* Cart items */}
      <div id="cartContainer" className="mt-4 border rounded p-3 margin-auto py-4" >
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((cat, index) => (
            <CartItem key={`${cat.id}-${index}`} cat={cat} index={index} />
          ))
        )}
      </div>

{/* Controls */}
{cart.length > 0 && (
  <div className="d-flex justify-content-center gap-3 mt-4">
    <Button variant="outline-danger" onClick={handleClear}>
      Clear Cart
    </Button>
    <Button variant="outline-success" as={Link} to="/cats">
      Keep Shopping
    </Button>
    <Button variant="success" onClick={() => setShowModal(true)}>
      Checkout
    </Button>
  </div>
)}

{/* Empty Cart Message */}
{cart.length === 0 && (
  <div className="d-flex justify-content-center mt-4">
    <Button variant="success" as={Link} to="/cats">
      Browse Cats
    </Button>
  </div>
)}

      {/* Checkout Modal */}
      <FormComp show={showModal} onHide={() => setShowModal(false)} />
    </Container>
  );
}