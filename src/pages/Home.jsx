import React from 'react';
import Header from '../components/Home/Header';
import About from '../components/Home/About';
import Skills from '../components/Home/Skills';
import Projects from '../components/Home/Projects';
import Education from '../components/Home/Education';
import Footer from '../components/Home/Footer';
import Experience from '../components/Home/Experience';
import AchievementsCarousel from '../components/Home/AchievementsCarousel';

const Home = ({ data, loading }) => {
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#030712',
        color: '#ffffff',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        Loading Portfolio...
      </div>
    );
  }

  return (
    <>
      <Header profile={data.profile} />
      <About profile={data.profile} />
      {data.experiences && data.experiences.length > 0 && (
        <Experience experiences={data.experiences} />
      )}
      {data.educations && data.educations.length > 0 && (
        <Education educations={data.educations} />
      )}
      <Skills skills={data.profile.skills} />
      {data.achievements && data.achievements.length > 0 && (
        <AchievementsCarousel achievements={data.achievements} />
      )}
      {data.projects && data.projects.length > 0 && (
        <Projects projects={data.projects} />
      )}
      <Footer profile={data.profile} />
    </>
  );
};

export default Home;