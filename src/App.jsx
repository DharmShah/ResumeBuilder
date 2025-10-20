// App.js
import './App.css';
import Header from './components/header';
import ResumeCard from './components/ResumeCard';
import Login from './components/login';
import Signup from './components/signup';
import ResumeCheck from './components/resumeBot';
import Form from './components/form';
import UserResume from './components/userResume';
import Resume1 from './components/resumeTemplates/resume1';
import Resume2 from './components/resumeTemplates/resume2';
import Resume3 from './components/resumeTemplates/resume3';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-2xl font-bold">Welcome to Resume Builder!</h1>
                  <p className="mt-4">Here you can create and review resumes easily.</p>
                  <ResumeCard />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resumeBot" element={<ResumeCheck />} />
            <Route path="/form" element={<Form />} />
            <Route path="/userResume" element={<UserResume />} />
          </Routes>
          <Routes>
            <Route path="/resume1" element={<Resume1 />} />
            <Route path="/resume2" element={<Resume2 />} />
            <Route path="/resume3" element={<Resume3 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
