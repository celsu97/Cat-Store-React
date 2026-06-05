import { InputGroup, Form, Button } from "react-bootstrap";

export default function SearchComp({ searchTerm, onSearch }) {
  return (
    <InputGroup style={{ width: 300 }} className="mb-3">
      <Form.Control
        type="search"
        placeholder="Search for a breed..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Button style={{ backgroundColor: "#226d43", borderColor: "#226d43" }}>
        Search
      </Button>
    </InputGroup>
  );
}