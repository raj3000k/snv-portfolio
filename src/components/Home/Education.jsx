import React from 'react';
import EducationCardContainer from './EducationCardContainer';
import { motion } from 'framer-motion';

const Education = ({ educations }) => {
  return (
    <div className="timeline-header-container" id="education">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="education-header"
      >
        Education History
      </motion.h1>
      <EducationCardContainer educations={educations} />
    </div>
  );
};

export default Education;