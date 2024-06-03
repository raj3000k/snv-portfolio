import React from 'react'
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from '../components/Home/Header'
import About from '../components/Home/About'
import Skills from '../components/Home/Skills'
import Projects from '../components/Home/Projects'
import Education from '../components/Home/Education'
import Footer from '../components/Home/Footer'
import Experience from '../components/Home/Experience'
const Home = () => {
  return (
    <>
      <Header/>
      <About/>
      <Experience/>
      <Education/>
      <Skills/>
      <Projects/>
      <Footer/>
    </>
    

  )
}

export default Home