import React from 'react'
import { motion } from "framer-motion"
import '../../CSS/education.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faClock, faLocation, faLocationArrow, faLocationDot, faLocationPin, faSearchLocation, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';



const EduacationCard = ({data}) => {
    const {title,content,loc,txt}  =  data
  return (
    <div className="card">
        <motion.div 
        initial={{scale:0}}
        whileInView={{scale:1,originY:0,}}
        transition={{delay:.07,duration:1,type:'spring' ,stiffness:100}}
        viewport={{once:true}}
        className="info">
            <h3 className="title">{title}</h3>
            <p className='time-desc'><FontAwesomeIcon className='icon-i' icon={ faCalendarAlt} /> {content}</p>
            <p className='loc'><FontAwesomeIcon className='icon-i' icon={ faLocationDot} />{loc}</p>
        </motion.div>
    </div>

  )
}

export default EduacationCard