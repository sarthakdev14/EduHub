import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Exams from './pages/Exams';
import Mentors from './pages/Mentors';
import Webinars from './pages/Webinars';
import Colleges from './pages/Colleges';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="bg-light text-text-primary min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-light to-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;