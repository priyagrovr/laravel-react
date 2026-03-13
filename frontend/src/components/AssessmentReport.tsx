import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { AssessmentReport as ReportType } from '../services/types';
import { fetchAssessmentReport, submitAnswer } from '../services/api';

const AssessmentReport = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<ReportType | null>(null);
  const [scores, setScores] = useState<Record<number, number | ''>>({});
  const [savedMsg, setSavedMsg] = useState<Record<number, string>>({});
  const [error, setError] = useState('');

  const loadReport = async () => {
    try {
      const data = await fetchAssessmentReport(Number(id));
      setReport(data.data);
      const initial: Record<number, number | ''> = {};
      data.data.responses.forEach((r: ReportType['responses'][0]) => {
        initial[r.response_id] = r.score ?? '';
      });
      setScores(initial);
    } catch {
      setError('Failed to load report');
    }
  };

  useEffect(() => {
    loadReport();
  }, [id]);

  const handleScoreSave = async (responseId: number) => {
    const score = scores[responseId];
    if (score === '' || score === undefined) {
      setSavedMsg((prev) => ({ ...prev, [responseId]: 'Enter a score first' }));
      return;
    }
    try {
      await submitAnswer(responseId, { score: Number(score) });
      setSavedMsg((prev) => ({ ...prev, [responseId]: 'Score saved!' }));
      loadReport();
    } catch {
      setSavedMsg((prev) => ({ ...prev, [responseId]: 'Failed to save' }));
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!report) return <p>Loading...</p>;

  return (
    <div>
      <h2>Assessment Report</h2>
      <p><strong>Candidate:</strong> {report.candidate.name}</p>
      <p><strong>Email:</strong> {report.candidate.email}</p>
      <p><strong>Experience:</strong> {report.candidate.experience_years} years</p>
      <p><strong>Assessment Date:</strong> {new Date(report.scheduled_at).toLocaleString()}</p>

      <table border={1} cellPadding={8} cellSpacing={0} style={{ marginTop: '15px' }}>
        <thead>
          <tr>
            <th>Question</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Answer</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {report.responses.map((r) => (
            <tr key={r.response_id}>
              <td>{r.question.title}</td>
              <td>{r.question.difficulty}</td>
              <td>{r.question.category}</td>
              <td>{r.answer_text || '-'}</td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={100}
                  style={{ width: '60px' }}
                  value={scores[r.response_id] ?? ''}
                  onChange={(e) =>
                    setScores((prev) => ({
                      ...prev,
                      [r.response_id]: e.target.value === '' ? '' : Number(e.target.value),
                    }))
                  }
                />
              </td>
              <td>
                <button onClick={() => handleScoreSave(r.response_id)}>Save Score</button>
                {savedMsg[r.response_id] && (
                  <span style={{
                    marginLeft: '5px',
                    fontSize: '12px',
                    color: savedMsg[r.response_id] === 'Score saved!' ? 'green' : 'red',
                  }}>
                    {savedMsg[r.response_id]}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '15px' }}>Total Score: {report.total_score}</h3>
      <p>Average Score: {report.average_score}</p>
    </div>
  );
};

export default AssessmentReport;
