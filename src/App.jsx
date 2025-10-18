// App.js
import './App.css';
import Header from './components/header';
import ResumeCard from './components/ResumeCard';
import Login from './components/login';
import Signup from './components/signup';
import ResumeCheck from './components/resumechek';
import Form from './components/form';
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
            <Route path="/resumecheck" element={<ResumeCheck />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
