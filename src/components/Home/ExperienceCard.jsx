import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ExperienceCard = ({ data }) => {
  const title = data.title;
  const company = data.company;
  const content = data.duration || data.content;
  const loc = data.location || data.loc;
  const txt = data.description || data.txt;
  const image = data.logoUrl || data.image;

  const imageSrc = image 
    ? (image.startsWith('/uploads') ? `${API_BASE}${image}` : image)
    : null;

  return (
    <div className="card">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05, duration: 0.6 }}
        viewport={{ once: true }}
        className="info"
      >
        {imageSrc && (
          <img className="experience-card-image" src={imageSrc} alt={company || "Company Logo"} />
        )}
        <h3 className="title">{title} {company && `at ${company}`}</h3>
        <p className="time-desc">
          <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
          {content}
        </p>
        <p className="loc">
          <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '8px' }} />
          {loc}
        </p>
        <p className="txt">{txt}</p>
      </motion.div>
    </div>
  );
};

export default ExperienceCard;