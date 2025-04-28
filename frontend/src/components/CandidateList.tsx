interface Candidate {
  name: string;
  email: string;
  summary: string;
  external_data: string;
}

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList = ({ candidates }: CandidateListProps) => {
  return (
    <div>
      {candidates.map((candidate, index) => (
        <div key={index}>
          <h2>{candidate.name}</h2>
          <p>Email: {candidate.email}</p>
          <p>Summary: {candidate.summary}</p>
          <p>External Data: {candidate.external_data}</p>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
