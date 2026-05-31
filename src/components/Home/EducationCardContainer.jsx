import React from 'react';
import EduacationCard from './EduacationCard';
import { motion } from 'framer-motion';

const EducationCardContainer = ({ educations }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="time-line-container"
    >
      <div className="timeline">
        <div className="outer">
          <div className="card">
            {educations.map((data, i) => (
              <EduacationCard data={data} key={data._id || i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCardContainer;