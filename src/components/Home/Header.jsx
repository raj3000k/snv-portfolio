import React from 'react'
import ProfilePicDefault from '../../assets/images/profilepic.png'
import '../../CSS/scroll-icon.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion"

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Header = ({ profile }) => {
  const name = profile?.name || "Raj";
  const title = profile?.title || "Software Developer";
  
  const profilePic = profile?.profilePicUrl
    ? (profile.profilePicUrl.startsWith('/uploads') ? `${API_BASE}${profile.profilePicUrl}` : profile.profilePicUrl)
    : ProfilePicDefault;

  return (
    <>
      <motion.div id='home'
        initial={{ scale: .55 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 70 }}
        viewport={{ once: true }}
        className="header-container"
      >
        <div className="profile-photo">
          <img src={profilePic} alt={name} />
        </div>

        <div className="text-heading">
          <TypeAnimation
            sequence={[
              `I'm ${name}`,
              1500,
              `I'm a ${title}`,
              1500,
              profile?.availability ? "Available for Collaboration!" : "Open to New Projects!",
              1500,
            ]}
            wrapper="h2"
            speed={10}
            className='main-heading'
            repeat={Infinity}
            key={name + title}
          />
          <div className="social-links">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon">
                <FontAwesomeIcon className='icon-i' icon={faGithub} />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} className="icon" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className='icon-i' icon={faLinkedinIn} />
              </a>
            )}
            {profile?.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="icon">
                <FontAwesomeIcon className='icon-i' icon={faXTwitter} />
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="icon">
                <FontAwesomeIcon className='icon-i' icon={faEnvelope} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Header