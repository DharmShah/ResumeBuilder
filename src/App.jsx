// App.js
import './App.css';
import Header from './components/header';
import ResumeCard from './components/ResumeCard';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-8">
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
