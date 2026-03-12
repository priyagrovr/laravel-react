import { useState } from "react";
import type { CandidateResponse } from "../services/types";
import { fetchCandidates } from "../services/api";

const CandidateList = () => {
  const [candidates, setCandidates] = useState<CandidateResponse[]|[]>([]);

  const loadCandidates = async () => {
    try {
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Failed to load candidates:', error);
    }
  }
  loadCandidates();

  return (
    <div> 
      <h2>Candidate List</h2>
      <ul>
        {/* {candidates.length > 0 && candidates.map(candidate => (
          <>
          <li key={candidate.id}>{candidate.name} - {candidate.experience_years}</li>
          <li><button onClick={() => {}}>Start Assessment</button></li>
          </>
        ))} */}
      </ul>
    </div>
  )

}

export default CandidateList;