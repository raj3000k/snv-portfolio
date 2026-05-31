import React from 'react'
import '../../CSS/socials.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SocialShare = ({ profile }) => {
  const name = profile?.name || "Raj Motwani";
  
  return (
    <div className="footer-social">
      <div className="credits">
        <h3>Developed By {name}</h3>
      </div>
      <div className="footer-social-links" >
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
  )
}

export default SocialShare;