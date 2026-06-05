import { Container } from "react-bootstrap";

// FooterComp component that renders a footer 
export function FooterComp() {
  return (
    <footer
      className="text-center text-white py-3 mt-auto"
      style={{ backgroundColor: "rgba(34, 109, 67, 0.9)" }}
    >
      <Container>
        <p className="mb-0">© 2026 Cat Store. All rights reserved.</p>
      </Container>
    </footer>
  );
}