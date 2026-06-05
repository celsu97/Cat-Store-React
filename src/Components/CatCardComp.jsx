import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Placeholder image URL for cats without an image.
const PLACEHOLDER = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

// CatCard component that displays a cat's image, name, and origin in a card format,
export default function CatCard({ cat }) {
  // Hook to navigate to the cat's detail page when the "View Details" button is clicked.
  const navigate = useNavigate();
  const imgUrl = cat.image?.url || PLACEHOLDER;

  return (
    <Card className="h-100 border-0 shadow rounded overflow-hidden">
      {/* Card Image */}
      <Card.Img
        variant="top"
        src={imgUrl}
        alt={cat.name}
        style={{ aspectRatio: "1/1", objectFit: "cover" }}
        onError={(e) => { e.target.src = PLACEHOLDER; }}
      />
      {/* Card Body */}
      <Card.Body className="d-flex flex-column text-white" style={{ backgroundColor: "rgba(34,109,67,0.9)" }}>
        <Card.Title className="fs-6 fw-bold">{cat.name}</Card.Title>
        <Card.Text className="small mb-auto">
          <strong>Origin:</strong> {cat.origin}
        </Card.Text>
        {/* View Details Button */}
        <Button
          size="sm"
          variant="light"
          className="mt-3 fw-semibold"
          onClick={() => navigate(`/cats/${cat.id}`)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}