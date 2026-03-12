export interface Candidate {
  name: string;
  email: string;
  experience_years: string;
}

export interface CandidateResponse extends Candidate {
id: number;
}

export interface Question {
  id: number;
  text: string;
  category: 'backend' | 'frontend' | 'hardware';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Assessment {
  id: number;
  candidate_id: number;
  question_id: number;
  score: number;
}