import { useEffect, useState } from "react";
import CandidateList from "./CandidateList";

export type Candidate = {
  name: string;
  email: string;
  keywords: any;
  gpt_summary: string;
  wikipedia_summary: string;
  created_at: string;
  summary: string;
  external_data: any;
};

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/candidates");

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.keywords.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) =>
    sortAsc
      ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div>
      <h1>Candidates List</h1>
      <input
        type="text"
        placeholder="Search by name or keywords"
        value={searchQuery}
        onChange={handleSearch}
      />
      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort by Date ({sortAsc ? "Newest First" : "Oldest First"})
      </button>
      <CandidateList candidates={sortedCandidates} />
    </div>
  );
};

export default Candidates;
