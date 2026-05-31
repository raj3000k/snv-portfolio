import React from 'react'
import { motion } from "framer-motion"

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ChildVariant = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  }
}

const ProjectCard = ({ data }) => {
  const heading = data.title || data.heading;
  const sub = data.subtitle || data.sub;
  const tech = data.tech || (Array.isArray(data.techStack) ? data.techStack.join(', ') : data.techStack);
  const desc = data.description || data.desc;
  const image = data.imageUrl || data.image;
  const github = data.githubUrl || data.github;

  const imageSrc = image
    ? (image.startsWith('/uploads') ? `${API_BASE}${image}` : image)
    : null;

  return (
    <motion.div 
      variants={ChildVariant}
      viewport={{ once: true }}
      className="project-card"
    >
      {imageSrc && (
        <div className="snapshots">
          <img src={imageSrc} alt={heading} />
        </div>
      )}
      <div className="card-contents">
        <h3 className="project-name">{heading}</h3>
        <h4 className='sub'>{sub}</h4>
        <p>{tech}</p>
        <p className="desc-project">{desc}</p>
        <a href={github} target='_blank' rel="noopener noreferrer">
          <button className='github-btn'>
            <p>github</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </a>
      </div>
    </motion.div>
  )
}

export default ProjectCard;