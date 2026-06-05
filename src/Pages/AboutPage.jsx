import { Container } from "react-bootstrap";

// AboutPage component that displays information about the cat store, including a header image and contact details.
export default function AboutPage() {
  return (
    <>
    {/* Header section with a background image of two cats resting on grass. */}
      <header style={{ width: "100%", height: 300, overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1657027563718-8d1974977b02?fm=jpg&q=60&w=3000&auto=format&fit=crop"
          alt="Two cats resting on grass"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </header>
    {/* Main content section with information about the cat store. */}
      <Container>
        <br />
        <h1 className="Title" style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
          About Us
        </h1>
        <p className="ownerInfoText" style={{ maxWidth: 600, margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.6", textAlign: "center" }}>
          We are a small business with a passion for cats and how to care for them.
          <br /><br />
          Our team consists of cat lovers who have years of experience in cat care, breeding,
          and rescue. We are dedicated to providing the best products and information to help
          cat owners give their feline friends the best life possible.
          <br /><br />
          To contact us, reach us via email at{" "}
          <a href="mailto:info@catstore.com">info@catstore.com</a> or call us at 123-456-7890.
          <br />
          To visit us, our address is 123 Cat Street, Cat City, CC 12345. We look forward
          to hearing from you!
        </p>
      </Container>
    </>
  );
}