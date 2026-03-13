import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Question } from '../services/types';
import { fetchQuestions, scheduleAssessment } from '../services/api';

const ScheduleAssessment = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [scheduledAt, setScheduledAt] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch {
        setError('Failed to load questions');
      }
    };
    loadQuestions();
  }, []);

  const toggleQuestion = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (selectedIds.length === 0) {
      setError('Please select at least one question');
      return;
    }

    try {
      const response = await scheduleAssessment({
        candidate_id: Number(candidateId),
        question_ids: selectedIds,
        scheduled_at: scheduledAt || undefined,
      });
      setMessage('Assessment scheduled successfully!');
      const assessmentId = response.data.id;
      setTimeout(() => navigate(`/assessments/${assessmentId}`), 1000);
    } catch {
      setError('Failed to schedule assessment');
    }
  };

  return (
    <div>
      <h2>Schedule Assessment for Candidate #{candidateId}</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Schedule At: </label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>

        <h3>Select Questions</h3>
        {questions.length === 0 && <p>No questions available. Create some first.</p>}
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(q.id)}
                    onChange={() => toggleQuestion(q.id)}
                  />
                </td>
                <td>{q.title}</td>
                <td>{q.difficulty}</td>
                <td>{q.category}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit" style={{ marginTop: '10px' }}>Schedule Assessment</button>
      </form>
    </div>
  );
};

export default ScheduleAssessment;
