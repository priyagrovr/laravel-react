import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { AssessmentReport as ReportType } from '../services/types';
import { fetchAssessmentReport, submitAnswer } from '../services/api';

const AssessmentScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportType | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [savedMsg, setSavedMsg] = useState<Record<number, string>>({});
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const data = await fetchAssessmentReport(Number(id));
        setReport(data.data);
        const initial: Record<number, string> = {};
        data.data.responses.forEach((r: ReportType['responses'][0]) => {
          initial[r.response_id] = r.answer_text || '';
        });
        setAnswers(initial);
      } catch {
        setError('Failed to load assessment');
      }
    };
    loadAssessment();
  }, [id]);

  const handleSave = async (responseId: number) => {
    setSaving((prev) => ({ ...prev, [responseId]: true }));
    setSavedMsg((prev) => ({ ...prev, [responseId]: '' }));
    try {
      await submitAnswer(responseId, { answer_text: answers[responseId] });
      setSavedMsg((prev) => ({ ...prev, [responseId]: 'Saved!' }));
    } catch {
      setSavedMsg((prev) => ({ ...prev, [responseId]: 'Failed to save' }));
    }
    setSaving((prev) => ({ ...prev, [responseId]: false }));
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!report) return <p>Loading...</p>;

  return (
    <div>
      <h2>Assessment for {report.candidate.name}</h2>
      <p>Scheduled: {new Date(report.scheduled_at).toLocaleString()}</p>

      {report.responses.map((r) => (
        <div key={r.response_id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px' }}>
          <h3>{r.question.title}</h3>
          <p>Difficulty: {r.question.difficulty} | Category: {r.question.category}</p>
          <textarea
            rows={4}
            cols={60}
            value={answers[r.response_id] || ''}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [r.response_id]: e.target.value }))}
            placeholder="Write your answer here..."
          />
          <br />
          <button onClick={() => handleSave(r.response_id)} disabled={saving[r.response_id]}>
            {saving[r.response_id] ? 'Saving...' : 'Save Answer'}
          </button>
          {savedMsg[r.response_id] && (
            <span style={{ marginLeft: '10px', color: savedMsg[r.response_id] === 'Saved!' ? 'green' : 'red' }}>
              {savedMsg[r.response_id]}
            </span>
          )}
        </div>
      ))}

      <button onClick={() => navigate(`/assessments/${id}/report`)} style={{ marginTop: '20px' }}>
        View Report
      </button>
    </div>
  );
};

export default AssessmentScreen;
