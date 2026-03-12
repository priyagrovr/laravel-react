import { useState } from "react";
import { createCandidate } from "../services/api";

const CreateQuestion = () => {
    const [form, setForm] = useState({'title': '', 'difficulty': 'easy','category': 'backend'});
    const [message, setMessage] = useState('');
    const [error,setError] = useState('');

    const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('')
        setError('');
        try {
            const response = await createCandidate(form);
            setMessage(response.message);
            setError('');
        } catch (error) {
            setError('Failed to create question');
            setMessage('');
        }
    }
    return (
        <div>
            <h2>Create Question</h2>
            {message && <p style={{color: 'green'}}>{message}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSumit}>
                <div>
                    <label>Question Title:</label>
                    <input type="text" placeholder="Question Title"  value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
                </div>
                <div>
                    <label>Difficulty:</label>
                    <select value={form.difficulty} onChange={(e) => setForm({...form, difficulty: e.target.value})} required>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label>Category:</label>
                    <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} required>
                        <option value="backend">Backend</option>
                        <option value="frontend">Frontend</option>
                        <option value="hardware">Hardware</option>
                    </select>
                </div>
                <button type="submit">Create Question</button>
            </form>
        </div>
    )
}

export default CreateQuestion;