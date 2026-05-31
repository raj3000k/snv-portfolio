import React from 'react';
import ProfilePicDefault from '../../assets/images/profilepic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Header = ({ profile }) => {
  const name = profile?.name || "Raj";
  const title = profile?.title || "Software Developer";
  
  const profilePic = profile?.profilePicUrl
    ? (profile.profilePicUrl.startsWith('/uploads') ? `${API_BASE}${profile.profilePicUrl}` : profile.profilePicUrl)
    : ProfilePicDefault;

  return (
    <>
      <motion.div
        id="home"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
            className="main-heading"
            repeat={Infinity}
            key={name + title} // Force re-render if updated
          />

          <div className="social-links">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            )}
            {profile?.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="icon" aria-label="Twitter">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="icon" aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <div className="main__action">
        <a className="main__scroll" href="#about" aria-label="Scroll Down">
          <div className="main__scroll-box"></div>
        </a>
        <p className="scrl">Scroll</p>
      </div>
    </>
  );
};

export default Header;