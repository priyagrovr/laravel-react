import { useState } from "react";
import { submitAnswer } from "../services/api";


const SubmitAnswer = () => {
const [responseId, setResponseId] = useState('');
const [answerText, setAnswerText] = useState('');
const [score, setScore] = useState(0);
const [message, setMessage] = useState('');
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
        // Call API to submit answer
        const payload = {
            answerText,
            score,
        }
        // Call API to submit answer
        await submitAnswer({responseId: parseInt(responseId), answers: payload});

        setMessage('Answer submitted successfully');
        setResponseId('');
        setAnswerText('');
        setScore(0);
    }
    catch (error) {
        setError('Failed to submit answer');
    }
}

    return (
        <div>
            <h2>Submit Answer</h2>
            {/* Form to submit answer */}
        </div>
    );
};

export default SubmitAnswer;