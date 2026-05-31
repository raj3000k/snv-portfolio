import React from 'react';
import ProjectCard from './ProjectCard';
import Traffic from '../../assets/images/projects/traffic-pred.png';
import Ablego from '../../assets/images/projects/ablego.png';
import Rent from '../../assets/images/projects/rentwheels.png';
import { motion } from 'framer-motion';

const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.05,
    },
  },
};

const cardsVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const headVariant = {
  hidden: { opacity: 0, x: -20 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const Projects = ({ projects }) => {
  const defaultProjects = [
    {
      title: "Traffic Prediction System",
      subtitle: "A Collaborative Project for Western Digital Cerebrum hackathon 2023 (Winners)",
      techStack: ["Python", "Tensorflow", "Keras", "NumPy", "Pandas", "Matplotlib"],
      description: "Predicted the traffic of a particular area at a particular time using historical data and the use of Deep learning models - RNN, GRU, and LSTM. Implemented model selection as per input given for better accuracy, used Generative AI, LLMs.",
      imageUrl: Traffic,
      githubUrl: "https://github.com/raj3000k/traffic-prediction",
    },
    {
      title: "AbleGO",
      subtitle: "Cab booking app for disabled people. A Collaborative project for inDrive Hackathon 2023.",
      techStack: ["Flutter", "Dart", "MapBox API", "RazorPay API", "Firebase"],
      description: "Control app with voice-enabled, for enhancing accessibility for disabled people. User & Driver login both in one app with Driver training program integrated with the app. Features like Emergency SOS, PayLater, Emergency Contacts add/remove, Ride Scheduling options.",
      imageUrl: Ablego,
      githubUrl: "https://github.com/raj3000k/able-go",
    },
    {
      title: "Rent-WHEELS",
      subtitle: "Full Stack Car booking website.",
      techStack: ["Typescript", "ReactJS", "TailwindCSS", "Node/ExpressJS", "GraphQL", "NestJS"],
      description: "A fully responsive car booking/renting website, GraphQL API and Nest JS are used for Car models. Add, remove, and update cars easily, admin and User Dashboard.",
      imageUrl: Rent,
      githubUrl: "https://github.com/raj3000k/rent-wheels",
    },
  ];

  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <motion.div
      id="projects"
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="project-conatiner"
    >
      <motion.p variants={headVariant} className="proj-head">
        Projects
      </motion.p>
      <motion.div variants={cardsVariant} initial="hidden" whileInView="show" className="project-card-container">
        {displayProjects.map((data, index) => (
          <ProjectCard key={data._id || index} data={data} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;