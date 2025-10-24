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
import Resume4 from './components/resumeTemplates/resume4';
import Resume5 from './components/resumeTemplates/resume5';
import Resume6 from './components/resumeTemplates/resume6';
import ResumeCustom from './components/resumeTemplates/resumecustom';
import Footer from './components/footer';
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
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resumeBot" element={<ResumeCheck />} />
            <Route path="/form" element={<Form />} />
            <Route path="/userResume" element={<UserResume />} />
            <Route path="/footer" element={<Footer />} />
          </Routes>
          <Routes>
            <Route path="/resume1" element={ <><Resume1 /> <Footer /></> } />
            <Route path="/resume2" element={ <><Resume2 /> <Footer /></> } />
            <Route path="/resume3" element={ <><Resume3 /> <Footer /></> } />
            <Route path="/resume4" element={ <><Resume4 /> <Footer /></> } />
            <Route path="/resume5" element={ <><Resume5 /> <Footer /></> } />
            <Route path="/resume6" element={ <><Resume6 /> <Footer /></> } />
            <Route path="/resumeCustom" element={ <><ResumeCustom /> <Footer /></> } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
