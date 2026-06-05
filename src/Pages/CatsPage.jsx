import { useState } from "react";
import { useBreeds } from "../Context/BreedsContext";
import { Spinner, Alert, Container, Row, Col, Pagination } from "react-bootstrap";
import CatCard from "../Components/CatCardComp";
import SearchComp from "../Components/SearchComp";

// Number of cats to show per page
const CATS_PER_PAGE = 10;


export default function CatsPage() {
  // Get breeds data and loading/error states from context
  const { breeds, loading, error } = useBreeds();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter cats based on search term (case-insensitive)
  const filteredCats = breeds.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input changes
  function handleSearch(term) {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  // Calculate pagination details
  const totalPages = Math.max(1, Math.ceil(filteredCats.length / CATS_PER_PAGE));
  const start = (currentPage - 1) * CATS_PER_PAGE;
  const catsToShow = filteredCats.slice(start, start + CATS_PER_PAGE);

  // Show loading spinner while data is being fetched
  if (loading) return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" variant="success" />
    </div>
  );

  // Show error message if there was an error fetching data
  if (error) return (
    <Alert variant="danger" className="m-4">Failed to load cats: {error}</Alert>
  );

  // Render the cats page with search, cat cards, and pagination
  return (
    <Container className="py-4 text-center" style={{ maxWidth: 1000 }}>
      <h1 className="Title">Our Cats</h1>

      {/* Search Component */}
      <SearchComp searchTerm={searchTerm} onSearch={handleSearch} />
      {filteredCats.length === 0 ? (
        <p className="catText">No cats found matching your search.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {catsToShow.map((breed) => (
            <Col key={breed.id}>
              <CatCard cat={breed} />
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {filteredCats.length > 0 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <Pagination className="mb-1">
            <Pagination.Prev
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            />
            <Pagination.Item disabled>
              Page {currentPage} of {totalPages}
            </Pagination.Item>
            <Pagination.Next
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
}