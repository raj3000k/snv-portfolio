import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCardContainer from './ExperienceCardContainer';

const Experience = ({ experiences }) => {
  return (
    <div className="timeline-header-container" id="experience">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="education-header"
      >
        Work Experience
      </motion.h1>
      <ExperienceCardContainer experiences={experiences} />
    </div>
  );
};

export default Experience;