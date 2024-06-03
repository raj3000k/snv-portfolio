import React from 'react'
import Python from '../../assets/images/skills/snakes.png' 
import Html from '../../assets/images/skills/html-5.png' 
import Css from '../../assets/images/skills/css-3.png' 
import Git from '../../assets/images/skills/git.png' 
import Django from '../../assets/images/skills/djangoproject.svg' 
import ReactImage from '../../assets/images/skills/science.png' 
import Js from '../../assets/images/skills/js.png' 
import C from '../../assets/images/skills/letter-c.png' 
import C2 from '../../assets/images/skills/icons8-c++-480.png';
import sql from '../../assets/images/skills/mysql.png'
import tailwind from '../../assets/images/skills/Tailwind CSS.png'
import mongodb from '../../assets/images/skills/mongodb.png'
import nodejs from '../../assets/images/skills/nodejs.png'
import flutter from '../../assets/images/skills/flutter.png'

import SkillImageComponent from './SkillImageComponent'
import { delay, motion,stagger } from "framer-motion"

const containerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration:2,
        staggerChildren: 0.2, 
      },
    },
  };
  

const SkillsImages = () => {

    let images = [C2,Python,sql,Django, mongodb, ReactImage, tailwind, Html, Js ,flutter, nodejs, Git]

    return(

        <motion.div 
        initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '30%' }}
      variants={containerVariants}
        className="skills-img">
            {
                
                images.map((ele,index)=>(

                    <SkillImageComponent key={index} image={ele}/>
                ))
            }
            
        </motion.div>
    )

}

export default SkillsImages