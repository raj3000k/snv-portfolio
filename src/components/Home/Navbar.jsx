import React, { useState } from "react";
import "../../CSS/navbar.css";
import "../../CSS/resume.css";
import { motion } from "framer-motion"

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Navbar({ profile }) {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  const handleDownload = () => {
    const url = profile?.resumeUrl || 'https://drive.google.com/file/d/1hZA_1_I7F2b_E0378m6zLSelPogw7-5V/view?usp=sharing';
    const finalUrl = url.startsWith('/uploads') ? `${API_BASE}${url}` : url;
    window.open(finalUrl, '_blank');
  };

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  return (
    <nav className="nav" id="nav">
      <a href="#" className="nav__brand">
        {profile?.name || "Raj Motwani"}
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="/#home" className="nav__link" onClick={() => setActive("nav__menu")}>
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="/#about" className="nav__link" onClick={() => setActive("nav__menu")}>
            About
          </a>
        </li>
        <li className="nav__item">
          <a href="/#skills" className="nav__link" onClick={() => setActive("nav__menu")}>
            Skills
          </a>
        </li>
        <li className="nav__item">
          <a href="/#projects" className="nav__link" onClick={() => setActive("nav__menu")}>
            Projects
          </a>
        </li>
        <li className="nav__item">
          <a href="/#contact" className="nav__link" onClick={() => setActive("nav__menu")}>
            Contact
          </a>
        </li>

        <li>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={() => {
              handleDownload();
              return { scale: 1.4 };
            }}
            transition={{ type: 'spring', stiffness: 125 }}
            className="button"
          >
            <span>Resume</span>
          </motion.button>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;