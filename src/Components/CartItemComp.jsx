import { useCart } from "../Context/CartContext";
import { Button } from "react-bootstrap";

// Placeholder image URL for cats without an image.
const PLACEHOLDER = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

// CartItem component that represents a single item in the shopping cart, 
// displaying the cat's image, name, origin, quantity, 
// and a button to remove the item from the cart.
export default function CartItemComp({ cat, index }) {
  const { removeFromCart } = useCart();

  return (
    <div className="cartItem d-flex align-items-center gap-3 py-3 border-bottom">
      {/* Item Image */}
      <img
        src={cat.image?.url || PLACEHOLDER}
        alt={cat.name}
        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6, flexShrink: 0 }}
        onError={(e) => { e.target.src = PLACEHOLDER; }}
      />
      {/* Item Details */}
      <div className="flex-grow-1 text-start">
        <p className="mb-1"><strong>Breed:</strong> {cat.name}</p>
        <p className="mb-1"><strong>Origin:</strong> {cat.origin}</p>
        <p className="mb-0"><strong>Quantity:</strong> {cat.quantity || 1}</p>
      </div>
      {/* Remove Item Button */}
      <Button variant="outline-danger" size="sm"
        className="remove-btn"
        onClick={() => removeFromCart(index)}
        aria-label={`Remove ${cat.name} from cart`}>
        Delete
      </Button>
    </div>
  );
}