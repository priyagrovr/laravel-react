import { useState } from "react";
import { scheduleAssessment } from "../services/api";

const ScheduleAssessment = () => {
    const [candidateId, setCandidateId] = useState('');
    const [questionIds, setQuestionIds] = useState('');
    const [scheduleAt, setScheduleAt] = useState<string>('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            // Call API to schedule assessment
            const ids = questionIds ? questionIds.split(',').map(id => parseInt(id.trim())) : [];
            const payload = {
                candidateId,
                questionIds: ids,
                scheduleAt,
            }

            const response = await scheduleAssessment(payload);
            setMessage(response.message);
            setCandidateId('');
            setQuestionIds('');
            setScheduleAt('');

            // await api.scheduleAssessment({ candidateId, questionIds, scheduleAt });
            setMessage('Assessment scheduled successfully');
        }
        catch (error) {
            setError('Failed to schedule assessment');
        }
    }



  return (
    <div>
      <h2>Schedule Assessment</h2>
      {message && <p style={{color: 'green'}}>{message}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Candidate ID:</label>
            <input type="number" placeholder="Candidate Id" value={candidateId} onChange={(e) => setCandidateId(e.target.value)} required />
            </div>
        <div>
            <label>Question IDs (comma separated):</label>
                <input type="text" placeholder="Question IDs" value={questionIds} onChange={(e) => setQuestionIds(e.target.value)} required />
            </div>
            <div>
            <label>Schedule At:</label>
                <input type="datetime-local" placeholder="Scheduler at" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} required />
            </div>
            <button type="submit">Schedule</button>
        </form>
      
    </div>
  )
}

export default ScheduleAssessment;