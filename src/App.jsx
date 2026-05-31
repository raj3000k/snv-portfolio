import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Home/Navbar';
import BackOnTop from './components/Home/BackOnTop';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePic from './assets/images/profilepic.png';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const defaultPortfolio = {
  profile: {
    name: "Raj Motwani",
    title: "Software Developer",
    bio: "I'm an enthusiastic geek and a Software Developer with a keen interest in technology and development. Currently, I'm pursuing my B.Tech at NIT Raipur, which allows me to deepen my knowledge and skills in this ever-evolving field.",
    profilePicUrl: ProfilePic,
    resumeUrl: "https://drive.google.com/file/d/1hZA_1_I7F2b_E0378m6zLSelPogw7-5V/view?usp=sharing",
    email: "rajmotwani38@gmail.com",
    github: "https://github.com/raj3000k/",
    linkedin: "https://www.linkedin.com/in/raj-motwani-978143204/",
    twitter: "https://x.com/RAJMOTWANI16",
    availability: true,
    skills: []
  },
  experiences: [],
  educations: [],
  projects: [],
  achievements: []
};

function MainLayout() {
  const [data, setData] = useState(defaultPortfolio);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/portfolio`);
        if (res.ok) {
          const fetchedData = await res.json();
          // Merge with defaults to ensure fallback fields exist
          setData({
            profile: { ...defaultPortfolio.profile, ...fetchedData.profile },
            experiences: fetchedData.experiences || [],
            educations: fetchedData.educations || [],
            projects: fetchedData.projects || [],
            achievements: fetchedData.achievements || []
          });
        }
      } catch (err) {
        console.warn("Could not connect to backend API, using local fallback data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <>
      <BackOnTop />
      <Navbar profile={data.profile} />
      <Home data={data} loading={loading} />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
export { defaultPortfolio };
