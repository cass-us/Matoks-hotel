import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/HeroSection/Hero';
import MiddleSection from './components/MiddleSection/MiddleSection';
import AdminDashBoard from './components/Dashboard/Admin/AdminDashBoard'; 

function App() {
  const adminName = "Your Admin Name"; 

  return (
    <Router> 
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <MiddleSection />
          </>
        } />
        <Route path="/admin" element={<AdminDashBoard adminName={adminName} />} />
      
      </Routes>
    </Router>
  );
}

export default App;
