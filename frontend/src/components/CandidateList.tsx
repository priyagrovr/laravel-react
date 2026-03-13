import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Candidate } from '../services/types';
import { fetchCandidates } from '../services/api';
import CreateCandidate from './CreateCandidate';

const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const navigate = useNavigate();

  const loadCandidates = async () => {
    try {
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Failed to load candidates:', error);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  return (
    <div>
      <CreateCandidate onCreated={loadCandidates} />

      <div style={{ marginTop: '30px' }}>
        <h2>Candidate List</h2>
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Experience (Years)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.experience_years}</td>
                <td>
                  <button onClick={() => navigate(`/assessments/schedule/${candidate.id}`)}>
                    Start Assessment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {candidates.length === 0 && <p>No candidates found.</p>}
      </div>
    </div>
  );
};

export default CandidateList;
