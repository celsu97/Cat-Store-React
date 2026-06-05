import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Spinner, Alert } from "react-bootstrap";

// API endpoint and key for fetching cat images from The Cat API.
const IMAGES_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const API_KEY = "live_nCkPqchoPMfjAT05rcVdP02b4p7SSNvjm1c68j8OZ0D1yq4G3Nv8IBsipRA02yaI";

// HomePage component that fetches and displays cat images, along with a welcome message and navigation button.
export default function HomePage() {
  // State variables for managing images, loading status, and error messages.
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch cat images when the component mounts.
  useEffect(() => {
    fetch(IMAGES_URL, { headers: { "x-api-key": API_KEY } })
      .then((r) => r.json())
      .then((data) => { setImages(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  // Render the homepage with a header image, welcome message, navigation button, and cat images.
  return (
    <>
      <header style={{ width: "100%", height: "auto", overflow: "hidden" }}>
        <img
          src="https://www.shutterstock.com/image-photo/ginger-domestic-cat-gazes-upward-600nw-2681343353.jpg"
          alt="Pale cat looking up"
          style={{ display: "block", width: "100%", maxHeight: "300px", height: "auto", objectFit: "cover" }}
        />
      </header>

      <Container className="text-center py-4">
        <h1 className="Title">Welcome to the Cat Store!</h1>
        <p className="welcome-message mx-auto" style={{ maxWidth: 600 }}>
          We are passionate about cats and dedicated to providing the best care and products
          for our feline friends. Whether you're looking for different cat breeds, care tips,
          or just want to explore — you've come to the right place!
        </p>
        <Button as={Link} to="/cats" variant="success" className="mb-4">
          Browse Our Cats →
        </Button>

        {/* Display loading spinner, error message, or cat images based on the current state. */}
        {loading && (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="success" />
          </div>
        )}
        {error && <Alert variant="danger">Failed to load images: {error}</Alert>}
        {!loading && !error && (
          <div
            className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mx-auto"
            style={{ maxWidth: 900 }}
          >
            {/* Map over the fetched images and display them in a responsive grid layout. */}
            {images.map((img) => (
              <div key={img.id} className="col">
                <img
                  src={img.url}
                  alt="Cat"
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: 8,
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}