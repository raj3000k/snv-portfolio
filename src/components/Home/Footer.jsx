import React from 'react';
import Contact from './Contact';
import SocialShare from './SocialShare';
import { TypeAnimation } from 'react-type-animation';

const Footer = ({ profile }) => {
  return (
    <>
      <div className="contact" id="contact">
        <TypeAnimation
          sequence={[
            "Contact Me...",
            1500,
            "Let's Build Something Special...",
            1500,
          ]}
          wrapper="h1"
          speed={10}
          className="proj-head"
          repeat={Infinity}
        />
        <Contact />
      </div>
      <SocialShare profile={profile} />
    </>
  );
};

export default Footer;