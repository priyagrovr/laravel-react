import { useState } from 'react';
import { createQuestion } from '../services/api';

const CreateQuestion = () => {
  const [form, setForm] = useState({ title: '', difficulty: 'easy', category: 'backend' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await createQuestion(form);
      setMessage(response.message);
      setForm({ title: '', difficulty: 'easy', category: 'backend' });
    } catch {
      setError('Failed to create question');
    }
  };

  return (
    <div>
      <h2>Create Question</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Title: </label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label>Difficulty: </label>
          <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label>Category: </label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="backend">Backend</option>
            <option value="frontend">Frontend</option>
            <option value="database">Database</option>
          </select>
        </div>
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
