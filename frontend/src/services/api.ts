import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCandidates = async () => {
  const response = await api.get('/api/candidates');
  return response.data;
};

export const createCandidate = async (data: { name: string; email: string; experience_years: number }) => {
  const response = await api.post('/api/candidates', data);
  return response.data;
};

export const fetchQuestions = async () => {
  const response = await api.get('/api/questions');
  return response.data;
};

export const createQuestion = async (data: { title: string; difficulty: string; category: string }) => {
  const response = await api.post('/api/questions', data);
  return response.data;
};

export const scheduleAssessment = async (data: { candidate_id: number; question_ids: number[]; scheduled_at?: string }) => {
  const response = await api.post('/api/assessments', data);
  return response.data;
};

export const submitAnswer = async (responseId: number, data: { answer_text?: string; score?: number | null }) => {
  const response = await api.put(`/api/responses/${responseId}`, data);
  return response.data;
};

export const fetchAssessmentReport = async (assessmentId: number) => {
  const response = await api.get(`/api/assessments/${assessmentId}/report`);
  return response.data;
};
