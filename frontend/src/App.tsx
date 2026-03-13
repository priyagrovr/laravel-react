import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CandidateList from './components/CandidateList';
import CreateQuestion from './components/CreateQuestion';
import ScheduleAssessment from './components/ScheduleAssessment';
import AssessmentScreen from './components/AssessmentScreen';
import AssessmentReport from './components/AssessmentReport';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Assessment App</h1>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Candidates</Link>
          <Link to="/questions" style={{ marginRight: '15px' }}>Create Question</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CandidateList />} />
          <Route path="/questions" element={<CreateQuestion />} />
          <Route path="/assessments/schedule/:candidateId" element={<ScheduleAssessment />} />
          <Route path="/assessments/:id" element={<AssessmentScreen />} />
          <Route path="/assessments/:id/report" element={<AssessmentReport />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
