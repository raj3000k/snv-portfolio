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
import { motion } from "framer-motion"

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      staggerChildren: 0.2, 
    },
  },
};

const SkillsImages = ({ skills }) => {
  const defaultImages = [C2, Python, sql, Django, mongodb, ReactImage, tailwind, Html, Js, flutter, nodejs, Git];

  const renderImages = skills && skills.length > 0
    ? skills.map(s => s.logoUrl.startsWith('/uploads') ? `${API_BASE}${s.logoUrl}` : s.logoUrl)
    : defaultImages;

  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '30%' }}
      variants={containerVariants}
      className="skills-img"
    >
      {renderImages.map((ele, index) => (
        <SkillImageComponent key={index} image={ele} />
      ))}
    </motion.div>
  );
}

export default SkillsImages;