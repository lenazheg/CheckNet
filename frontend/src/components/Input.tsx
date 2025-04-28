import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/processCandidate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            keywords,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      navigate("/candidates");
    } catch (error) {
      console.error("Error saving candidate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Input Candidate Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Candidate Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Candidate Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Some Keywords:</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            required
          />
        </div>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <button type="submit">Submit</button>
        )}{" "}
      </form>
    </div>
  );
};

export default Input;
