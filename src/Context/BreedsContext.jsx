import { createContext, useContext, useState, useEffect } from "react";

// Create a context for the cat breeds
const BreedsContext = createContext(null);

// API endpoint and key for fetching cat breeds data
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds?limit=30";
const API_KEY = "live_nCkPqchoPMfjAT05rcVdP02b4p7SSNvjm1c68j8OZ0D1yq4G3Nv8IBsipRA02yaI";

// Provider component that fetches cat breeds data and provides it to the rest of the app through context.
export function BreedsProvider({ children }) {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cat breeds data when the component mounts and handle loading and error states.
  useEffect(() => {
    fetch(BREEDS_URL, { headers: { "x-api-key": API_KEY } })
      .then((r) => r.json())
      .then((data) => { setBreeds(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []); // Runs once on app mount, data available everywhere

  // Provide the breeds data and loading/error states to the rest of the app through context.
  return (
    <BreedsContext.Provider value={{ breeds, loading, error }}>
      {children}
    </BreedsContext.Provider>
  );
}

// Custom hook to access the breeds context, ensuring it is used within a BreedsProvider.
// eslint-disable-next-line react-refresh/only-export-components
export function useBreeds() {
  const ctx = useContext(BreedsContext);
  if (!ctx) throw new Error("useBreeds must be used inside BreedsProvider");
  return ctx;
}