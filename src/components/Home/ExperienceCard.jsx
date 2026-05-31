import React from 'react'
import { motion } from "framer-motion"
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
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, originY: 0 }}
        transition={{ delay: .07, duration: 1, type: 'spring', stiffness: 100 }}
        viewport={{ once: true }}
        className="info"
      >
        {imageSrc && (
          <img className="experience-card-image" src={imageSrc} alt={company || "Company Logo"} />
        )}
        <h3 className="title">{title} {company && `at ${company}`}</h3>
        <p className='time-desc'><FontAwesomeIcon className='icon-i' icon={faCalendarAlt} />{content}</p>
        <p className='loc'><FontAwesomeIcon className='icon-i' icon={faLocationDot} />{loc}</p>
        <p className='txt'> {txt}</p>
      </motion.div>
    </div>
  )
}

export default ExperienceCard;