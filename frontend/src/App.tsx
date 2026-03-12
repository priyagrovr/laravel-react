import { useState } from 'react';
import './App.css'
import CreateQuestion from './components/CreateQuestion';
import CandidateList from './components/CandidateList';
import CreateCandidate from './components/CreateCandidate';
import SubmitAnswer from './components/SubmitAnswer';
import ScheduleAssessment from './components/ScheduleAssessment';

function App() {
  const [activeTab, setActiveTab] = useState('candidates');

  const tabs = [
    { id: 'candidates', label: 'Candidates' },
    { id: 'questions', label: 'Create Question' },
    { id: 'assessments', label: 'Schedule Assessment' },
    { id: 'answer', label: 'Submit Answer' },
    { id: 'report', label: 'Assessment Report' },
  ];
 

  return (
    <div>
      <h1>Assessment App </h1>
      <nav>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ marginRight: '10px' }}>
            {tab.label}
          </button>
        ))}
      </nav>
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'candidates' && (<><CreateCandidate />
          <div style={{margin:20}}><CandidateList /></div>
        </>)}
        {activeTab === 'questions' && (<><CreateQuestion />
          </>)}
        {activeTab === 'assessments' && (<><ScheduleAssessment>
          </ScheduleAssessment></>)}
         {activeTab === 'answer' && (<><SubmitAnswer />
          </>)}
         {/* {activeTab === 'report' && (<><AssessmentReport />
          </>)} */}
      </div>
    </div>
  )
}

export default App
