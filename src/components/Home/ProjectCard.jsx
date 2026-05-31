import React from 'react'
import { motion } from "framer-motion"

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ChildVariant = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  }
}

const ProjectCard = ({ data }) => {
  const heading = data.title || data.heading;
  const image = data.imageUrl || data.image;
  const github = data.githubUrl || data.github;

  const imageSrc = image
    ? (image.startsWith('/uploads') ? `${API_BASE}${image}` : image)
    : null;

  return (
    <motion.div 
      variants={ChildVariant}
      className="project-card-simple"
    >
      {imageSrc && (
        <div className="project-logo-wrapper">
          <img src={imageSrc} alt={heading} className="project-logo" />
        </div>
      )}
      <div className="project-info-simple">
        <h3 className="project-name-simple">{heading}</h3>
        <a href={github} target='_blank' rel="noopener noreferrer" className="project-link-simple">
          <span>GitHub</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            className="link-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>
    </motion.div>
  )
}

export default ProjectCard;