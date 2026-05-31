import React from 'react';
import { motion } from 'framer-motion';

const About = ({ profile }) => {
  const bio = profile?.bio || "I'm an enthusiastic geek and a Software Developer with a keen interest in technology and development. Currently, I'm pursuing my B.Tech at NIT Raipur, which allows me to deepen my knowledge and skills in this ever-evolving field.";

  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="about"
    >
      <h2 className="about-head">About Me</h2>
      <div className="content-about">
        <p style={{ whiteSpace: 'pre-wrap' }}>{bio}</p>
      </div>
    </motion.div>
  );
};

export default About;