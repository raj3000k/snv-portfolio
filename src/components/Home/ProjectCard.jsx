import React from 'react';
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ChildVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ProjectCard = ({ data }) => {
  const title = data.title || data.heading;
  const subtitle = data.subtitle || data.sub;
  
  const techStack = data.techStack || 
    (typeof data.tech === 'string' ? data.tech.split(',').map(s => s.trim()) : []);
    
  const description = data.description || data.desc;
  const imageUrl = data.imageUrl || data.image;
  const githubUrl = data.githubUrl || data.github;
  const liveUrl = data.liveUrl;

  const imageSrc = imageUrl
    ? (imageUrl.startsWith('/uploads') ? `${API_BASE}${imageUrl}` : imageUrl)
    : null;

  return (
    <motion.div variants={ChildVariant} viewport={{ once: true }} className="project-card">
      {imageSrc && (
        <div className="snapshots">
          <img src={imageSrc} alt={title} />
        </div>
      )}
      <div className="card-contents">
        <h3 className="project-name">{title}</h3>
        <h4 className="sub">{subtitle}</h4>
        
        <div className="tech-tags">
          {techStack.map((techName, idx) => (
            <span key={idx} className="tech-tag">{techName}</span>
          ))}
        </div>
        
        <p className="desc-project">{description}</p>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <button className="github-btn">
              <span>GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                style={{ width: '14px', height: '14px' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </a>
          
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <button className="github-btn" style={{ backgroundColor: 'var(--accent-indigo)' }}>
                <span>Live Demo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  style={{ width: '14px', height: '14px' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;