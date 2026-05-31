import React from 'react'
import { motion } from "framer-motion"
import '../../CSS/education.css'
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
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, originY: 0 }}
        transition={{ delay: .07, duration: 1, type: 'spring', stiffness: 100 }}
        viewport={{ once: true }}
        className="info"
      >
        <h3 className="title">{institution}</h3>
        <p className='time-desc'>
          <FontAwesomeIcon className='icon-i' icon={faCalendarAlt} /> 
          {degree} {duration && `[${duration}]`}
        </p>
        <p className='loc'>
          <FontAwesomeIcon className='icon-i' icon={faLocationDot} />
          {loc}
        </p>
      </motion.div>
    </div>
  )
}

export default EduacationCard;