import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import Traffic from '../../assets/images/projects/traffic-pred.png'
import Ablego from '../../assets/images/projects/ablego.png'
import Rent from '../../assets/images/projects/rentwheels.png'
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: .05,
    }
  },
};

const headVariant = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2,
      delay: .5
    }
  }
}

const Projects = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultProjects = [
    {
      heading: "Traffic Prediction System",
      sub: "A Collaborative Project for Western Digital Cerebrum hackathon 2023 (Winners)",
      tech: "Python, Tensorflow, Keras, NumPy, Pandas, matplot",
      desc: "Predicted the traffic of a particular area at a particular time using historical data and the use of Deep learning models - RNN,GRU, and LSTM.Implemented model selection as per input given for better accuracy, used Generative AI, LLMs.",
      image: Traffic,
      github: "https://github.com/raj3000k/traffic-prediction",
    },
    {
      heading: "AbleGO",
      sub: "Cab booking app for disabled people. A Collaborative project for inDrive Hackathon 2023.",
      tech: "Flutter, Dart, MapBox API, RazorPay API, Firebase",
      desc: "Control app with voice-enabled, for enhancing accessibility for disabled people. User & Driver login both in one app with Driver training program integrated with the app.Features like Emergency SOS, PayLater, Emergency Contacts add/remove, Ride Scheduling options.",
      image: Ablego,
      github: "https://github.com/raj3000k/able-go",
    },
    {
      heading: "Rent-WHEELS",
      sub: "Full Stack Car booking website.",
      tech: "Typescript, ReactJS, TailwindCSS, Node/ExpressJS, GraphQL, NestJS.",
      desc: "A fully responsive car booking/renting website, GraphQL API and Nest JS are used for Car models. Add, remove, and update cars easily, admin and User Dashboard.",
      image: Rent,
      github: "https://github.com/raj3000k/rent-wheels",
    },
  ];

  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayProjects.length) % displayProjects.length);
  };

  const current = displayProjects[currentIndex];

  return (
    <motion.div id='projects'
      variants={containerVariant} 
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: .2, margin: '30%' }}
      className='project-conatiner'
    >
      <motion.p 
        variants={headVariant}
        className="proj-head"
      >
        Projects
      </motion.p>
      
      <div className="projects-carousel">
        {displayProjects.length > 1 && (
          <>
            <button className="carousel-control prev" onClick={prevSlide} aria-label="Previous Project">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="carousel-control next" onClick={nextSlide} aria-label="Next Project">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}

        <div className="carousel-track">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="carousel-slide"
              style={{ width: '100%' }}
            >
              <ProjectCard data={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        {displayProjects.length > 1 && (
          <div className="carousel-dots" style={{ marginTop: '20px' }}>
            {displayProjects.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Projects;