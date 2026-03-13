export interface Candidate {
  id: number;
  name: string;
  email: string;
  experience_years: number;
}

export interface Question {
  id: number;
  title: string;
  category: 'backend' | 'frontend' | 'database';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Assessment {
  id: number;
  candidate_id: number;
  scheduled_at: string;
  candidate?: Candidate;
  responses?: AssessmentResponse[];
}

export interface AssessmentResponse {
  response_id: number;
  question: Question;
  answer_text: string | null;
  score: number | null;
}

export interface AssessmentReport {
  assessment_id: number;
  scheduled_at: string;
  candidate: Candidate;
  responses: AssessmentResponse[];
  total_score: number;
  average_score: number;
}
