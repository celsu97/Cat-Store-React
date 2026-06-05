import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import { useBreeds } from "../Context/BreedsContext";
import { useCart } from "../Context/CartContext";
import { useState } from "react";

const PLACEHOLDER = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

export default function CatDetailPage() {
  // Extract the cat ID from the URL parameters and set up navigation, context, and local state.
  const { id } = useParams();
  const navigate = useNavigate();
  const { breeds, loading } = useBreeds();
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  // Find the cat by ID from the breeds context and check if it's already in the cart to determine the quantity.
  const cat = breeds.find((c) => c.id === id);
  const cartItem = cart.find((c) => c.id === id);
  const qty = cartItem?.quantity || 0;

  // Function to handle adding the cat to the cart, showing a temporary confirmation message.
  function handleAdd() {
    addToCart(cat);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  // Render loading spinner
  if (loading) return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" variant="success" />
    </div>
  );

  if (!cat) return (
    <Container className="py-4 text-center">
      <p>Cat not found.</p>
      <Button variant="success" onClick={() => navigate("/cats")}>Back to Cats</Button>
    </Container>
  );

  // Determine the image URL, using a placeholder if the cat doesn't have an image.
  const imgUrl = cat.image?.url || PLACEHOLDER;

  return (
    <Container className="py-4" style={{ maxWidth: 600 }}>
      {/* Back to Cats Button */}
      <Button
        variant="outline-success"
        className="mb-4"
        onClick={() => navigate("/cats")}>
        ← Back to Cats
      </Button>

      <div className="rounded overflow-hidden shadow">
        {/* Cat Image */}
        <img
          src={imgUrl}
          alt={cat.name}
          onError={(e) => { e.target.src = PLACEHOLDER; }}
          style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}/>
        
        {/* Cat Details */}
        <div className="p-4 text-white" style={{ backgroundColor: "rgba(34,109,67,0.9)" }}>
          <h2 className="fw-bold">{cat.name}</h2>
          <p><strong>Origin:</strong> {cat.origin}</p>
          {cat.temperament && <p><strong>Temperament:</strong> {cat.temperament}</p>}
          {cat.description && <p>{cat.description}</p>}

          {/* Add to Cart Button */}
          <div className="d-flex align-items-center gap-3 mt-3">
            <Button variant="light" className="fw-semibold" onClick={handleAdd}>
              {added ? "✓ Added!" : "Add to Cart"}
            </Button>
            {qty > 0 && <span>In cart: {qty}</span>}
          </div>
        </div>
      </div>
    </Container>
  );
}