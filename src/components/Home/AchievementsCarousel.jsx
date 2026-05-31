import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AchievementsCarousel = ({ achievements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!achievements || achievements.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + achievements.length) % achievements.length);
  };

  const current = achievements[currentIndex];

  return (
    <div className="achievements-section" id="achievements">
      <h1 className="proj-head" style={{ textAlign: 'center', marginBottom: '20px' }}>Major Achievements</h1>
      <div className="achievements-carousel">
        <button className="carousel-control prev" onClick={prevSlide} aria-label="Previous Achievement">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="carousel-control next" onClick={nextSlide} aria-label="Next Achievement">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        <div className="carousel-track">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="carousel-slide"
            >
              {current.imageUrl && (
                <div className="achievement-image-wrapper">
                  <img src={current.imageUrl.startsWith('/uploads') ? `${API_BASE}${current.imageUrl}` : current.imageUrl} alt={current.title} />
                </div>
              )}
              <div className="achievement-details">
                <div className="achievement-date">{current.date}</div>
                <h3 className="achievement-title">{current.title}</h3>
                <p className="achievement-desc">{current.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="carousel-dots">
          {achievements.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsCarousel;
