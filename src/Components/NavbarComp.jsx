import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// NavbarComp component that renders the navigation bar
export function NavbarComp() {
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">My Cat Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Cats">Choose Cats</Nav.Link>
            <Nav.Link as={Link} to="/Cart">Shopping Cart</Nav.Link>
            <Nav.Link as={Link} to="/About">About us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    )
}

export default NavbarComp