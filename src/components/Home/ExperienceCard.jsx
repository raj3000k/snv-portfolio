import React from 'react'
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faLocation, faLocationArrow, faLocationDot, faLocationPin, faSearchLocation, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faInstagram,faLinkedinIn ,faGithub,faXTwitter} from '@fortawesome/free-brands-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { faLocationPinLock } from '@fortawesome/free-solid-svg-icons/faLocationPinLock';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

const ExperienceCard = ({data}) => {
    const {title,content,image,txt,loc}  =  data
  return (
    <div className="card">
        <motion.div 
        initial={{scale:0}}
        whileInView={{scale:1,originY:0,}}
        transition={{delay:.07,duration:1,type:'spring' ,stiffness:100}}
        viewport={{once:true}}
        
        className="info">
            <img  className="experience-card-image" src={image} alt="Image" />
            <h3 className="title">{title}</h3>
            <p className='time-desc'><FontAwesomeIcon className='icon-i' icon={ faCalendarAlt} />{content}</p>
            <p className='loc'><FontAwesomeIcon className='icon-i' icon={ faLocationDot} />{loc}</p>
            <p className='txt'> {txt}</p>
        </motion.div>
    </div>

  )
}

export default ExperienceCard