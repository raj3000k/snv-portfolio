import React from 'react'
import '../../CSS/experience.css'
import { motion } from "framer-motion"
import ExperienceCardContainer from './ExperienceCardContainer'

const Experience = () => {
  return (
    <div className="timeline-header-container">
        <motion.h1 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1,delay:0.05}}
        viewport={{once:true}}
        className='education-header'>Experience</motion.h1>
        <ExperienceCardContainer/>
    </div>
  )
}

export default Experience