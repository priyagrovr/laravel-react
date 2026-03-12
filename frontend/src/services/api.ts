import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adjust if your backend runs on a different port
export const fetchCandidates = async () => {
  try {
    const response = await api.get(`/api/candidates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
}

export const fetchQuestions = async () => {
  try {
    const response = await api.get(`/api/questions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export const createCandidate = async (candidateData:any) => {
  try {
    const response = await api.post(`/api/candidates`, candidateData);
    return response.data;
  } catch (error) {
    console.error('Error creating candidate:', error);
    throw error;
  } 
}

export const scheduleAssessment = async (payload:any) => {
  try {
    const response = await api.post(`/api/assessments/schedule`, payload);
    return response.data;
  } catch (error) {
    console.error('Error scheduling assessment:', error);
    throw error;
  }
}

export const submitAnswer = async ({responseId, answers}: {responseId: number, answers: any}) => {
  try {
    const response = await api.put(`/api/responses/${responseId}`, { answers });
    return response.data;
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error;
  }
}

