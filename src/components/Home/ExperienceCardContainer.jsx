import React from 'react';
import ExperienceCard from './ExperienceCard';
import { motion } from 'framer-motion';

const ExperienceCardContainer = ({ experiences }) => {
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
            {experiences.map((data, i) => (
              <ExperienceCard data={data} key={data._id || i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCardContainer;
