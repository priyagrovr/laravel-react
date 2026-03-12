import { useState } from "react";
import { createCandidate } from "../services/api";


const CreateCandidate = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        experience_years: 0,
    });
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
            setError('Failed to create candidate');
            setMessage('');
        }
    }

    return (
        <div>
            <h2>Create Candidate</h2>
            <form onSubmit={handleSumit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
                </div>
                <div>
                    <label>Experience Years:</label>
                    <input type="number" value={form.experience_years} onChange={(e) => setForm({...form, experience_years: parseInt(e.target.value)})} required />
                </div>
                <button type="submit">Create</button>
            </form>
            {message && <p style={{color: 'green'}}>{message}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )

         
    
}

export default CreateCandidate;
