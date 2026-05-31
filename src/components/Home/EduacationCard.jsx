import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

const EduacationCard = ({ data }) => {
  const institution = data.institution || data.title;
  const degree = data.degree || data.content;
  const duration = data.duration || "";
  const loc = data.location || data.loc;

  return (
    <div className="card">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05, duration: 0.6 }}
        viewport={{ once: true }}
        className="info"
      >
        <h3 className="title">{institution}</h3>
        <p className="time-desc">
          <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
          {degree} {duration && `[${duration}]`}
        </p>
        <p className="loc">
          <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '8px' }} />
          {loc}
        </p>
      </motion.div>
    </div>
  );
};

export default EduacationCard;