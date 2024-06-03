import React from 'react'
import '../../CSS/socials.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram,faLinkedinIn ,faGithub,faXTwitter} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SocialShare = () => {
  return (
    <div className="footer-social">
        <div className="credits">
            <h3>
                Developed By Raj Motwani
            </h3>
        </div>
        <div className="footer-social-links" >
                {/* <a href="https://instagram.com/_/" target = "_blank" className="icon">
                <FontAwesomeIcon className='icon-i' icon={faInstagram} />
                </a> */}
                 <a href="https://github.com/raj3000k/" target = "_blank" className="icon">
                <FontAwesomeIcon className='icon-i' icon={faGithub} />
                </a>
                <a href="https://www.linkedin.com/in/raj-motwani-978143204/" className="icon" target = "_blank">
                    <FontAwesomeIcon className='icon-i' icon={faLinkedinIn} />
                </a>
                <a href="https://x.com/RAJMOTWANI16" target = "_blank" className="icon">
                <FontAwesomeIcon className='icon-i' icon={faXTwitter} />
                </a>
                <a href="mailto:rajmotwani38@gmail.com" className="icon" target = "_blank">
                <FontAwesomeIcon className='icon-i' icon={faEnvelope} />
                </a>
            </div>
    </div>


  )
}

export default SocialShare