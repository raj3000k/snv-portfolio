import React from 'react'
import ProjectCard from './ProjectCard'
import Traffic from '../../assets/images/projects/traffic-pred.png'
import Ablego from '../../assets/images/projects/ablego.png'
import Rent from '../../assets/images/projects/rentwheels.png'
import { motion } from "framer-motion"

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  },
};

const Projects = ({ projects }) => {
  const defaultProjects = [
    {
      heading: "Traffic Prediction System",
      image: Traffic,
      github: "https://github.com/raj3000k/traffic-prediction",
    },
    {
      heading: "AbleGO",
      image: Ablego,
      github: "https://github.com/raj3000k/able-go",
    },
    {
      heading: "Rent-WHEELS",
      image: Rent,
      github: "https://github.com/raj3000k/rent-wheels",
    },
  ];

  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <div id='projects' className='project-conatiner' style={{ paddingBottom: '60px' }}>
      <p className="proj-head" style={{ textAlign: 'center', marginBottom: '30px' }}>
        Projects
      </p>
      
      <motion.div 
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '20%' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        {displayProjects.map((data, index) => (
          <ProjectCard key={data._id || index} data={data} />
        ))}
      </motion.div>
    </div>
  )
}

export default Projects;