import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useCart } from "../Context/CartContext";

// FormComp component that represents the checkout form displayed in a modal
export function FormComp({ show, onHide }) {
  // Accessing cart data and actions from the CartContext
  const { cart, clearCart, totalItems } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  // Function to handle changes in the form inputs and update the form state accordingly.
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Function to handle the checkout process
  function handleCheckout() {
    // Generate a string of cat names and quantities for the order confirmation message.
    const catNames = cart.map((c) => `${c.name} (x${c.quantity || 1})`).join(", ");
    onHide();
    // Display an order confirmation alert with the customer's information and order details.
    alert(
      `Order Confirmation\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Address: ${form.address}\n\n` +
      `Total items: ${totalItems}\n` +
      `Products: ${catNames}\n\n` +
      `Thank you for your purchase!`
    );
    // Clear the cart and reset the form after checkout.
    clearCart();
    setForm({ name: "", email: "", address: "" });
  }

  // Render the checkout form inside a modal
  return (
    
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ backgroundColor: "rgba(34,109,67,0.9)" }}>
        <Modal.Title className="text-white">Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Checkout Form */}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
              required/>
          </Form.Group>
        </Form>
      </Modal.Body>
      {/* Modal Footer */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button
          variant="success"
          onClick={handleCheckout}
          disabled={!form.name || !form.email || !form.address}>
          Place Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormComp;